import { historyAtom } from "@/hooks/stackJotai";
import { useAtom } from "jotai";
import React, { useRef } from "react";
import { View } from "react-native";

import WebView, { WebViewNavigation } from "react-native-webview";

import type WebViewType from "react-native-webview";

export default function TabLayout() {
  const webviewRef = useRef<WebViewType>(null);

  const [history, setHistory] = useAtom(historyAtom);

  const onNavChange = (navState: WebViewNavigation) => {
    const url = navState.url;
    if (url !== history[history.length - 1]) {
      setHistory([...history, url]);
    }
  };

  // useEffect(() => {
  //   const onBackPress = () => {
  //     if (canGoBack && webviewRef.current) {
  //       webviewRef.current.goBack();
  //       return true; // 뒤로가기 기본 동작 막기
  //     }
  //     return false; // 앱 종료
  //   };

  //   const subscription = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     onBackPress
  //   );

  //   return () => {
  //     subscription.remove(); // 최신 방식으로 이벤트 제거
  //   };
  // }, [canGoBack]);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webviewRef}
        source={{
          uri:
            history.at(-1) ||
            "https://tkor037.com/%EC%9B%B9%ED%88%B0/%EC%9B%94",
        }}
        onNavigationStateChange={onNavChange}
        pullToRefreshEnabled={true}
      />
    </View>
  );
}
