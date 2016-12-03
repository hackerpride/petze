import React, { Component } from 'react';
import {
  AppRegistry,
  DeviceEventEmitter,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Beacons from 'react-native-ibeacon';

const region = {
    identifier: 'yopo',
    uuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e'
};

Beacons.requestWhenInUseAuthorization();

Beacons.startMonitoringForRegion(region);
Beacons.startRangingBeaconsInRegion(region);

Beacons.startUpdatingLocation();

export default function index() {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 120,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });

  class Root extends Component {
    constructor(props) {
      super(props);
      this.state = {
        input: null
      };
    }

    componentDidMount() {
      DeviceEventEmitter.addListener(
        'beaconsDidRange',
        (data) => {

          // if (data && data.beacons.length > 0) {
          //   if (data.beacons[1].proximity === 'far') {
          //     if (this.state.input !== ':P') {
          //       this.setState({
          //         input: ':P'
          //       });
          //     }
          //   } else {
          //     if (this.state.input !== ':D') {
          //       this.setState({
          //         input: ':D'
          //       });
          //     }
          //   }
          // }

          // data.region - The current region
          // data.region.identifier
          // data.region.uuid

          // data.beacons - Array of all beacons inside a region
          //  in the following structure:
          //    .uuid
          //    .major - The major version of a beacon
          //    .minor - The minor version of a beacon
          //    .rssi - Signal strength: RSSI value (between -100 and 0)
          //    .proximity - Proximity value, can either be "unknown", "far", "near" or "immediate"
          //    .accuracy - The accuracy of a beacon
        }
      );
    }

    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            {this.state.input}
          </Text>
          <Text style={styles.instructions}>
            To get started, edit index.ios.js
          </Text>
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+D or shake for dev menu
          </Text>
        </View>
      );
    }
  }

  AppRegistry.registerComponent('hackerpride', () => Root);
}
