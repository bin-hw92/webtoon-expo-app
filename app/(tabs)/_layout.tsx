import React, { useRef } from "react";
import { View } from "react-native";

import WebView from "react-native-webview";

import type WebViewType from "react-native-webview";

export default function TabLayout() {
  const webviewRef = useRef<WebViewType>(null);

  const handleLoadEnd = () => {
    // WebView 내부에 JS 코드 삽입하여 header 삭제
    webviewRef.current?.injectJavaScript(`
      const header = document.querySelector('header');
      if (header) header.remove();
      true; // <- 꼭 필요 (injected JS는 true로 끝나야 정상작동)
    `);
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webviewRef}
        source={{ uri: "https://tkor036.com/%EC%9B%B9%ED%88%B0/%EC%9B%94" }}
        onLoadEnd={handleLoadEnd}
      />
    </View>
  );
}
