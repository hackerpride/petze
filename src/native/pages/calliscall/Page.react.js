import React, {Component, PropTypes} from 'react';
import {View, TouchableHighlight, ScrollView, Image, Text} from 'react-native';

export default class Page extends Component {

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      motivation: false,
      buttonText: 'DRÜCK MICH'
    };
  }

  onPressButton = () => {
    const {routes} = this.context;
    this.setState({
      motivation: true,
      buttonText: 'DANKE'
    });
    setTimeout(() => {
      routes.detector();
    }, 2000);
  }

  render() {
    const {routes} = this.context;
    const {motivation, buttonText} = this.state;

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
            Stiller Alarm
          </Text>
          <Text
            style={{
              textAlign: 'center'
            }}
          >
            Push a button if a bad musician is around you.
          </Text>
          <TouchableHighlight
            style={{
              marginTop: 40,
              marginLeft: 120,
              backgroundColor: '#E92E2E',
              height: 120,
              width: 120,
              borderRadius: 60,
              flexDirection:'row',
              justifyContent:'center',
              alignItems:'center'
            }}
            underlayColor="#808080"
            onPress={this.onPressButton}
          >
            <Text
              style={{
                fontSize: 20,
                color: '#FFF',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              {buttonText}
            </Text>
          </TouchableHighlight>
          {motivation ?
            <Text style={style.fancyHeadline}>
              Du bist spitze!{"\n"}
              Echt jetzt!
            </Text> :
            null
          }
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
