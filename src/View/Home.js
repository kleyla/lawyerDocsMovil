import React, {Component} from 'react';

import {
  Container,
  Content,
  Card,
  CardItem,
  Left,
  Right,
  Thumbnail,
  Body,
  List,
  ListItem,
} from 'native-base';

import {
  View,
  FlatList,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import firebase from './components/Firebase';

import Footer from './components/Footer';
import Header from './components/Header';
import Cliente from './components/Cliente';
import {Consumer} from '../Model/VarGlobales';

import {data} from './constants/index';
const DEVICE_WIDTH = Dimensions.get('window').width;
import {theme} from './constants';
const datos = data.clientes;
var user;

export default class Home extends Component {
  constructor(props) {
    super(props);
    // const ds = new ListView.DataSource({
    //   rowHasChanged: (r1, r2) => r1 !== r2,
    // });
    this.state = {
      isLoading: true,
      // data: [],
      //   product: data.products[0],
      // dataSource: data.comentarios,
      //   dataSource: ds.cloneWithRows(data.clientes),
      // dataSource: [],
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log('USER ACTUAL ES' + user.uid);
      } else {
        // No user is signed in.
        console.log('USER NO LOGUED');
      }
    });
    user = firebase.auth().currentUser;
    return fetch(
      'https://karenwhocodes.000webhostapp.com/api/clientesUserApi/' + user.uid,
      {
        method: 'get',
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log('ejemplo');
        console.log(responseJson);
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          // function() {},
          console.log('El datas'),
          console.log(this.state.dataSource),
        );
        console.log('El data');
        console.log(this.state.dataSource);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <Consumer>
        {value => (
          <Container>
            <Header />
            <Content>
              <FlatList
                data={this.state.dataSource}
                renderItem={({item}) => (
                  // <Cliente item = {item}/>
                  <Card>
                    <View style={styles.comentario}>
                      <CardItem>
                        <Body>
                          <View style={styles.fila}>
                            <View style={styles.left}>
                              <Text style={{fontWeight: 'bold', fontSize: 15}}>
                                {item.nombres} {item.apellidos}, {item.id}
                              </Text>
                              <Text style={{fontSize: 12}}>CI: {item.ci}</Text>
                              <Text style={{fontSize: 12}}>
                                Celular: {item.numero}
                              </Text>
                            </View>
                            <TouchableOpacity
                              style={styles.right}
                              // id = {item.id}
                              onPress={() => {
                                this.props.navigation.navigate(
                                  'ClienteProfile',
                                  // {cliente: item.id },
                                  {cliente: item},
                                );
                              }}>
                              <Icon name="right" style={styles.icon} />
                              <Text style={styles.fecha}>
                                {item.created_at}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </Body>
                      </CardItem>
                    </View>
                  </Card>
                )}
                // keyExtractor={({id}, index) => id}
              />
            </Content>
            <Footer e={this.props.navigation} />
          </Container>
        )}
      </Consumer>
    );
  }
}

const styles = StyleSheet.create({
  comentario: {
    // backgroundColor: 'red',
  },
  fila: {
    width: DEVICE_WIDTH * 0.9,
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  left: {
    flexDirection: 'column',
    flex: 1,
  },
  right: {
    flexDirection: 'column',
    // backgroundColor: 'green',
    alignSelf: 'flex-end',
    // height:
  },
  icon: {
    alignSelf: 'flex-end',
    fontSize: 30,
    // backgroundColor: 'red',
    paddingBottom: 15,
    color: theme.colors.primary,
  },
  fecha: {
    fontSize: 8,
    alignSelf: 'flex-end',
    // backgroundColor: 'red',
  },
});
