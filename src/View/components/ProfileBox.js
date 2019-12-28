import React, {Component} from 'react';

import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';

import {Consumer} from './../../Model/VarGlobales';
import {theme} from '../constants';
import {Card, CardItem, Body} from 'native-base';
const DEVICE_WIDTH = Dimensions.get('window').width;

export default class ProfileBox extends Component {
  render() {
    return (
      <Consumer>
        {value => (
            <Card>
              <CardItem>
                <View style={styles.container}>
                  <View style={styles.left}>
                    <Text>Cliente:</Text>
                    <Text style={styles.nombreText}>NativeBase</Text>
                    <Text>CI:</Text>
                    <Text>Celular:</Text>
                    <Text>Direccion: </Text>
                  </View>
                  <View style={styles.right}>
                    <Text style={{fontSize: 8}}>Fecha de Ingreso:</Text>
                  </View>
                </View>
              </CardItem>
            </Card>
          //   <View style={styles.container}>
          //     <View>
          //         <Text>Nombre:</Text>

          //     </View>
          //   </View>
        )}
      </Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  left: {
    flex: 1,
    flexDirection: 'column',
  },
  right: {
    flexDirection: 'column',
  },
  nombreText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
