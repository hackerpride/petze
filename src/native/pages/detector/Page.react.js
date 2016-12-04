import React, {Component, PropTypes} from 'react';
import {View, ScrollView, Image, Text} from 'react-native';

export default class Page extends Component {

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      riskLevel: false,
    };
  }

  render() {
    const {routes} = this.context;
    const {riskLevel} = this.state;

    const style = {
      biggy: {
        paddingTop: 60,
      },
      headline: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 10
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
        height: 80,
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
            Detektor
          </Text>
          <Text
            style={{
              textAlign: 'center'
            }}
          >
            Du bist hier: <Text style={{fontStyle: 'italic', fontWeight: 'bold'}} >Schlesisches Tor</Text>
          </Text>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 10,
              padding: 20
            }}
          >
            {!riskLevel ?
              'Kein Straßenmusiker in deiner Nähe genieße die Ruhe :-)' :
              'Aufpassen versuch die roten Wagons zu vermeiden.'
            }
          </Text>
        </ScrollView>
        <View
          style={style.footer}
        >
          <Image
            source={require('./bvg-logo-mit-rand-1200-1200.png')}
            style={{
              position: 'relative',
              top: -30,
              width: 70,
              height: 70
            }}
          />
        </View>
      </View>
    );
  }
}
