import {
  View,
  Text,
  SafeAreaView,
  Linking,
  PermissionsAndroid,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import ytdl from 'react-native-ytdl';
import RNFetchBlob from 'rn-fetch-blob';

const TubeMate = () => {
  const [link, setLink] = useState();
  const [generatedUrl, setGeneratedUrl] = useState();
  const [msgPopUp, setMsgPopUp] = useState(false);
  const [dirPopUp, setDirPopUp] = useState(false);

  const createUrl = async () => {
    const url = await ytdl(link, {quality: 'highestaudio'});

    url.map(item => {
      setGeneratedUrl(item.url);
    });
  };
  console.log(generatedUrl);

  createUrl();

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'YT Downloader app storage permission:',
          message:
            'Youtube Video Downloader app needs access to your Storage ' +
            'so you can Download Videos.',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the storage');
        Downloader();
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const Downloader = () => {
    const {config, fs} = RNFetchBlob;
    const date = new Date();
    const fileDir = fs.dirs.DownloadDir;

    config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          fileDir +
          '/YtDownloads/download_' +
          Math.floor(date.getDate() + date.getSeconds() / 2) +
          '.mp4',
        description: 'Video Start Downloading...',
        mediaScannableble: true,
      },
    })
      .fetch('GET', generatedUrl, {
        //some headers ..
      })
      .then(res => {
        // the temp file path
        Alert.alert('', 'The Video Downloaded to ', res.path());
      });
  };

  useEffect(() => {
    if (generatedUrl !== null) {
      setTimeout(() => {
        setMsgPopUp(false);
      }, 2000);

      setTimeout(() => {
        setDirPopUp(false);
      }, 4000);
    }
  });

  const PopUpMSG = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 90,
          borderRadius: 5,
          alignSelf: 'center',
          backgroundColor: 'teal',
        }}>
        <Text
          style={{
            fontSize: 15,
            paddingHorizontal: 15,
            paddingVertical: 5,
            color: 'white',
          }}>
          Downloading Start.
        </Text>
      </View>
    );
  };

  const DirMsg = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 90,
          borderRadius: 5,
          alignSelf: 'center',
          backgroundColor: 'teal',
        }}>
        <Text
          style={{
            fontSize: 15,
            paddingHorizontal: 15,
            paddingVertical: 5,
            color: 'white',
          }}>
          Your Video will save on Downloads/YtDownloads.
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source={{uri: 'https://youtube.com/'}}
        onNavigationStateChange={webViewState => {
          setLink(webViewState.url);
        }}
      />
      {generatedUrl !== undefined ? (
        <TouchableOpacity
          onPress={() => {
            if (generatedUrl !== '') {
              requestStoragePermission();
              setMsgPopUp(true);
              setDirPopUp(true);
            } else {
              Alert.alert('', 'Sorry No Video Link Found!');
            }
          }}
          style={{
            position: 'absolute',
            bottom: 60,
            right: 10,
            height: 90,
            width: 90,
            borderRadius: 200,
          }}>
          <Image
            source={require('../assets/download.png')}
            style={{height: '100%', width: '100%'}}
          />
        </TouchableOpacity>
      ) : null}
      {msgPopUp ? <PopUpMSG /> : null}
      {dirPopUp ? <DirMsg /> : null}
    </SafeAreaView>
  );
};

export default TubeMate;
