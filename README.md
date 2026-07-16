# String cactbot files

StringDownloader 的公开下载源。

## 文件

- `StringDownloader.zip`
- `StringDownloader.dll`
- `安装说明.txt`
- `raidboss/[必装] 依赖 - String运行库.js`
- `raidboss/绝妖星-自用.js`
- `raidboss/绝妖星-自用.txt`
- `raidboss/绝妖星-纯时间轴.js`
- `raidboss/绝妖星-纯时间轴.txt`

## 下崽器安装

下载并解压：

```text
https://github.com/nihil-string/string-cactbot-files/raw/main/StringDownloader.zip
```

在 ACT 插件列表里加载解压出的 `StringDownloader.dll`。

如果旧版下崽器提示“私人仓库需要 token”或无法更新，需要先关闭 ACT，手动替换为这里的新版 DLL，再重新打开 ACT。

当前 0.2 版下崽器还会向 OverlayPlugin 注册只允许调用 `PictoACT` 的 String VFX 桥接。替换 DLL 后必须重启 ACT，单独重载 Raidboss 不会更新桥接。

## 手动安装

把需要的文件放进 cactbot 的 `user/raidboss` 目录。

常见路径：

```text
D:\ACT\NewMoe-Technology\ACT.DieMoe\Plugins\ACT.OverlayPlugin\cactbot\user\raidboss
```

## 自动标点

自动标点默认关闭；需要同时打开 cactbot 里的“启用自动标点”和对应机制标点开关。需要职能优先级的机制仍要打开 String 职能悬浮窗确认 `MT/ST/H1/H2/D1-D4` 分配：

```text
https://nihil-string.github.io/string-runtime-overlay/
```

## PictoACT 桥接

新版 `StringDownloader.dll` 和 String运行库只提供底层 PictoACT 调用能力。绝妖星触发器当前没有 VFX 开关，也不绑定任何机制，不会自动画图。
