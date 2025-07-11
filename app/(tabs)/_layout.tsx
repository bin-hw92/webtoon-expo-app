import { historyAtom } from "@/hooks/stackJotai";
import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import {
  BackHandler,
  Dimensions,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from "react-native";

import WebView, { WebViewNavigation } from "react-native-webview";

import type WebViewType from "react-native-webview";

export default function TabLayout() {
  const [refreshing, setRefreshing] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(
    () => history?.at(-1) || "https://tkor038.com/%EC%9B%B9%ED%88%B0/%EC%9B%94"
  );

  const webviewRef = useRef<WebViewType>(null);

  const [history, setHistory] = useAtom(historyAtom);

  const onNavChange = (navState: WebViewNavigation) => {
    const url = navState.url;
    if (url !== history[history.length - 1]) {
      setHistory([...history, url]);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    webviewRef.current?.reload();
  };

  useEffect(() => {
    const onBackPress = () => {
      if (history.length > 1) {
        const newHistory = [...history];
        newHistory.pop(); // 현재 URL 제거
        const prevUrl = newHistory[newHistory.length - 1];
        setHistory(newHistory);
        setCurrentUrl(prevUrl); // 여기서 WebView가 새로운 URL로 렌더됨
        return true;
      }
      return false;
    };

    const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => sub.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  console.log(history, "history");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ height: Dimensions.get("window").height }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#2196F3"]}
          />
        }
      >
        <WebView
          ref={webviewRef}
          source={{ uri: currentUrl }}
          onNavigationStateChange={onNavChange}
          onLoadEnd={() => setRefreshing(false)}
          style={{ flex: 1 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
