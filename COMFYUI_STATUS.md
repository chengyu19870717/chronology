# ComfyUI 状态记录

更新时间：2026-07-17

## 当前环境

- ComfyUI 地址：`http://127.0.0.1:8188`
- ComfyUI 版本：`0.23.0`
- Python：`3.12.13`
- PyTorch：`2.13.0.dev20260603`
- 设备：`mps`
- ComfyUI 目录：`/Users/chengyu/project/ComfyUI`

## 已验证可用 Checkpoint

这些模型通过 safetensors 读取校验，并且不会触发 “file not fully covered” 错误：

- `CounterfeitXL_beta.safetensors`
- `animagine-xl-3.1.safetensors`
- `blue_pencil-XL-v7.0.0.safetensors`
- `pastelmix.safetensors`
- `realisticvision-v6-sd15.safetensors`

当前头像批量生成默认使用：

```bash
blue_pencil-XL-v7.0.0.safetensors
```

头像生成脚本默认等待 ComfyUI 单张任务最多 30 分钟，可用 `--timeout-minutes` 或 `COMFYUI_TIMEOUT_MINUTES` 调整。

## 已隔离损坏 Checkpoint

以下模型文件会导致 ComfyUI 报错：

```text
Error while deserializing header: incomplete metadata, file not fully covered
```

已移动到：

```text
/Users/chengyu/project/ComfyUI/models/checkpoints_corrupt_2026-07-11
```

清单：

- `dreamshaper-62-sd15.safetensors`
- `juggernaut-xl-v9.safetensors`
- `meinamix-v10.safetensors`
- `realvisxl-v4.safetensors`

如果仍需要这些模型，请重新下载完整文件，再放回：

```text
/Users/chengyu/project/ComfyUI/models/checkpoints
```

## 常用命令

检查 checkpoint 健康状态：

```bash
node scripts/check-comfyui-checkpoints.js
```

隔离损坏 checkpoint：

```bash
node scripts/check-comfyui-checkpoints.js --quarantine
```

列出可用/损坏 checkpoint：

```bash
node scripts/generate-avatars-comfyui.js --list-checkpoints
```

自动选择可用模型并生成：

```bash
node scripts/generate-avatars-comfyui.js --auto-checkpoint --only zhao-gao --overwrite
```

生成头像源图后，压缩为小程序运行图：

```bash
node scripts/optimize-avatar-assets.js --all
node scripts/audit-avatar-coverage.js
```

## 当前头像覆盖

- 人物总数：575
- ComfyUI 源 PNG：575，生成失败：0
- 主包重点头像缩略图：45，最长边 64px，合计约 0.06 MiB
- 人物分包详情头像：575，其中重点人物最长边 176px，其余人物最长边 96px，合计约 1.73 MiB
- 教材通史新增人物：515 位已生成四类与时代服饰约束提示词，当前使用文字肖像，避免一次性增加约 1.3 MiB 图片分包

## 已修复的问题

- 损坏 checkpoint 已从 `models/checkpoints` 移出，ComfyUI 下拉列表不再显示坏模型。
- 头像生成脚本会在排队前校验 checkpoint，避免等待生成后才报 `No image output`。
- 如果误选已隔离模型，脚本会提示隔离路径和重新下载建议。
- 头像生成脚本默认 checkpoint 已切到 `blue_pencil-XL-v7.0.0.safetensors`，更偏中国历史策略人物立绘。
- 单张等待超时时间已从 15 分钟改为默认 30 分钟，避免 XL 模型慢图被误判失败。
- 女性人物会自动叠加性别约束，时代服饰、人物类别、负向提示词和失败重试均由脚本统一处理。
- 小程序运行头像已压缩为两档 JPG，源 PNG 被 `project.config.json` 配置为上传忽略。
