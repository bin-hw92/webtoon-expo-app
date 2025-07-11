import { historyAtom } from "@/hooks/stackJotai";
import { useAtom } from "jotai";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from "react-native";

import WebView, { WebViewNavigation } from "react-native-webview";

import type WebViewType from "react-native-webview";

export default function TabLayout() {
  const [refreshing, setRefreshing] = useState(false);
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
          source={{
            uri:
              history.at(-1) ||
              "https://tkor038.com/%EC%9B%B9%ED%88%B0/%EC%9B%94",
          }}
          onNavigationStateChange={onNavChange}
          onLoadEnd={() => setRefreshing(false)}
          style={{ flex: 1 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
