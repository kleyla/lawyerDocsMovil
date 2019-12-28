import React, {Component} from 'react';
import {Header, Button, Right, Body, View, Badge} from 'native-base';
//import {Alert} from 'react-native';
import {
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {Consumer} from './../../Model/VarGlobales';
import {theme} from '../constants';
const DEVICE_WIDTH = Dimensions.get('window').width;

export default class HeaderSearch extends Component {
  render() {
    return (
      <Consumer>
        {value => (
          <Header style={{backgroundColor: 'white'}}>
            <Body>
              <View style={styles.search}>
                <TextInput style={styles.inputSearch} placeholder={'Buscar'} />
                <TouchableOpacity style={styles.btnSearch}>
                  <Icon name={'search1'} style={styles.iconSearch} />
                </TouchableOpacity>
              </View>
            </Body>
            <Right>
              <TouchableOpacity
                style={styles.noti}
                // onPress={() =>
                //   this.props.navigation.navigate('Notificaciones')
                // }
                >
                {/* <Button active badge vertical style={styles.noti}> */}
                <View style={styles.badgeRight}>
                  <Badge style={styles.badge}>
                    <Text style={{fontSize: 10}}>5</Text>
                  </Badge>
                </View>
                <Icon name="bells" style={styles.iconNoti} />
                {/* </Button> */}
              </TouchableOpacity>
            </Right>
          </Header>
        )}
      </Consumer>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    borderRadius: 25,
    width: DEVICE_WIDTH * 0.8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    // height: 70,
  },
  inputSearch: {
    width: DEVICE_WIDTH * 0.7,
    marginLeft: 10,
  },
  btnSearch: {
    // flex: 1,
    // backgroundColor: 'red',
    // alignItems: 'flex-end',
  },
  iconSearch: {
    //   backgroundColor: 'red',
    right: 5,
    fontSize: 20,
  },
  noti: {
    flexDirection: 'column',
    // backgroundColor: 'green',
    width: DEVICE_WIDTH * 0.14,
    // backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  badgeRight: {
    width: DEVICE_WIDTH * 0.1,
    // alignItems: 'flex-end',
    // right: 2,
    // backgroundColor: 'white',
  },
  badge: {
    // fontSize: 4,
    // marginTop:10,
    right: 2,
    width: 20,
    height: 20,
  },
  iconNoti: {
    fontSize: 20,
    color: theme.colors.primary,
  },
});
