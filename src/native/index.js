import React, { Component } from 'react';
import App from './modules/app/App.react';
import {
  AppRegistry,
  DeviceEventEmitter,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Beacons from 'react-native-ibeacon';
import {Provider} from 'react-redux';
import getRoutes from './routes';

if (Platform.OS === 'ios') {
  const region = {
      identifier: 'yopo',
      uuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e'
  };

  Beacons.requestWhenInUseAuthorization();

  Beacons.startMonitoringForRegion(region);
  Beacons.startRangingBeaconsInRegion(region);

  Beacons.startUpdatingLocation();
}

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
      if (Platform.OS === 'ios') {
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
        <Provider>
          <App routes={getRoutes()} />
        </Provider>
      );
    }
  }

  AppRegistry.registerComponent('hackerpride', () => Root);
}
