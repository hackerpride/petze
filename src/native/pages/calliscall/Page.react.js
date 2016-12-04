import React, {Component, PropTypes} from 'react';
import {View, TouchableHighlight, ScrollView, Image, Text} from 'react-native';

export default class Page extends Component {

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  render() {
    const {routes} = this.context;

    const style = {
      biggy: {
        paddingTop: 60,
      },
      headline: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 40
      },
      subheadline: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#000000'
      },
      footer: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#979797',
        height: 100,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
      }
    }

    return (
      <View
        style={{
          backgroundColor: '#FFE804',
          flex: 1
        }}
      >
        <ScrollView style={style.biggy} centerContent>
          <Text style={style.headline}>
            Stiller Alarm
          </Text>
          <Text
            style={{
              textAlign: 'center'
            }}
          >
            Push a button if a bad musician is around you.
          </Text>
          <TouchableHighlight style={{
            marginTop: 40,
            marginLeft: 120,
            backgroundColor: '#E92E2E',
            height: 120,
            width: 120,
            borderRadius: 60,
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center'
          }}>
            <Text
              style={{
                fontSize: 20,
                color: '#FFF',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              DRÜCK MICH
            </Text>
          </TouchableHighlight>
        </ScrollView>
        <View
          style={style.footer}
        >
          <Text
            style={{
              textAlign: 'center',
            }}
          >
            text
          </Text>
        </View>
      </View>
    );
  }
}
