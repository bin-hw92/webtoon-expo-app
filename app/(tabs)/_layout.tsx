import { stackAtom } from "@/hooks/stackJotai";
import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { BackHandler, Platform, Text, View } from "react-native";

import WebView, { WebViewNavigation } from "react-native-webview";

import type WebViewType from "react-native-webview";

export default function TabLayout() {
  const webviewRef = useRef<WebViewType>(null);

  const [canGoBack, setCanGoBack] = useState(false);
  const [stack, setStack] = useAtom(stackAtom);

  const handleNavi = (navState: WebViewNavigation) => {
    if (navState.canGoBack) {
      setCanGoBack(navState.canGoBack);
      stack.pop();
      setStack(stack);
    } else if (navState.canGoForward) {
      setStack([...stack, navState.url]);
    }
  };
  const handleLoadEnd = () => {
    // WebView 내부에 JS 코드 삽입하여 header 삭제
    webviewRef.current?.injectJavaScript(`
      const header = document.querySelector('header');
      if (header) header.remove();
      true; // <- 꼭 필요 (injected JS는 true로 끝나야 정상작동)
    `);
  };

  useEffect(() => {
    const onBackPress = () => {
      if (canGoBack && webviewRef.current) {
        webviewRef.current.goBack();
        return true; // 뒤로가기 기본 동작 막기
      }
      return false; // 앱 종료
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => {
      subscription.remove(); // 최신 방식으로 이벤트 제거
    };
  }, [canGoBack]);

  return (
    <View style={{ flex: 1 }}>
      <Text>{stack.length ? stack[stack.length - 1] : "TEST"}</Text>
      <WebView
        ref={webviewRef}
        source={{
          uri: stack.length
            ? stack[stack.length - 1]
            : "https://tkor036.com/%EC%9B%B9%ED%88%B0/%EC%9B%94",
        }}
        onLoadEnd={handleLoadEnd}
        onNavigationStateChange={(navState) => {
          handleNavi(navState);
        }}
        pullToRefreshEnabled={true}
      />
    </View>
  );
}
