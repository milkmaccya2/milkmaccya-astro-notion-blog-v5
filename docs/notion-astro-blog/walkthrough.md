# 変更履歴 (Walkthrough)

## Step 6: UI強化とリファクタリング
- [x] **Shadcn/ui & React 導入**
    - `npx astro add react`, `npx shadcn@latest init` を実行。
    - `Button`, `Badge`, `Card`, `Separator` コンポーネントを追加。
- [x] **フィルタリング機能のReact化**
    - `src/components/BlogApp.tsx`: 状態管理を行うコンテナ。
    - `src/components/TagFilter.tsx`: タグ選択UI。
    - `src/components/PostCard.tsx`: 記事カードUI。
    - これらを `index.astro` で `client:load` ディレクティブを使ってハイドレーション。
- [x] **Astroコンポーネント整理**
    - `Header.astro`, `Footer.astro`, `Hero.astro` を作成し、`Layout.astro` と `index.astro` から切り出し。
- [x] **詳細ページリファクタリング**
    - `PostHeader.astro`, `PostBody.astro` を作成し、`src/pages/blog/[id].astro` を整理。

## Step 4: 仕上げと最適化
- [x] 画像の永続化 (Image Persistence)
    - Notion APIから得られる画像URLは1時間の有効期限があるため、ビルド時に画像をダウンロードする処理を実装。
    - `src/content.config.ts` にカスタムトランスフォーマーを追加。
    - 保存先: `public/notion-images/`
    - `.gitignore` 設定追加。
- [x] 依存関係の整理
    - `package.json` を見直し、`tailwindcss` や `@tailwindcss/vite` を `devDependencies` に移動。
- [x] クリーンアップ
    - 開発用のデバッグスクリプト (`debug-notion.js` 等) を削除。
- [x] **開発用ビルド高速化**
    - `src/content.config.ts` で一時的に取得件数を1件に制限。

## Step 3: 記事詳細ページとNotion Blockのレンダリング
- [x] 本文取得ロジックの実装 (`src/content.config.ts`)
    - `notion-to-md` を導入し、NotionブロックをMarkdownに変換。
    - `p-limit` を導入し、100件のページに対する本文取得を並行数3に制限することで、Notion APIのレート制限(3 req/sec)を回避。
    - Loaderのスキーマに `summary`, `tags`, `body` を追加し、データをマッピング。
- [x] 詳細ページ作成 (`src/pages/blog/[id].astro`)
    - 動的ルート `[id].astro` を作成。
    - `marked` を導入し、Markdown本文をHTMLに変換してレンダリング。
    - Tailwind Typography プラグインを導入し、`prose` クラスで記事のデザインを整えた。
- [x] 一覧ページの機能強化 (`src/pages/index.astro`)
    - **タグフィルタリング**: クライアントサイドJSでタグによる記事の絞り込み機能を実装（後にReact化）。
    - **UI改善**: カード型レイアウトにホバーエフェクト、要約、タグ表示を追加。タグクリックでフィルタリングが動作。
    - 記事カード全体を詳細ページへのリンク化。

## Step 2: Content Layerでのデータ取得
- [x] Notion Client 導入
    - `npm install @notionhq/client`
- [x] Notion Loader 実装 (`src/content.config.ts`)
    - **Update**: Notion API 最新版 (`v2025-09-03`) に完全対応。
    - **Logic**:
        1. `databases.retrieve({ database_id })` でデータベース情報を取得。
        2. レスポンス内の `data_sources` 配列から `id` を抽出（これが真のデータソースID）。
        3. `dataSources.query({ data_source_id })` (または `request` メソッド) でデータを取得。
    - これにより、既存のDatabase IDを変更することなく、新しいAPI仕様に準拠してデータを取得可能になりました。
    - `defineCollection` で `loader` を定義し、Notionから全ページを取得・変換。
- [x] データ表示 (`src/pages/index.astro`)
    - `getCollection('blog')` でデータを取得。
    - 記事タイトルと日付を表示するカード型レイアウトを実装。
    - **Fix**: Frontmatter (`---`) の記述漏れを修正してビルドエラーを解消。

## Step 1: 環境構築とスタイリング基盤
- [x] Astro プロジェクト初期化
    - `npm create astro@latest` (Minimal template)
- [x] Tailwind CSS v4 導入
    - `npm install tailwindcss @tailwindcss/vite`
    - `astro.config.mjs` に Tailwind Vite plugin を追加
- [x] スタイリング設定
    - `src/styles/global.css`: `@import "tailwindcss";` と CSS変数を定義
- [x] レイアウト作成
    - `src/layouts/Layout.astro`: ヘッダー・フッターを含む基本レイアウト
- [x] ホームページ更新
    - `src/pages/index.astro`: Tailwindスタイルを適用したデモページ
- [x] 環境変数設定
    - `.env`: Notion Token, Database ID を保存
