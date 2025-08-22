const newsdata = {
  apiKey: "pub_a1c5196986024ed181f2e63abdb221b3",
  baseUrl: "https://newsdata.io/api/1/",
  endpoints: {
    latest: "latest",
    archives: "archive",
    crypto: "crypto",
    sources: "sources",
  },
  country: [],
  language: ["en", "vi"],
  getLatestNews: function (id: string | null = null) {
    return `${this.baseUrl}${this.endpoints.latest}?apikey=${this.apiKey}${
      id ? `&id=${id}` : `&language=${this.language.join(",")}`
    }`;
  },
  getArchives: function () {
    return `${this.baseUrl}${this.endpoints.archives}?apikey=${
      this.apiKey
    }&language=${this.language.join(",")}`;
  },
  getCryptoNews: function (id: string | null = null) {
    return `${this.baseUrl}${this.endpoints.crypto}?apikey=${
      this.apiKey
    }&language=${this.language.join(",")} `;
  },
  getSources: function () {
    return `${this.baseUrl}${this.endpoints.sources}?apikey=${
      this.apiKey
    }&language=${this.language.join(",")}`;
  },
};

export default newsdata;
