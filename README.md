# String cactbot files

StringDownloader 的公开下载源。

## 文件

- `StringDownloader.zip`
- `StringDownloader.dll`
- `StringDownloader.manifest.json`
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

当前发布基线为 Controller `0.8.25.0`、内嵌 Native `0.4.9-native`、认证 wire v5。替换 DLL 后必须重启 ACT，单独重载 Raidboss 不会更新插件。

插件页的“检查下崽器更新”会先校验 manifest、版本和 SHA-256；下载成功后在 ACT 正常退出时替换 DLL，下次启动生效。

## 手动安装

把需要的文件放进 cactbot 的 `user/raidboss` 目录。

常见路径：

```text
D:\ACT\NewMoe-Technology\ACT.DieMoe\Plugins\ACT.OverlayPlugin\cactbot\user\raidboss
```

## 自动标点

自动标点默认关闭；需要在 String 职能悬浮窗的“本次设置”中同时打开自动标点总开关和对应机制开关，并保持悬浮窗在线、8 人职能与当前小队完全一致：

```text
https://nihil-string.github.io/string-runtime-overlay/
```

## 提示输出

个人机制提示只显示 raidboss 屏幕文字，不发送个人 TTS。共享聊天提示只有“发送 `/p`”或“不发送”两种状态，默认不发送；悬浮窗关闭或职能失效时不会产生新的自动标点或小队消息。

## String Native VFX

`StringDownloader.dll` 已内嵌 String Native payload，不需要安装 Dalamud、PictoACT 或 Triggernometry 绘图插件，也没有第三方绘图回退。Native 生命周期总开关以及绝妖星总开关、阶段开关、个人引导开关默认关闭；需要时由用户明确开启。

公开 String运行库保留不可用的 capability 占位符，下载器安装时才为本机副本注入随机能力；不要把安装后文件回传到公开仓库。
