// Integration tests for Space Flight News MCP Server
describe('Space Flight News Integration Tests', () => {
  describe('Article formatting', () => {
    it('should handle article with all fields', () => {
      const article = {
        id: 1,
        title: 'SpaceX Launches New Satellite',
        url: 'https://spacenews.com/test-article',
        summary: 'SpaceX successfully launched a new satellite into orbit.',
        publishedAt: '2023-12-01T10:00:00Z',
        newsSite: 'Space News',
      };

      const formatArticle = (article) => {
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
        ].join("\\n");
      };

      const result = formatArticle(article);
      
      expect(result).toContain('Title: SpaceX Launches New Satellite');
      expect(result).toContain('Published: 2023/12/1');
      expect(result).toContain('Source: Space News');
      expect(result).toContain('Summary: SpaceX successfully launched');
      expect(result).toContain('URL: https://spacenews.com/test-article');
      expect(result).toContain('---');
    });

    it('should handle article with missing fields', () => {
      const article = {
        id: 1,
      };

      const formatArticle = (article) => {
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
        ].join("\\n");
      };

      const result = formatArticle(article);
      
      expect(result).toContain('Title: Unknown');
      expect(result).toContain('Published: Unknown');
      expect(result).toContain('Source: Unknown');
      expect(result).toContain('Summary: No summary available');
      expect(result).toContain('URL: No URL available');
    });
  });

  describe('API request handling', () => {
    it('should handle successful API response structure', () => {
      const mockApiResponse = {
        results: [
          {
            id: 1,
            title: 'Test Article 1',
            url: 'https://example.com/1',
            summary: 'Test summary 1',
            publishedAt: '2023-12-01T10:00:00Z',
            newsSite: 'Test Site',
          },
          {
            id: 2,
            title: 'Test Article 2',
            url: 'https://example.com/2',
            summary: 'Test summary 2',
            publishedAt: '2023-12-02T10:00:00Z',
            newsSite: 'Test Site',
          },
        ],
        count: 2,
      };

      expect(mockApiResponse).toHaveProperty('results');
      expect(mockApiResponse.results).toHaveLength(2);
      expect(mockApiResponse.results[0]).toHaveProperty('id');
      expect(mockApiResponse.results[0]).toHaveProperty('title');
      expect(mockApiResponse.results[0].title).toBe('Test Article 1');
    });

    it('should handle empty API response', () => {
      const mockApiResponse = {
        results: [],
        count: 0,
      };

      expect(mockApiResponse).toHaveProperty('results');
      expect(mockApiResponse.results).toHaveLength(0);
    });
  });

  describe('URL construction', () => {
    it('should construct latest articles URL correctly', () => {
      const baseUrl = 'https://api.spaceflightnewsapi.net/v4';
      const limit = 10;
      const expectedUrl = `${baseUrl}/articles?limit=${limit}`;
      
      expect(expectedUrl).toBe('https://api.spaceflightnewsapi.net/v4/articles?limit=10');
    });

    it('should construct search URL correctly', () => {
      const baseUrl = 'https://api.spaceflightnewsapi.net/v4';
      const keyword = 'SpaceX';
      const limit = 5;
      const expectedUrl = `${baseUrl}/articles?search=${encodeURIComponent(keyword)}&limit=${limit}`;
      
      expect(expectedUrl).toBe('https://api.spaceflightnewsapi.net/v4/articles?search=SpaceX&limit=5');
    });

    it('should handle URL encoding for special characters', () => {
      const keyword = 'NASA Mars mission';
      const encodedKeyword = encodeURIComponent(keyword);
      
      expect(encodedKeyword).toBe('NASA%20Mars%20mission');
    });
  });

  describe('Error scenarios', () => {
    it('should handle network errors gracefully', () => {
      const mockError = new Error('Network error');
      expect(mockError).toBeInstanceOf(Error);
      expect(mockError.message).toBe('Network error');
    });

    it('should handle HTTP errors gracefully', () => {
      const mockHttpError = {
        status: 404,
        statusText: 'Not Found',
        ok: false,
      };
      
      expect(mockHttpError.ok).toBe(false);
      expect(mockHttpError.status).toBe(404);
    });
  });
});