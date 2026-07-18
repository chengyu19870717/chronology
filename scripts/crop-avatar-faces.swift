import AppKit
import Foundation
import ImageIO
import UniformTypeIdentifiers
import Vision

guard CommandLine.arguments.count == 5 else {
  fputs("Usage: crop-avatar-faces.swift <manifest> <width> <height> <jpeg-quality>\n", stderr)
  exit(2)
}

let manifestPath = CommandLine.arguments[1]
let targetWidth = Int(CommandLine.arguments[2]) ?? 96
let targetHeight = Int(CommandLine.arguments[3]) ?? 120
let jpegQuality = max(0.05, min(1.0, Double(CommandLine.arguments[4]) ?? 0.45))
let manifest = try String(contentsOfFile: manifestPath, encoding: .utf8)
let jobs = manifest.split(separator: "\n").compactMap { line -> (String, String)? in
  let fields = line.split(separator: "\t", maxSplits: 1).map(String.init)
  return fields.count == 2 ? (fields[0], fields[1]) : nil
}

func clamp(_ value: CGFloat, _ lower: CGFloat, _ upper: CGFloat) -> CGFloat {
  return min(max(value, lower), upper)
}

func cropRect(for image: CGImage, face: VNFaceObservation?) -> CGRect {
  let imageWidth = CGFloat(image.width)
  let imageHeight = CGFloat(image.height)
  let targetAspect = CGFloat(targetWidth) / CGFloat(targetHeight)

  guard let face else {
    let cropWidth = min(imageWidth, imageHeight * targetAspect)
    let cropHeight = cropWidth / targetAspect
    return CGRect(
      x: (imageWidth - cropWidth) / 2,
      y: (imageHeight - cropHeight) / 2,
      width: cropWidth,
      height: cropHeight
    ).integral
  }

  let box = face.boundingBox
  let faceWidth = box.width * imageWidth
  let faceHeight = box.height * imageHeight
  let faceCenterX = box.midX * imageWidth
  let faceCenterY = (1 - box.midY) * imageHeight
  var cropWidth = max(faceWidth / 0.46, faceHeight * targetAspect / 0.38)
  var cropHeight = cropWidth / targetAspect

  if cropWidth > imageWidth {
    cropWidth = imageWidth
    cropHeight = cropWidth / targetAspect
  }
  if cropHeight > imageHeight {
    cropHeight = imageHeight
    cropWidth = cropHeight * targetAspect
  }

  let x = clamp(faceCenterX - cropWidth / 2, 0, imageWidth - cropWidth)
  let y = clamp(faceCenterY - cropHeight * 0.38, 0, imageHeight - cropHeight)
  return CGRect(x: x, y: y, width: cropWidth, height: cropHeight).integral
}

func writeJPEG(_ image: CGImage, to outputPath: String) throws {
  let colorSpace = CGColorSpaceCreateDeviceRGB()
  guard let context = CGContext(
    data: nil,
    width: targetWidth,
    height: targetHeight,
    bitsPerComponent: 8,
    bytesPerRow: targetWidth * 4,
    space: colorSpace,
    bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue
  ) else {
    throw NSError(domain: "AvatarCrop", code: 2, userInfo: [NSLocalizedDescriptionKey: "Cannot create image context"])
  }
  context.interpolationQuality = .high
  context.draw(image, in: CGRect(x: 0, y: 0, width: targetWidth, height: targetHeight))
  guard let resized = context.makeImage() else {
    throw NSError(domain: "AvatarCrop", code: 3, userInfo: [NSLocalizedDescriptionKey: "Cannot resize image"])
  }

  let outputURL = URL(fileURLWithPath: outputPath) as CFURL
  guard let destination = CGImageDestinationCreateWithURL(outputURL, UTType.jpeg.identifier as CFString, 1, nil) else {
    throw NSError(domain: "AvatarCrop", code: 4, userInfo: [NSLocalizedDescriptionKey: "Cannot create JPEG destination"])
  }
  CGImageDestinationAddImage(destination, resized, [kCGImageDestinationLossyCompressionQuality: jpegQuality] as CFDictionary)
  guard CGImageDestinationFinalize(destination) else {
    throw NSError(domain: "AvatarCrop", code: 5, userInfo: [NSLocalizedDescriptionKey: "Cannot finalize JPEG"])
  }
}

var faceCrops = 0
var centeredFallbacks = 0
for (inputPath, outputPath) in jobs {
  let inputURL = URL(fileURLWithPath: inputPath)
  guard
    let source = CGImageSourceCreateWithURL(inputURL as CFURL, nil),
    let image = CGImageSourceCreateImageAtIndex(source, 0, nil)
  else {
    fputs("Cannot read image: \(inputPath)\n", stderr)
    exit(1)
  }

  let request = VNDetectFaceRectanglesRequest()
  try VNImageRequestHandler(cgImage: image, orientation: .up).perform([request])
  let face = request.results?.max {
    $0.boundingBox.width * $0.boundingBox.height < $1.boundingBox.width * $1.boundingBox.height
  }
  if face == nil { centeredFallbacks += 1 } else { faceCrops += 1 }

  guard let cropped = image.cropping(to: cropRect(for: image, face: face)) else {
    fputs("Cannot crop image: \(inputPath)\n", stderr)
    exit(1)
  }
  try writeJPEG(cropped, to: outputPath)
}

print("Vision avatar crop: \(faceCrops) face crops, \(centeredFallbacks) centered fallbacks")
