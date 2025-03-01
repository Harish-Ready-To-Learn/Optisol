import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchNews} from './src/utils/api';
import NewsItem from './src/components/NewsItem';

const App = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadNews = async newPage => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await fetchNews(newPage);
      console.log(data);
      if (data.articles.length > 0) {
        setNews(prevNews => [...prevNews, ...data.articles]);
        setPage(newPage);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to load news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews(1);
  }, []);

  const loadMore = () => {
    if (hasMore) {
      loadNews(page + 1);
    }
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <FlatList
        data={news}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => <NewsItem item={item} index={index} />}
        onEndReached={loadMore} // Load more data when reaching the end
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="blue" /> : null
        }
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
