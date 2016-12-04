import React, { Component } from 'react';
import App from './modules/app/App.react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  DeviceEventEmitter,
  Platform,
} from 'react-native';
import {Provider} from 'react-redux';
import getRoutes from './routes';
import { createBeaconProximity, report } from '../graphql';
import createCredentialsStore from './helpers/createCredentialsStore';
import configureStore from '../common/configureStore';

import Beacons from 'react-native-ibeacon';
import KontaktBeacons from 'react-native-kontaktio';

export default function index() {

  const initialState = {
    device: {
      isNative: true,
      isMobile: true
    }
  };

  const credentialsStore = createCredentialsStore();
  const store = configureStore({initialState, credentialsStore});

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

        // const region = {
        //     identifier: 'yopo',
        //     uuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e'
        // };
        //
        // Beacons.requestWhenInUseAuthorization();
        //
        // Beacons.startMonitoringForRegion(region);
        // Beacons.startRangingBeaconsInRegion(region);
        //
        // Beacons.startUpdatingLocation();
      }
      this.requestPermissions();

      KontaktBeacons.initKontaktSDKWithApiKey('MY_KONTAKTIO_API_KEY');
      DeviceEventEmitter.addListener(
        'beaconsDidRange',
        (data) => {
          let beacons = data.beacons;
          beacons = beacons.sort((a,b) => {
                if(a.uniqueID < b.uniqueID) return -1;
                if(a.uniqueID > b.uniqueID) return 1;
                return 0;
          });
          beacons = beacons.map((beacon) => {
            return {
              alias: beacon.uniqueID,
              address: beacon.address,
              rssi: beacon.rssi,
            };
          });

          continousTracking = false;
          if (continousTracking) {
            beacons.forEach((beacon) => {
              createBeaconProximity(beacon);
            })
            // console.log(beacons);
          }
          this.trackReportLocation(beacons);
        }
      );
      DeviceEventEmitter.addListener(
        'scanInitStatus',
        (data) => {
          console.log("HERE2");
          console.log(data);
          // this.setState({ scanInitStatus: data.status });
        }
      );
      DeviceEventEmitter.addListener(
        'scanStatus',
        (data) => {
          console.log("HERE3");
          console.log(data);
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
        iBeaconDevicesUpdateCallbackInterval: 5000,
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
            'title': 'Position information',
            'message': 'We need permissions so we can accurately locate musicians.'
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
            'title': 'Position information',
            'message': 'We need permissions so we can accurately locate musicians.'
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
    };

    trackReportLocation(proximities = []) {
      const userid = "ciwaffi5t6y1101071vnr5ew7";
      report(userid, proximities);
    }

    render() {
      return (
        <Provider store={store}>
          <App routes={getRoutes()} />
        </Provider>
      );
    }
  }

  AppRegistry.registerComponent('hackerpride', () => Root);
}
