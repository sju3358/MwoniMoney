import React, {useRef, useState} from 'react';
import WebView from 'react-native-webview';
import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';

const App = () => {
  const webViewRef = useRef<any>(null);
  const [fcmTokenState, setFcmTokenState] = useState('');

  useEffect(() => {
    requestUserPermission();
    requestPermission();
  });

  const requestPermission = () => {
    try {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      ]).then();
    } catch (err) {
      console.warn(err);
    }
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      return getToken();
    }
  };

  const getToken = async () => {
    const fcmToken = await messaging().getToken();

    try {
      console.log(fcmToken);
      setFcmTokenState(fcmToken);
      webViewRef.current.postMessage(fcmToken);
    } catch (e) {
      console.log(e, 'Error');
    }
  };

  const userUUIDHandler = async (receivedMessage: any) => {
    const requestBody = {
      userUUID: receivedMessage.code,
      firebaseToken: fcmTokenState,
    };
    try {
      const response = await fetch('https://j9b310.p.ssafy.io/api/fcm', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log(requestBody.firebaseToken);
        console.log('API request successful');
      } else {
        console.error('API request failed with status', response.status);
      }
    } catch (error) {
      console.log('fetch error', error);
    }
  };

  return (
    <>
      <WebView
        ref={webViewRef}
        source={{
          uri: 'https://j9b310.p.ssafy.io/',
        }}
        onLoad={() => {}}
        userAgent="kwdApp"
        sharedCookiesEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        javaScriptEnabledAndroid={true}
        injectedJavaScript={`
      (function() {
        function wrap(fn) {
          return function wrapper() {
            var res = fn.apply(this, arguments);
            window.ReactNativeWebView.postMessage
            (
              JSON.stringify({
                type: 'navigationStateChange',
                code: 'navigationStateChange',
              })
              );
              return res;
            }
          }
          history.pushState = wrap(history.pushState);
          history.replaceState = wrap(history.replaceState);
          window.addEventListener('popstate', function() {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({
                type: 'navigationStateChange'
              })
              );
            });
          })();
          
          true;
          `}
        onMessage={({nativeEvent: state}) => {
          try {
            const receivedMessage = JSON.parse(state.data);
            if (receivedMessage.type === 'userUUID') {
              console.log(receivedMessage.code);
              userUUIDHandler(receivedMessage);
            }
          } catch (error) {
            console.log(error);
          }
        }}
      />
    </>
  );
};

export default App;
