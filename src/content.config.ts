import { defineCollection, z } from 'astro:content';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import pLimit from 'p-limit';
import fs from 'node:fs';
import path from 'node:path';

// 最新のAPIを使用 (v2025-09-03)
const notion = new Client({ auth: import.meta.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });
const limit = pLimit(3);

// 画像ダウンロード用のカスタムトランスフォーマー
n2m.setCustomTransformer('image', async (block) => {
  const { image } = block as any;
  if (!image) return "";

  const type = image.type;
  const url = image[type].url;
  const caption = image.caption?.map((c: any) => c.plain_text).join("") || "";

  // ファイル名と保存先の決定
  const blockId = block.id;
  // URLから拡張子を推測（デフォルトはjpg）
  let ext = 'jpg';
  try {
      const urlObj = new URL(url);
      if (urlObj.pathname.match(/\.png$/)) ext = 'png';
      if (urlObj.pathname.match(/\.gif$/)) ext = 'gif';
      if (urlObj.pathname.match(/\.jpeg$/)) ext = 'jpeg';
  } catch (e) {
      // ignore check
  }

  const fileName = `${blockId}.${ext}`;
  const saveDir = path.join(process.cwd(), 'public', 'notion-images');
  
  // 保存ディレクトリがない場合は作成
  if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir, { recursive: true });
  }

  const filePath = path.join(saveDir, fileName);
  const publicPath = `/notion-images/${fileName}`;

  // 画像をダウンロード（既に存在する場合はスキップしてビルド高速化）
  if (!fs.existsSync(filePath)) {
      try {
          const res = await fetch(url);
          if (res.ok) {
              const buffer = Buffer.from(await res.arrayBuffer());
              fs.writeFileSync(filePath, buffer);
              console.log(`Downloaded image: ${fileName}`);
          } else {
              console.warn(`Failed to download image: ${url}`);
          }
      } catch (e) {
          console.error(`Error downloading image ${fileName}:`, e);
      }
  }

  return `![${caption}](${publicPath})`;
});

const notionLoader = async () => {
  const rawDatabaseId = import.meta.env.DATABASE_ID;
  const databaseId = rawDatabaseId?.trim();
  
  if (!databaseId) {
    console.error("DATABASE_ID is missing");
    return [];
  }

  try {
    // 1. データベース情報を取得して、紐づくData Source IDを特定します
    const dbResponse = await notion.databases.retrieve({
      database_id: databaseId,
    }) as any; 

    // v2025-09-03以降、databases.retrieve は data_sources 配列を返します
    const dataSourceId = dbResponse.data_sources?.[0]?.id;

    if (!dataSourceId) {
        console.error("Data Source ID not found in database metadata.");
        return [];
    }

    console.log(`Resolved Data Source ID: ${dataSourceId}`);

    // 2. Data Source ID を使用して記事データを取得 (開発中は1ページのみ取得して高速化)
    let allResults: any[] = [];
    let hasMore = true;
    let nextCursor: string | undefined = undefined;

    while (hasMore) {
        // @ts-ignore
        const response = await notion.dataSources.query({
            data_source_id: dataSourceId,
            start_cursor: nextCursor,
            page_size: 1 // 開発用に1件に制限
        });

        allResults = [...allResults, ...response.results];
        
        // 開発中は1回で抜ける (実際は has_more を見るが)
        break;
        
        /* 
        hasMore = response.has_more;
        // next_cursor can be null, match strict signature
        nextCursor = response.next_cursor ?? undefined;
        */
    }

    console.log(`Fetched total ${allResults.length} pages from Notion.`);

    // 3. 各ページの本文を取得してMarkdownに変換 (p-limitで並行数制御)
    const posts = await Promise.all(allResults.map((page: any) => limit(async () => {
        // Delay to be gentle
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const properties = page.properties;
        
        // タイトル取得
        const titlePropKey = Object.keys(properties).find(k => properties[k].type === 'title');
        const title = titlePropKey ? properties[titlePropKey].title[0]?.plain_text : 'Untitled';

        // 要約取得
        const summaryProp = properties['要約'];
        const summary = summaryProp?.rich_text?.[0]?.plain_text || '';

        // タグ取得
        const tagsProp = properties['タグ'];
        const tags = tagsProp?.multi_select?.map((tag: any) => tag.name) || [];

        // 日付取得
        const date = page.created_time;

        // 本文取得 & Markdown変換
        const mdblocks = await n2m.pageToMarkdown(page.id);
        const mdString = n2m.toMarkdownString(mdblocks);

        return {
            id: page.id,
            title: title || 'No Title',
            date: date,
            summary: summary,
            tags: tags,
            body: mdString.parent, // Markdown本文
        };
    })));

    return posts;

  } catch (error) {
    console.error("Error fetching data from Notion:", error);
    return [];
  }
};

const blog = defineCollection({
  loader: notionLoader,
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
    summary: z.string().optional(),
    tags: z.array(z.string()).optional(),
    body: z.string().optional(),
  }),
});

export const collections = { blog };
