# 人物头像运行目录

小程序运行时读取当前目录下的压缩 JPG 头像。

示例：

```text
assets/avatars/zhao-gao.jpg
assets/avatars/qin-shi-huang.jpg
assets/avatars/kongzi.jpg
```

源图保存在 `assets/avatar-sources/{人物id}.png`，运行：

```bash
node scripts/optimize-avatar-assets.js
```

即可重新生成当前目录的 JPG 运行图。
