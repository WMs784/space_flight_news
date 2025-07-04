# Space Flight News MCP Server - Coding Standards

## プロジェクト概要
このプロジェクトは TypeScript で書かれた Model Context Protocol (MCP) サーバーで、Space Flight News API と連携して宇宙関連ニュースを提供します。

## 技術スタック
- **言語**: TypeScript (ES2022)
- **モジュールシステム**: ES Modules (Node16)
- **パッケージマネージャー**: npm
- **テストフレームワーク**: Jest
- **API クライアント**: node-fetch
- **バリデーション**: Zod

## コーディング規約

### 1. ファイル構成
```
src/
  index.ts          # メインエントリーポイント
tests/
  *.test.js         # テストファイル（JavaScript）
build/              # TypeScript コンパイル結果
coverage/           # テストカバレッジレポート
```

### 2. TypeScript 設定
- **Target**: ES2022
- **Module**: Node16 (ES Modules)
- **Strict Mode**: 有効
- **Isolated Modules**: 有効
- **出力ディレクトリ**: `./build`

### 3. 命名規則

#### 定数
```typescript
const SPACE_FLIGHT_NEWS_API_BASE = "https://api.spaceflightnewsapi.net/v4";
```
- 全て大文字、アンダースコア区切り

#### 関数
```typescript
export function formatArticle(article: Article): string
export async function makeSpaceFlightNewsRequest<T>(url: string): Promise<T | null>
export async function fetchAndFormatArticles(url: string, fallbackMessage: string): Promise<string>
```
- camelCase
- 動詞で始まる
- 非同期関数には `async` キーワード
- ジェネリクス使用時は `<T>` 形式

#### インターフェース
```typescript
interface Article {
  id: number;
  title?: string;
  url?: string;
  summary?: string;
  publishedAt?: string;
  newsSite?: string;
}

interface ArticlesResponse {
  results: Article[];
  count: number;
}
```
- PascalCase
- オプショナルプロパティは `?` 使用

#### 変数
```typescript
const server = new McpServer({ ... });
const headers = { Accept: "application/json" };
const bodyText = await response.text();
```
- camelCase
- `const` を優先、必要に応じて `let`

### 4. 文字列とクォート
- **ダブルクォート** を基本使用
- テンプレートリテラルは バッククォート使用
```typescript
const message = "No latest articles available."
const url = `${SPACE_FLIGHT_NEWS_API_BASE}/articles?limit=${limit}`;
```

### 5. インデント・フォーマット
- **2スペース** インデント
- 配列・オブジェクトの複数行記述時は各要素を改行
```typescript
return [
  `Title: ${article.title || "Unknown"}`,
  `Published: ${publishedAt || "Unknown"}`,
  `Source: ${article.newsSite || "Unknown"}`,
  "---",
].join("\n");
```

### 6. エラーハンドリング
```typescript
try {
  const response = await fetch(url, { headers });
  // ...
} catch (error) {
  console.error("Error making Space Flight News request:", error);
  return null;
}
```
- try-catch で適切にエラーをキャッチ
- `console.error` でエラーログ出力
- `null` または適切なフォールバック値を返却

### 7. デバッグログ
```typescript
console.error(`[DEBUG] Request URL: ${url}`);
console.error(`[DEBUG] Status: ${response.status}`);
console.error(`[DEBUG] Response Body (trimmed): ${bodyText.slice(0, 300)}`);
```
- `console.error` を使用（stdioサーバーのため）
- `[DEBUG]` プレフィックス付き
- 長いレスポンスは切り詰め（300文字）

### 8. 非同期処理
```typescript
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
```
- `async/await` を使用
- トップレベルでの `.catch()` でエラーハンドリング
- 致命的エラー時は `process.exit(1)`

### 9. バリデーション
```typescript
{
  limit: z
    .number()
    .min(1)
    .max(50)
    .default(10)
    .describe("Number of articles to retrieve (1-50)"),
}
```
- Zod スキーマでバリデーション
- チェーン記法で制約を定義
- `describe()` で説明を追加

### 10. コメント
```typescript
// 共通のロジックとして切り出し
export async function fetchAndFormatArticles(...)
```
- 日本語コメント可
- 関数・ロジックの説明を簡潔に記述

## テスト規約

### ファイル命名
- `*.test.js` 形式
- JavaScript で記述（ESM 問題回避）

### テスト構造
```javascript
describe('Space Flight News MCP Server', () => {
  describe('Basic functionality', () => {
    it('should pass a simple test', () => {
      expect(2 + 2).toBe(4);
    });
  });
});
```
- `describe` でグループ化
- `it` で個別テストケース
- `should` で始まる説明文

## ビルド・実行

### 開発コマンド
```bash
npm run build       # TypeScript コンパイル
npm test           # テスト実行
npm run test:coverage  # カバレッジ付きテスト
```

### 本番実行
```bash
npm start          # ビルド済みファイルを実行
```

## 依存関係管理
- 外部 API 呼び出しには `node-fetch` 使用
- 型安全性のため TypeScript strict mode 有効
- MCP SDK は最新バージョン使用
- テスト関連は devDependencies に配置