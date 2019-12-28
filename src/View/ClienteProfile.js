import React, {Component} from 'react';

import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';

import {
  Container,
  Content,
  Fab,
  Button,
  CardItem,
  Card,
  List,
  ListItem,
} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {Consumer} from '../Model/VarGlobales';

import Footer from './components/Footer';
import Header from './components/Header';
import {theme} from './constants';

export default class ClienteProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      active: false,
      idc: null,
    };
  }

  componentDidMount() {
    const {state} = this.props.navigation;
    var idCliente = state.params.cliente.id;
    // this.setState({cliente: this.state.item});
    console.log('El id es es ' + idCliente);
    // console.log(cliente);
    return fetch('https://karenwhocodes.000webhostapp.com/api/clienteExpedientes/' + idCliente)
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
          //   console.log('El datas'),
          //   console.log(this.state.dataSource),
        );
        console.log('DATA');
        console.log(this.state.dataSource);
      })
      .catch(error => {
        console.error(error);
        console.log('ERROR');
      });
  }

  render() {
    // const cliente = this.props.cliente;
    const {state} = this.props.navigation;
    var idCliente = state.params.cliente.nombres;
    const cliente = state.params.cliente;
    console.log('Hey el cliente es ' + idCliente);
    this.setState.cliente = state.params.cliente;

    // const { navigation } = this.props;
    // const idc = JSON.stringify(navigation.getParam('idc', 'NO-ID'))

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
            {/* Perfil del Cliente */}
            <Content>
              <Card>
                <CardItem>
                  <View style={styles.container}>
                    <View style={styles.left}>
                      <Text>Cliente:</Text>
                      <Text style={styles.nombreText}>
                        {cliente.nombres} {cliente.apellidos}
                      </Text>
                      <Text>CI: {cliente.ci}</Text>
                      <Text>Celular: {cliente.numero}</Text>
                      <Text>Direccion: {cliente.direccion}</Text>
                    </View>
                    <View style={styles.right}>
                      <Text style={{fontSize: 8}}>
                        Fecha de Ingreso: {cliente.created_at}
                      </Text>
                    </View>
                  </View>
                </CardItem>
              </Card>

              {/* Expedientes */}
              <Card>
                <CardItem>
                  <View style={styles.containerExpediente}>
                    <Text style={styles.subtitulo}>> Expedientes:</Text>
                    <FlatList
                      data={this.state.dataSource}
                      renderItem={({item}) => (
                        <ListItem>
                          <TouchableOpacity
                            style={styles.filaList}
                            onPress={() => {
                              this.props.navigation.navigate(
                                'DocsExpediente',
                                // {cliente: item.id },
                                {cliente: cliente, expediente: item},
                              );
                            }}>
                            <Text style={styles.text}>{item.descripcion}</Text>
                            <Icon name="right" style={styles.icon} />
                          </TouchableOpacity>
                        </ListItem>
                      )}
                    />
                  </View>
                </CardItem>
              </Card>

              {/* Boton redondo */}
              {/* <View style={{flex: 1}}>
              <Fab
                //   active={this.state.active}
                active={true}
                direction="up"
                containerStyle={{}}
                style={{backgroundColor: theme.colors.primary}}
                position="bottomRight"
                //   onPress={() => this.setState({active: !this.state.active})}
              >
                <Icon name="plus" />
              </Fab>
            </View> */}
            </Content>
            <Footer e={this.props.navigation}/>
          </Container>
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
  containerExpediente: {
    flexDirection: 'column',
    flex: 1,
    // backgroundColor: 'red',
  },
  filaList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
  },
  icon: {
    alignSelf: 'flex-end',
    color: theme.colors.primary,
  },
});
