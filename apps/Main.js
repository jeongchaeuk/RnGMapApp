import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  PermissionsAndroid,
  Button,
  Linking,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import GeoLocation from 'react-native-geolocation-service';
import GetLocation from 'react-native-get-location';
import MyMarker from './comoponents/MyMarker';

class Main extends Component {
  state = {
    initLocation: {
      // 경복궁
      latitude: 37.578046,
      longitude: 126.976889,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    },
    pinLocation: {
      // 부산IT
      latitude: 35.156021,
      longitude: 129.05948,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    },
  };

  componentDidMount() {
    console.log('init', this.state.initLocation);
    this.getCurrentLocation();
  }

  async getCurrentLocation() {
    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        console.log('current');
        console.log(location);

        let temp = {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        };
        this.setState({initLocation: temp});
      })
      .catch((err) => {
        const {code, message} = err;
        console.error(code, message);
      });
  }

  onMyLocationClick = () => this.getCurrentLocation();

  onMarkClick = () => {
    Linking.openURL('http://www.busanit.ac.kr/m');
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initLocation={this.state.initLocation}
          region={this.state.initLocation}>
          <Marker
            coordinate={this.state.pinLocation}
            title="부산IT"
            description="교육센터"
            onCalloutPress={this.onMarkClick}
          />
          {this.state.initLocation ? (
            <MyMarker location={this.state.initLocation} title={'현재위치'} />
          ) : (
            <View />
          )}
        </MapView>
        <Button title="현재위치" onPress={this.onMyLocationClick} />
      </View>
    );
  }
}

export default Main;

const styles = StyleSheet.create({
  container: {flex: 1, margin: 10},
  map: {flex: 1, marginBottom: 10},
});
