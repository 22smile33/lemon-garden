# ROLL 016 — lemon's secret garden

lemonの秘密花园 的 VRChat 影像志，第三版，完全重新设计。

只使用 `新建文件夹.rar` 里的 **16 张图**（`1.png`–`16.png`）。没有复用之前两版的任何图片或视觉元素。

## 概念

**一卷 35mm 胶片 + 一张接触印样。**

- 纸张底色、钴蓝、玫瑰红、油墨黑；网点纸背景、胶带、硬阴影、拍立得白边。
- 首屏是压着胶带的三张照片 + Impact 大字 `SIXTEEN FRAMES`。
- 主体是一条可以左右拖动的**黑色胶片**：16 帧、齿孔、帧号、拍摄署名、进度条，可自动播放。
- 下面是一张 4×4 的**接触印样**，16 张缩略图排在一起，点击放大。
- 三篇拍摄手记：灯光、屏幕、婚礼。
- 钴蓝底色的 THE GARDEN：群组介绍、加入门票、画面署名。
- 页脚是巨大的 `ROLL 016` 和玫瑰色硬阴影。

## 目录

```
lemon-garden-v3/
├─ index.html
├─ assets/
│  ├─ css/main.css
│  ├─ js/main.js
│  ├─ favicon.svg
│  ├─ og.jpg
│  └─ img/
│     ├─ 01.webp … 16.webp          # 长边 1800，WebP
│     └─ thumbs/01.webp … 16.webp   # 360px 缩略图
└─ README.md
```

## 预览

直接双击 `index.html` 即可（纯相对路径，`file://` 可用）。

```powershell
cd lemon-garden-v3
python -m http.server 8000
# http://localhost:8000
```

## 交互

- 胶片：默认自动缓慢滚动，末尾与开头首尾相接、无缝循环；`PAUSE` 暂停、`PLAY` 继续；也支持鼠标拖动 / 触屏滑动 / 方向键 / 左右按钮。
- 帧计数与进度条按“屏幕中心当前帧”计算，手机、缩放或窗口变窄时不会和画面错位。
- 点击任意一帧、接触印样里的任意一格，或首屏的三张照片，打开灯箱。
- 灯箱支持 `←` `→`、`Esc`、底部 16 格胶片条、手机左右滑动。
- 中 / EN 一键切换，选择会记住（`roll.lang`）。
- 深链接：`#frame-08` 直接打开第 8 帧；`?lang=en` 直接进英文。
- 尊重 `prefers-reduced-motion`；所有图片有 alt；灯箱是原生 `<dialog>`。

## 修改

- **文案 / 翻译**：`assets/js/main.js` 顶部的 `I18N`，`zh` 与 `en` 两个对象。
- **照片顺序 / 文件**：同文件的 `PHOTOS` 数组；编号对应 `assets/img/01.webp` 等。
- **添加一帧**：需要同步加三处：
  1. `index.html` 里 `.film-track` 的 `.frame`
  2. `.sheet` 里的 `.cell`
  3. `PHOTOS` 与 `I18N` 的 `photo.N.*`
- **裁切比例**：`.frame-img` 固定 16:9，`object-fit: contain`；`.cell img` 用 3:2 裁切。
- **颜色**：`assets/css/main.css` 顶部 `:root` 的 `--paper`、`--cobalt`、`--rose`、`--yellow`。

## 图片与署名

16 张图均来自本次压缩包，已转为 WebP（长边 1800，质量 82），并生成 360px 缩略图。

画面中可见的署名已在页面中保留：

- 08 — 摄影 `chigu333` · 01/16/2026 · MR MMD World
- 09 — 摄影 `bao咖咖` · 06/26/2026 · VRChat Official Pride
- 10 — `Captured by link0319` · 06/16/2025 · Chongqing Night
- 13 — 画面中的帖子：`总督喵喵 @MoffCat`
- 其余 — lemon's secret garden

## 验收

- HTML 标签闭合、CSS 括号、i18n 键完整性（中英各 89 条）、33 个图片引用、ID 唯一性：脚本检查通过。
- 交互（胶片按钮、`PLAY/PAUSE`、灯箱前后切换、底部胶片条、接触印样、首屏照片、深浅链接、中英切换、滚动锁定）：jsdom 全部断言通过。
- 当前环境沙箱不能启动浏览器截图，所以**没有做真实浏览器的像素级验收**。建议打开后重点看：1440px 首屏、胶片拖动手感、390px 下 4×4 变 2 列的接触印样。
