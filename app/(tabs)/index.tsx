import newsdata from "@/config/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await axios.get(newsdata.getLatestNews());
        if (response.data.status === "success")
          setLatestNews(response.data.results);
      } catch (error) {
        console.error("Error fetching latest news:", error);
      }
    };

    fetchLatestNews();
  }, []);

  return (
    <FlatList
      data={latestNews}
      style={styles.container}
      renderItem={({ item }: { item: any }) => (
        <View style={styles.item}>
          <Image source={{ uri: item.image_url }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.sourceContainer}>
            <Text style={styles.sourceLabel}>Source:</Text>
            <Text style={styles.source}>{item.source_name}</Text>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.article_id}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#666",
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  sourceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: 8,
  },
  sourceLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
  source: {
    fontSize: 12,
    color: "#666",
  },
});
