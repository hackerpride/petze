import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import {connect} from 'react-redux';
// <<<<<<< Updated upstream
// import NavBar from './modules/navBar';
// =======
import NavBar from './modules/navBar/NavBar.react';
// >>>>>>> Stashed changes

import HomePage from './pages/home/Page.react';
import MenuPage from './pages/menu/Page.react';
import CallIsCallPage from './pages/calliscall/Page.react';
import DetectorPage from './pages/detector/Page.react';

const RouterWithRedux = connect()(Router);

export default function getRoutes() {
  return (
    <RouterWithRedux>
      <Scene key="root" hideNavBar>
        <Scene key="nav" navBar={NavBar} >
          <Scene key="home" component={HomePage} initial />
          <Scene key="menu" component={MenuPage} />
          <Scene key="calliscall" component={CallIsCallPage} />
          <Scene key="detector" component={DetectorPage} />
        </Scene>
      </Scene>
    </RouterWithRedux>
  );
}
