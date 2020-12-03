import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import Geolocation from 'react-native-geolocation-service';

const App = () => {
  const [location, setLocation] = useState(null);

  async function requestPermission() {
    try {
      if (Platform.OS === 'ios') {
        return await Geolocation.requestAuthorization('always');
      }
      // 안드로이드 위치 정보 수집 권한 요청
      if (Platform.OS === 'android') {
        return await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    requestPermission()
      .then((result) => {
        console.log('permission result:', result);
        if (result === 'granted') {
          Geolocation.getCurrentPosition(
            (pos) => {
              setLocation(pos.coords);
            },
            (err) => console.log('position error: ', err),
            {enableHighAccuracy: true, timeout: 3600, maximumAge: 3600},
          );
        }
      })
      .catch((err) => console.log('App.useEffect() error: ', err));
  }, []);

  return location === null ? (
    <></>
  ) : (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          // 줌 설정
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}
        showsUserLocation={true}>
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="경복궁"
          description="조선 궁궐"
          image={require('./images/placeholder.png')}
        />
      </MapView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  body: {},
});
