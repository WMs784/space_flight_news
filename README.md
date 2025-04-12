# 🛰️ Space Flight News MCP Server

This project is a [Model Context Protocol (MCP)](https://modelcontextprotocol.org) server that integrates with the [Space Flight News API](https://spaceflightnewsapi.net) to provide up-to-date spaceflight-related news articles. It exposes tools that can be consumed by AI assistants or other MCP-compatible clients.

---

## 🚀 Features

- 🔍 Search for space flight news articles by keyword
- 🆕 Retrieve the latest published articles
- 🔌 Compatible with any tool consuming MCP via stdio transport
- 📦 Built using TypeScript, `node-fetch`, and `zod`

---

## 📦 Requirements

- **Node.js** v18 or later
- **npm** (or **yarn**)

---

## 🛠️ Installation

```bash
git clone https://github.com/your-username/space-flight-news-mcp.git
cd space-flight-news-mcp
npm install
```

---

## ▶️ Usage

To start the MCP server:

```bash
npm run build
npm start
```

This launches the MCP server using standard input/output (stdio) for communication—ideal for integration into AI agent environments like Claude, ChatGPT, or similar.

---

## 🧰 Available Tools

### `get-latest-articles`

Get the latest spaceflight news.

- **Parameters:**
  - `limit` _(optional)_: Number of articles to retrieve (1–50). Default: `10`

---

### `search-articles`

Search articles using a keyword.

- **Parameters:**
  - `keyword` _(required)_: Term to search for
  - `limit` _(optional)_: Number of articles to retrieve (1–50). Default: `10`

---

## 💬 Example Output

```
Title: NASA's Artemis Mission Update
Published: 4/10/2025
Source: NASA
Summary: NASA announced updates to its upcoming Artemis II mission...
URL: https://www.nasa.gov/article/artemis-update
---
```

---

## 🧱 Tech Stack

- [Model Context Protocol SDK](https://modelcontextprotocol.org)
- [Space Flight News API](https://spaceflightnewsapi.net)
- [`node-fetch`](https://www.npmjs.com/package/node-fetch) – HTTP client
- [`zod`](https://zod.dev) – Schema validation for tool parameters

---

## 🐛 Debugging

The server logs detailed request info via `console.error()`, including:

- Requested URL
- HTTP status code
- Trimmed response body (for easier inspection)

---

## 📄 License

MIT License

---

Made with 💫 and curiosity for the stars by WMs784.

---

# 🛰️ Space Flight News MCP サーバー

このプロジェクトは [Model Context Protocol (MCP)](https://modelcontextprotocol.org) に対応したサーバーで、[Space Flight News API](https://spaceflightnewsapi.net) と連携し、宇宙開発に関する最新ニュース記事を提供します。AI アシスタントや MCP 互換クライアントから利用できるツールを公開しています。

---

## 🚀 主な機能

- 🔍 キーワードによる宇宙ニュース記事の検索
- 🆕 最新の宇宙ニュースの取得
- 🔌 標準入出力 (stdio) を使った MCP 通信に対応
- 📦 TypeScript、`node-fetch`、`zod` による構成

---

## 📦 必要環境

- **Node.js** v18 以上
- **npm** または **yarn**

---

## 🛠️ インストール

```bash
git clone https://github.com/your-username/space-flight-news-mcp.git
cd space-flight-news-mcp
npm install
```

---

## ▶️ 実行方法

MCP サーバーを起動するには以下のコマンドを使用します：

```bash
npm run build
npm start
```

標準入出力を介して通信する形式で起動します。これは Claude、ChatGPT などの AI エージェントとの統合に適しています。

---

## 🧰 提供ツール一覧

### `get-latest-articles`

最新の宇宙ニュースを取得します。

- **パラメータ:**
  - `limit` _(任意)_: 取得する記事数（1 ～ 50）。デフォルトは `10`

---

### `search-articles`

指定したキーワードで宇宙ニュース記事を検索します。

- **パラメータ:**
  - `keyword` _(必須)_: 検索キーワード
  - `limit` _(任意)_: 取得する記事数（1 ～ 50）。デフォルトは `10`

---

## 💬 出力例

```
Title: NASAのアルテミス計画アップデート
Published: 2025/04/10
Source: NASA
Summary: NASAは今後のアルテミスIIミッションの最新情報を発表しました...
URL: https://www.nasa.gov/article/artemis-update
---
```

---

## 🧱 使用技術

- [Model Context Protocol SDK](https://modelcontextprotocol.org)
- [Space Flight News API](https://spaceflightnewsapi.net)
- [`node-fetch`](https://www.npmjs.com/package/node-fetch) – HTTP リクエスト
- [`zod`](https://zod.dev) – パラメータバリデーション

---

## 🐛 デバッグ情報

サーバーは以下の情報を `console.error()` 経由で詳細にログ出力します：

- リクエスト URL
- HTTP ステータスコード
- レスポンス本文（300 文字までトリム）

---

## 📄 ライセンス

MIT ライセンス

---

💫 WMs784 の宇宙への好奇心によって作られました。
