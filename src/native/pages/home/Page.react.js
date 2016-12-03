import React, {Component, PropTypes} from 'react';
import {View, Image, Text} from 'react-native';

export default class Page extends Component {

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  render() {
    const {routes} = this.context;

    return (
      <View>
        <Text>
          test
        </Text>
      </View>
    );
  }
}
