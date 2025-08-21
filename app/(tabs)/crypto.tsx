import newsdata from "@/config/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function Crypto() {
  const [cryptoNews, setCryptoNews] = useState([]);

  useEffect(() => {
    const fetchCryptoNews = async () => {
      try {
        const response = await axios.get(newsdata.getCryptoNews());
        if (response.data.status === "success")
          setCryptoNews(response.data.results);
      } catch (error) {
        console.error("Error fetching crypto news:", error);
      }
    };

    fetchCryptoNews();
  }, []);

  return (
    <>
      {cryptoNews.length === 0 ? (
        <View>
          <Text>No crypto news available</Text>
        </View>
      ) : (
        <FlatList
          data={cryptoNews}
          renderItem={({ item }: { item: any }) => (
            <View>
              <Text>{item.title}</Text>
            </View>
          )}
          keyExtractor={(item) => item.article_id}
        />
      )}
    </>
  );
}
