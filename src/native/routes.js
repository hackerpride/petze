import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import {connect} from 'react-redux';

import HomePage from 'pages/home/Page.react';

const RouterWithRedux = connect()(Router);

export default function getRoutes() {
  return (
    <RouterWithRedux>
      <Scene key="root">
        <Scene key="home" component={HomePage} title="Home" initial />
      </Scene>
    </RouterWithRedux>
  );
}
