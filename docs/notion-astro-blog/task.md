# Notion x Astro v5 ブログ構築 タスクリスト

## ロードマップ

- [ ] **Step 0: 準備と概念理解** <!-- id: 0 -->
    - [x] Notion Integration Token の取得 <!-- id: 1 -->
    - [x] Notionデータベース作成 & ID取得 <!-- id: 2 -->
    - [x] インテグレーションをデータベースに接続 <!-- id: 3 -->

- [x] **Step 1: 環境構築とスタイリング基盤** <!-- id: 4 -->
    - [x] Astro v5 プロジェクト作成 (Minimal template) <!-- id: 5 -->
    - [x] Tailwind CSS v4 の導入 (@import "tailwindcss";) <!-- id: 6 -->
    - [x] `src/styles/global.css` 作成 <!-- id: 7 -->
    - [x] 基本レイアウトコンポーネント (`src/layouts/Layout.astro`) 作成 <!-- id: 8 -->
    - [x] 動作確認 (Tailwindのスタイル反映確認) <!-- id: 9 -->

- [x] **Step 2: Content Layerでのデータ取得** <!-- id: 10 -->
    - [x] `@notionhq/client` インストール <!-- id: 11 -->
    - [x] 環境変数 (.env) の設定 <!-- id: 12 -->
    - [x] Notion Loader 実装 (`src/content.config.ts`) <!-- id: 13 -->
        - NOTE: API v2025-09-03に対応（Database IDからDataSource IDを解決して取得）
    - [x] 記事一覧ページ作成 (`src/pages/index.astro`) <!-- id: 14 -->

- [x] **Step 3: 記事詳細ページとNotion Blockのレンダリング** <!-- id: 15 -->
    - [x] 動的ルート作成 (`src/pages/blog/[id].astro`) <!-- id: 16 -->
    - [x] レンダリングロジック実装 (notion-to-md + marked) <!-- id: 17 -->
        - `p-limit` で並行数を制御してAPI制限を回避
    - [x] Notionプロパティ（要約、タグ）の取得と表示強化 <!-- id: 18 -->

- [ ] **Step 4: デプロイと自動化** <!-- id: 19 -->
    - [ ] GitHubへのプッシュ <!-- id: 20 -->
        - ※ユーザー作業: リポジトリ作成とPushをお願いします
    - [ ] Cloudflare Pages 連携 & デプロイ <!-- id: 21 -->
        - ※ユーザー作業: Pushするだけで自動デプロイ可能です
    - [ ] Deploy Hook の設定 <!-- id: 22 -->
    - [x] 画像の永続化処理 (Asset機能) <!-- id: 18 -->
    - [x] クリーンアップと依存関係整理
- [x] **Step 5: 動作確認** <!-- id: 22 -->
    - [x] プロダクションビルド確認 (`npm run build`) <!-- id: 23 -->
        - 正常にビルド完了
    - [x] プレビュー確認 (`npm run preview`) <!-- id: 24 -->

- [x] **Step 6: UI強化とリファクタリング** <!-- id: 25 -->
    - [x] React & shadcn/ui 導入 <!-- id: 26 -->
    - [x] コンポーネント分割とReact化 (`BlogApp`, `TagFilter`, `PostCard`) <!-- id: 27 -->
    - [x] Astroコンポーネント整理 (`Header`, `Footer`, `Hero`) <!-- id: 28 -->
    - [x] 詳細ページコンポーネント分割 (`PostHeader`, `PostBody`) <!-- id: 29 -->
