import React, {Component} from 'react';

import {Container, Content, Footer, FooterTab, Button, View} from 'native-base';
import {Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import Home from './../Home';

import {Consumer} from './../../Model/VarGlobales';
import {theme} from '../constants';
const DEVICE_WIDTH = Dimensions.get('window').width;

export default class MyFooter extends Component {
  render() {
    return (
      <Consumer>
        {value => (
          <Footer>
            <FooterTab style={{backgroundColor: 'white'}}>
              <View style={styles.footerRow}>
                <TouchableOpacity
                  style={styles.cuadro}
                  onPress={() => {
                    this.props.e.navigate('Home', {});
                  }}>
                  <Icon name="home" style={styles.icon} />
                  <Text>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cuadro}
                  onPress={() => {
                    this.props.e.navigate('Home', {});
                  }}>
                  <Icon name="switcher" style={styles.icon} />
                  <Text>Clientes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cuadro}>
                  <Icon name="user" style={styles.icon} />
                  <Text>Mi perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cuadro}
                  onPress={() => {
                    this.props.e.navigate('Tutorial', {});
                  }}>
                  <Icon name="hearto" style={styles.icon} />
                  <Text>Tutorial</Text>
                </TouchableOpacity>
              </View>
            </FooterTab>
          </Footer>
        )}
      </Consumer>
    );
  }
}

const styles = StyleSheet.create({
  footerRow: {
    // flex: 1,
    // position: 'absolute',
    // bottom: 0,
    // right: 0,
    // left: 0,
    // width: DEVICE_WIDTH,
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  cuadro: {
    width: DEVICE_WIDTH / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
    color: theme.colors.primary,
  },
});
