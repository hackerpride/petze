import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
  PermissionsAndroid,
} from 'react-native';

import KontaktBeacons from 'react-native-kontaktio';

export default function index() {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
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
    componentDidMount() {
      KontaktBeacons.initKontaktSDKWithApiKey('MY_KONTAKTIO_API_KEY');
      DeviceEventEmitter.addListener(
        'beaconsDidRange',
        (data) => {
          console.log("HERE1");
          console.log(data);
          // this.setState({
          //   beacons: data.beacons.filter(beacon => beacon.rssi < 0),
          // });
          // data.beacons.map(beacon => console.log('minor', beacon.minor));
        }
      );
      DeviceEventEmitter.addListener(
        'scanInitStatus',
        (data) => {
          console.log("HERE2");
          // this.setState({ scanInitStatus: data.status });
        }
      );
      DeviceEventEmitter.addListener(
        'scanStatus',
        (data) => {
          console.log("HERE3");
          // this.setState({ scanStatus: data.scanStatus });
        }
      );

      const region = {
        identifier: 'MY_BEACON_REGION',
        uuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e',
        major: 44703,
        minor: KontaktBeacons.ANY_MINOR,
      };
      const scanContext = {
        iBeaconDevicesUpdateCallbackInterval: 100,
        eddystoneDevicesUpdateCallbackInterval: 1000,
        iBeaconDistanceSort: KontaktBeacons.SORT_DESC,
        eddystoneDistanceSort: KontaktBeacons.SORT_ASC,
      };
      KontaktBeacons.startRangingBeaconsInRegion(region, scanContext);
    }

    async requestPermissions() {
      try {
        const granted = await PermissionsAndroid.requestPermission(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          {
            'title': 'Cool Photo App Camera Permission',
            'message': 'Cool Photo App needs access to your camera ' +
                       'so you can take awesome pictures.'
          }
        )
        if (granted) {
          console.log("ACCESS_COARSE_LOCATION permission granted")
        } else {
          console.log("ACCESS_COARSE_LOCATION permission denied")
        }
      } catch (err) {
        console.log("ERROR");
        console.warn(err)
      }
      try {
        const granted = await PermissionsAndroid.requestPermission(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Cool Photo App Camera Permission',
            'message': 'Cool Photo App needs access to your camera ' +
                       'so you can take awesome pictures.'
          }
        )
        if (granted) {
          console.log("ACCESS_FINE_LOCATION permission granted")
        } else {
          console.log("ACCESS_FINE_LOCATION permission denied")
        }
      } catch (err) {
        console.log("ERROR");
        console.warn(err)
      }
    }

    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
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
