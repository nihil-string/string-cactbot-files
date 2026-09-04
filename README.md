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

当前发布版本为 `0.8.39.0`。下载器为纯托管插件，保留下载更新、配置桥与职能悬浮窗；游戏内绘图及其原生载荷已删除。替换 DLL 后必须重启 ACT，单独重载 Raidboss 不会更新插件。

插件页的“检查下崽器更新”会先校验 manifest、版本和 SHA-256；下载成功后在 ACT 正常退出时替换 DLL，下次启动生效。新安装默认开启 ACT 启动自动更新；`0.8.34.0` 会把旧设置一次性迁移为开启，迁移后仍尊重用户手动关闭。`0.8.36.0` 起，触发器文件完整下载并验证后才提交；内容确有变化时会自动调用 cactbot 官方重载接口，战斗中则等脱战后自动生效，不需要用户手动重载 Raidboss 或重启 ACT。`0.8.37.0` 起，职能悬浮窗可请求经过尺寸校验的最小化布局，并在旧桥接连续拒绝时自动恢复完整界面。

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

战斗中可以继续调整职能、方案和优先级；修改应用到后续尚未结算的机制，已经发出的标记不会因后续改动而隐式重排。

## 提示输出

个人机制提示默认只显示 raidboss 屏幕文字，不发送个人 TTS。需要语音时，在 String 职能悬浮窗的“常用开关”中手动开启“语音播报”；新安装、旧配置迁移和缺失配置均默认关闭，废弃的 `MyDMU_ForceTTS` 不会自动开启新开关。共享聊天提示只有“发送 `/p`”或“不发送”两种状态，默认不发送；悬浮窗关闭或职能失效时不会产生新的自动标点或小队消息。

## 本次更新

`0.8.39.0` 配套文件修复 P4 在 CEF 95 中无法记录机制的问题、旧配置覆盖新配置、角色来源冲突和异步发送状态；P4 清标会沿用创建时的本地/全队通道，保存配置失败会恢复内存状态并保留原文件。旧绘图配置和废弃频道在迁移时删除，标点、小队消息、屏幕与语音播报、时间轴和职能同步继续保留。
