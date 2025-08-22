import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams } from "expo-router";
import newsdata, { NewsAPIItem } from "@/config/thenewsapi";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Article() {
  const { id } = useLocalSearchParams();
  const [article, setArticle] = useState<NewsAPIItem | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(newsdata.getUUIDNews(id! as string));
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [id]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      {article ? (
        <View style={styles.container}>
          <Text style={styles.title}>{article.title}</Text>
          <Image
            source={{ uri: article.image_url }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 8,
              marginBottom: 8,
            }}
          />
          <Text style={styles.content}>{article.snippet}</Text>
          <Pressable
            onPress={() => {
              Linking.canOpenURL(article.url).then((supported: boolean) => {
                if (supported) {
                  Linking.openURL(article.url);
                } else {
                  console.log("Don't know how to open URI: " + article.url);
                }
              });
            }}
          >
            <Text style={styles.readMore}>Read more</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  readMore: {
    fontSize: 16,
    color: "#007BFF",
    marginTop: 8,
  },
});
