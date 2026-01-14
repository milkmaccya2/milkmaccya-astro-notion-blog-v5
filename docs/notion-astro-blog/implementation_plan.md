# 実装計画: Notion x Astro v5 ブログ構築 - Step 2

## 概要
Astro v5の Content Layer 機能を使用して、Notion API からブログ記事データを取得する Notion Loader を実装します。取得したデータをコンテンツコレクションとして定義し、トップページに記事一覧を表示します。

## 変更内容
1.  **依存関係のインストール**
    - `npm install @notionhq/client`
    - `npm install -D @types/node` (環境変数の型定義のため)

2.  **Notion Loader の実装**
    - `src/content.config.ts` (または `src/content/config.ts`) を作成します。
    - `@notionhq/client` を使用して Notion API からデータベースをクエリする関数を作成します。
    - `defineCollection` の `loader` プロパティにこの関数を設定し、`blog` コレクションを定義します。
    - スキーマ定義: 記事のタイトル、公開日、タグ、スラッグ等の最低限のプロパティをマッピングします。

3.  **データ表示**
    - `src/pages/index.astro` を更新します。
    - `getCollection('blog')` を使用して記事データを取得。
    - 取得した記事タイトルの一覧をブラウザ上に表示します。

## 検証手順
- `npm run dev` でローカルサーバーを起動。
- コンソールに Notion API からのデータ取得ログが表示されるか確認（実装時にログ出力を追加）。
- ブラウザのトップページに、Notion データベースにある記事のタイトルが表示されていることを確認。
