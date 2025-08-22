import newsdata, { NewsAPIItem } from "@/config/thenewsapi";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { Link } from "expo-router";

export default function Index() {
  const [allNews, setAllNews] = useState<NewsAPIItem[]>([]);

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        const response = await axios.get(newsdata.getAllNews("crypto"));
        setAllNews(response.data.data);
      } catch (error) {
        console.error("Error fetching all news:", error);
      }
    };

    fetchAllNews();
  }, []);

  return (
    <FlatList
      data={allNews}
      style={styles.container}
      renderItem={({ item }: { item: any }) => (
        <View style={styles.item}>
          <Image source={{ uri: item.image_url }} style={styles.image} />
          <Link href={`/article/${item.uuid}`} asChild>
            <Pressable>
              <Text style={styles.title}>{item.title}</Text>
            </Pressable>
          </Link>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.sourceContainer}>
            <Text style={styles.sourceLabel}>Source:</Text>
            <Text style={styles.source}>{item.source}</Text>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.uuid}
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
