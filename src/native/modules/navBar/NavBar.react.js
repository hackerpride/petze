import React, {PropTypes} from 'react';
import {Actions} from 'react-native-router-flux';
import {
  Text,
  Image,
  Linking,
  Animated,
  TouchableOpacity
} from 'react-native';

import styles from './NavBar.styles';

export default class NavBar extends React.Component {

  static propTypes = {
    position: PropTypes.object,
    navigationState: PropTypes.object,
  }

  constructor() {
    super();
    this.handleMenu = this.handleMenu.bind(this);
  }

  handleMenu = () => {
    const {routes} = this.context;
  };

  renderMenuButton() {
    const state = this.props.navigationState;
    const childState = state.children[state.index];
    const onPress = Actions.pop;

    if (state.index === 0) {
      return null;
    }

    return (
      <TouchableOpacity style={[styles.menuButton, state.leftButtonStyle]} onPress={onPress}>
        <Image
          source={require('./')}
          style={styles.menuButtonImage}
        />
      </TouchableOpacity>
    );
  }

  render() {
    let state = this.props.navigationState;
    let selected = state.children[state.index];
    while ({}.hasOwnProperty.call(selected, 'children')) {
      state = selected;
      selected = selected.children[selected.index];
    }

    return (
      <Animated.View
        style={[
          styles.navbar,
          state.navigationBarStyle,
          selected.navigationBarStyle
        ]}
      >
        {state.children.map(this.renderTitle, this)}
        {this.renderMenuButton()}
      </Animated.View>

    );
  }
}
