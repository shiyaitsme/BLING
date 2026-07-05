# BLING — 花滑美学 App 原型

分离式工程结构，纯静态，无构建步骤。

## 目录结构

```
BLING_web/
├── index.html          # 页面结构（所有屏幕 / 弹层）
├── css/
│   └── styles.css      # 全部样式
├── js/
│   ├── resources.js    # 图片资源路径表（window.__resources）
│   └── app.js          # 全部交互逻辑
├── images/             # 所有图片（相对路径引用，无 base64 内联）
└── audio/
    └── track.mp3       # 播放器音频
```

## 运行

因为用到相对路径加载本地资源，直接双击 `index.html` 在部分浏览器会被 CORS 拦截。建议用本地静态服务器：

```bash
cd BLING_web
python3 -m http.server 8000
# 打开 http://localhost:8000
```

或用 VS Code 的 Live Server 插件。

## 字体

`index.html` 通过 Google Fonts 加载 Abhaya Libre 与 DM Sans，需要联网。如需完全离线，可下载字体文件放入 `fonts/` 并在 `css/styles.css` 顶部用 `@font-face` 引入。

## 主要功能模块（app.js）

- 社区文章详情 + 评论（`openPost` / `sendComment`）
- 新建文章 / 私人笔记（`openNewSheet` / `publishArticle` / `publishNote`）
- 购物车 + 支付流程（`addToCart` / `openCheckout` / `processPayment`）
- 缪斯问答（`museSend` / `museSendChip`，当前为预设问题库，暂未接入真实对话 API）
- BLING ARC 年度回顾（`openArc`）
- 音乐印花定制 5 步流程（`openPrintCustom` / `generatePattern`）
