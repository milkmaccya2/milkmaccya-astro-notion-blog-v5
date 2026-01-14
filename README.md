# Astro x Notion Blog v5

[![Astro](https://img.shields.io/badge/Astro-v5-orange?style=flat-square&logo=astro)](https://astro.build)
[![Notion API](https://img.shields.io/badge/Notion%20API-v2025--09--03-black?style=flat-square&logo=notion)](https://developers.notion.com)
[![React](https://img.shields.io/badge/React-v19-blue?style=flat-square&logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-000000?style=flat-square&logo=shadcnui)](https://ui.shadcn.com)

**Astro v5 Content Layer** と **Notion API** を組み合わせた、超高速かつモダンなブログスターターキットです。
NotionをCMS（コンテンツ管理システム）として利用し、記事の執筆体験とWebサイトのパフォーマンスを両立させます。

## ✨ 特徴 (Features)

- 🚀 **Astro v5 Content Layer**: 型安全なデータスキーマと、ビルド時の効率的なデータ取得を実現。
- 📝 **Notion as CMS**: 最新の Notion API (`v2025-09-03`) に完全対応。データベースIDからの自動解決ロジックを搭載。
- 🎨 **Modern UI/UX**:
  - **React + shadcn/ui**: タグフィルタリングなどのインタラクティブな機能に採用。
  - **Tailwind CSS v4**: 最新のCSSエンジンによる高速なスタイリング。
  - **Component Oriented**: `Header`, `Footer`, `PostCard` など、責務ごとに整理されたコンポーネント設計。
- 🏷️ **Dynamic Filtering**: クライアントサイドでの即時タグフィルタリング機能（React Hydration）。
- 🖼️ **Image Persistence**: 有効期限のあるNotion画像URLを、ビルド時にローカルに自動ダウンロードして永続化。
- ⚡ **Performance First**: アイランドアーキテクチャにより、必要な部分のみJavaScriptを配信（基本は静的HTML）。

## 🛠️ 技術スタック (Tech Stack)

- **Framework**: [Astro v5](https://astro.build)
- **UI Library**: [React 19](https://react.dev), [shadcn/ui](https://ui.shadcn.com)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **CMS / Data Source**: [Notion API](https://developers.notion.com), [@notionhq/client](https://github.com/makenotion/notion-sdk-js)
- **Content Processing**:
  - `notion-to-md`: NotionブロックをMarkdownに変換
  - `marked`: MarkdownをHTMLにレンダリング
- **Build Tooling**: Vite, TypeScript

## 🚀 セットアップ (Getting Started)

### 1. 前提条件
- Node.js (v18 or later)
- Notion アカウント と [Integration Token](https://www.notion.so/my-integrations)
- 公開用の Notion データベース

### 2. インストール

```bash
git clone https://github.com/milkmaccya2/astro-notion-blog-v5.git
cd astro-notion-blog-v5
npm install
```

### 3. 環境変数の設定

ルートディレクトリに `.env` ファイルを作成し、以下の情報を設定してください。

```env
NOTION_TOKEN=secret_your_integration_token
DATABASE_ID=your_database_id
```

> **Note**: Notionデータベースには、インテグレーション（コネクト）を追加してアクセス権限を付与してください。

### 4. 開発サーバーの起動

```bash
npm run dev
```
`http://localhost:4321` でローカルサーバーが起動します。

### 5. ビルド

プロダクション用の静的ファイルを生成します。

```bash
npm run build
```

> **Tip**: 開発中のビルド時間を短縮するため、`src/content.config.ts` 内で取得件数を制限する設定が可能です。

## ☁️ デプロイ (Cloudflare Pages)

このプロジェクトは静的サイトとしてビルドされるため、Cloudflare Pages, Vercel, Netlify などに簡単にデプロイできます。ここでは **Cloudflare Pages** へのデプロイ手順を説明します。

1.  **GitHub リポジトリの接続**: Cloudflare Pages のダッシュボードから「Create a project」>「Connect to Git」を選択し、このリポジトリを選択します。
2.  **ビルド設定**:以下のように設定します。
    - **Framework preset**: `Astro`
    - **Build command**: `npm run build`
    - **Build output directory**: `dist`
3.  **環境変数の設定**: 「Environment variables (Production)」に以下を追加します。
    - `NOTION_TOKEN`: ご自身の Notion Integration Token
    - `DATABASE_ID`: ご自身の Database ID
4.  **デプロイ**: 「Save and Deploy」をクリックすると、初回のビルドとデプロイが開始されます。

### ✨ Notion更新時の自動ビルド (Advanced)
Notionの記事を更新した際に自動でデプロイをトリガーするには、Cloudflare Pages の **Deploy Hooks** 機能を使用します。
発行された Deploy Hook URL を Notion のオートメーション機能や、iPaaS (Make, Zapier) から叩くことで、記事更新時に最新のサイトをビルドできます。

## 📂 プロジェクト構造

```
src/
├── components/          # UIコンポーネント
│   ├── ui/              # shadcn/ui コンポーネント
│   ├── BlogApp.tsx      # ブログ機能のメインコンテナ (React)
│   ├── TagFilter.tsx    # タグフィルター (React)
│   ├── PostCard.tsx     # 記事カード (React)
│   ├── Header.astro     # グローバルヘッダー
│   ├── Footer.astro     # グローバルフッター
│   └── ...
├── content.config.ts    # Notionデータ取得ロジック (Content Layer)
├── layouts/             # Astroレイアウト
├── pages/               # ルーティング
│   ├── index.astro      # トップページ
│   └── blog/[id].astro  # 記事詳細ページ
└── styles/              # グローバルスタイル (Tailwind)
```

## 🤝 Contributing

Pull Requestは大歓迎です！バグ報告や機能追加の提案はIssueまでお願いします。

## 📄 License

MIT License
