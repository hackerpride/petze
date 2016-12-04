import React, {PropTypes, Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {
  Text,
  Image,
  Linking,
  Animated,
  TouchableOpacity
} from 'react-native';

import styles from './NavBar.styles';

export default class NavBar extends Component {

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.handleMenu = this.handleMenu.bind(this);
  }

  handleMenu = () => {
    const {routes} = this.context;
    routes.menu();
  };

  renderMenuButton() {
    // TODO: make reward points dynamic
    return (
      <TouchableOpacity style={[styles.menuButton]} onPress={this.handleMenu}>
        <Image
          source={require('./menu.png')}
          style={styles.menuButtonImage}
        />
        <Text>
          Herzchenkonto: 0
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.navbar,
        ]}
      >
        {/* {this.renderMenuButton.bind(this)} */}
        {this.renderMenuButton()}
      </Animated.View>
    );
  }
}
