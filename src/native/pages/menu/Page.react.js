import React, {Component, PropTypes} from 'react';
import {View, TouchableHighlight, ScrollView, Image, Text} from 'react-native';

export default class Page extends Component {

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  onPressLeftButton = () => {
    const {routes} = this.context;
    routes.calliscall();
  }

  onPressRightButton = () => {
    const {routes} = this.context;
    routes.detector();
  }

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
      fancyHeadline: {
        fontSize: 30,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#000000',
        textAlign: 'center',
        marginTop: 40
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
            Was möchtest du tun?
          </Text>
          <View
            style={{
              flexDirection:'row',
              justifyContent:'center',
              alignItems:'center'
            }}
          >
            <TouchableHighlight
              style={{
                marginTop: 40,
                backgroundColor: '#000',
                height: 80,
                width: 120,
              }}
              underlayColor="#808080"
              onPress={this.onPressLeftButton}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: '#FFF',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
              >
                Musiker verpetzen
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{
                marginTop: 40,
                marginLeft: 20,
                backgroundColor: '#000',
                height: 80,
                width: 120,
              }}
              underlayColor="#808080"
              onPress={this.onPressRightButton}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: '#FFF',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
              >
                Straßenmusiker Detektor
              </Text>
            </TouchableHighlight>
          </View>
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
