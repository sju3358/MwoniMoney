import React from 'react';
import {SafeAreaView, StatusBar, View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>
        <WebView
          source={{uri: 'https://j9b310.p.ssafy.io/'}} // 웹 페이지 주소를 지정합니다.
          style={styles.webview}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // 원하는 배경 색상으로 변경할 수 있습니다.
  },
  safeAreaView: {
    flex: 1,
  },
  webview: {
    flex: 1, // WebView가 SafeAreaView 내에서 전체 화면을 차지하도록 설정합니다.
  },
});

export default App;
