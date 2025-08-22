export default {
  apiKey: "JAsJUNqTU7pdD65lfKjLlCxzFPnryrh8Mq1t9xZA",
  baseUrl: "https://api.thenewsapi.com/v1/news/",
  getAllNews(search?: string) {
    return `${this.baseUrl}all?language=en,vi&api_token=${this.apiKey}${
      search ? `&search=${search}` : ""
    }`;
  },
  getUUIDNews(uuid: string) {
    return `${this.baseUrl}uuid/${uuid}?api_token=${this.apiKey}`;
  },
};

export type NewsAPIItem = {
  uuid: string;
  title: string;
  description: string;
  keywords: string;
  snippet: string;
  url: string;
  image_url: string;
  language: string;
  published_at: string;
  source: string;
  categories: string[];
  relevance_score?: number | null;
};
