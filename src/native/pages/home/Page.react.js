import React, {Component, PropTypes} from 'react';
import {View, ScrollView, Image, Text} from 'react-native';

export default class Page extends Component {

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.switchPage();
  }

  switchPage() {
    const {routes} = this.context;
    setTimeout(() => {
      routes.calliscall();
    }, 3000);
  }

  render() {
    const {routes} = this.context;

    const style = {
      biggy: {
        paddingTop: 90,
        paddingLeft: 60,
        paddingRight: 60,
      },
      headline: {
        fontSize: 70,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 20
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
        <ScrollView style={style.biggy}>
          <Text style={style.headline}>
            PETZE
          </Text>
          <Text style={style.subheadline}>
            MEYK SE
          </Text>
          <Text style={style.subheadline}>
            BVG
          </Text>
          <Text style={style.subheadline}>
            GREIT ÄGENN
          </Text>
        </ScrollView>
        <View
          style={style.footer}
        >
          <Image
            source={require('./bvg-logo-mit-rand-1200-1200.png')}
            style={{width: 50, height: 50}}
          />
        </View>
      </View>
    );
  }
}
