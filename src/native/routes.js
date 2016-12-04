import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import {connect} from 'react-redux';

import HomePage from './pages/home/Page.react';
import CallIsCallPage from './pages/calliscall/Page.react';

const RouterWithRedux = connect()(Router);

export default function getRoutes() {
  return (
    <RouterWithRedux>
      <Scene key="root" hideNavBar>
        <Scene key="home" component={HomePage} initial />
        <Scene key="calliscall" component={CallIsCallPage} />
      </Scene>
    </RouterWithRedux>
  );
}
