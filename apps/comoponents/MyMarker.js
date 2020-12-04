import React, {Component} from 'react';
import {View} from 'react-native';
import {Marker} from 'react-native-maps';

export default class MyMarker extends Component {
  render() {
    return (
      <View>
        <Marker
          coordinate={this.props.location}
          title={this.props.title}
          image={require('../images/mypin64.png')}
        />
      </View>
    );
  }
}
