import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fetch from "node-fetch";

const SPACE_FLIGHT_NEWS_API_BASE = "https://api.spaceflightnewsapi.net/v4";

const server = new McpServer({
  name: "space-flight-news",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

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

function formatArticle(article: Article): string {
  return [
    `Title: ${article.title || "Unknown"}`,
    `Published: ${
      article.publishedAt
        ? new Date(article.publishedAt).toLocaleDateString()
        : "Unknown"
    }`,
    `Source: ${article.newsSite || "Unknown"}`,
    `Summary: ${article.summary || "No summary available"}`,
    `URL: ${article.url || "No URL available"}`,
    "---",
  ].join("\n");
}

async function makeSpaceFlightNewsRequest<T>(url: string): Promise<T | null> {
  const headers = {
    Accept: "application/json",
  };

  try {
    const response = await fetch(url, { headers });

    console.error(`[DEBUG] Request URL: ${url}`);
    console.error(`[DEBUG] Status: ${response.status}`);
    const bodyText = await response.text();
    console.error(`[DEBUG] Response Body (trimmed): ${bodyText.slice(0, 300)}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return JSON.parse(bodyText) as T;
  } catch (error) {
    console.error("Error making Space Flight News request:", error);
    return null;
  }
}

// 共通のロジックとして切り出し
async function fetchAndFormatArticles(
  url: string,
  fallbackMessage: string
): Promise<string> {
  const data = await makeSpaceFlightNewsRequest<ArticlesResponse>(url);

  if (!data || !data.results?.length) {
    return fallbackMessage;
  }

  const formatted = data.results.map(formatArticle).join("\n");
  return formatted;
}

server.tool(
  "get-latest-articles",
  "Get latest space flight news articles",
  {
    limit: z
      .number()
      .min(1)
      .max(50)
      .default(10)
      .describe("Number of articles to retrieve (1-50)"),
  },
  async ({ limit }) => {
    const url = `${SPACE_FLIGHT_NEWS_API_BASE}/articles?limit=${limit}`;
    const message = await fetchAndFormatArticles(
      url,
      "No latest articles available."
    );

    return {
      content: [
        { type: "text", text: `Latest space flight news:\n\n${message}` },
      ],
    };
  }
);

server.tool(
  "search-articles",
  "Search space flight news articles by keyword",
  {
    keyword: z.string().min(1).describe("Keyword to search for in articles"),
    limit: z
      .number()
      .min(1)
      .max(50)
      .default(10)
      .describe("Number of articles to retrieve (1-50)"),
  },
  async ({ keyword, limit }) => {
    const url = `${SPACE_FLIGHT_NEWS_API_BASE}/articles?search=${encodeURIComponent(
      keyword
    )}&limit=${limit}`;
    const message = await fetchAndFormatArticles(
      url,
      `No articles found for keyword: "${keyword}"`
    );

    return {
      content: [
        {
          type: "text",
          text: `Search results for "${keyword}":\n\n${message}`,
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Space Flight News MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
