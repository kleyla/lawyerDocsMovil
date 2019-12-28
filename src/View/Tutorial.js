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

import Footer from './components/Footer';
import Header from './components/Header';
import {Consumer} from '../Model/VarGlobales';

const DEVICE_WIDTH = Dimensions.get('window').width;
//FOTOS
import log from './assets/tutorial/log.jpg';
import clientes from './assets/tutorial/clientes.jpg';
import exps from './assets/tutorial/exps.jpg';
import docs from './assets/tutorial/docs.jpg';
import scan from './assets/tutorial/scan.jpg';
import scann from './assets/tutorial/scann.jpg';

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState.isLoading = false;
    console.log('Estoy listo');
  }
  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <View style={{flex: 1, padding: 20}}>
    //       <ActivityIndicator />
    //     </View>
    //   );
    // }
    return (
      <Consumer>
        {value => (
          <Container>
            <Header />
            <Content>
              <View style={styles.columna}>
                <Text style={{fontWeight: 'bold', fontSize: 30}}>Tutorial</Text>
                <Text style={{left: 8, fontSize: 15, fontWeight: 'bold'}}>
                  Bienvenido! En esta aplicacion podra administrar los casos
                  juridicos de sus clientes.
                </Text>
                <Text></Text>
                <Text style={{left: 8}}>
                  - Para empezar vera la lista de clientes que se le han
                  asignado.
                </Text>
                <Image source={clientes} style={styles.clientes} />
                <Text></Text>
                <Text style={{left: 8}}>
                  - Al ingresar a ver un cliente podra ver todos los expedientes del cliente.
                </Text>
                <Image source={exps} style={styles.exps} />
                <Text></Text>
                <Text style={{left: 8}}>
                  - Al ingresar a algun expediente se le mostraran todos los documentos que tiene el expediente.
                </Text>
                <Image source={docs} style={styles.docs} />
                <Text></Text>
                <Text style={{left: 8}}>
                  - En la imagen anterior se ve un boton circular al pinchar alli usted ingresara a la ventana en donde podra scanear documentos y guardarlos. Las opciones son scanear, con la cual puede ir hoja por hoja; luego puede crear el pdf y este se guardara automaticamente; el ultimo boton le permite limpiar la pantalla.
                </Text>
                <Image source={scann} style={styles.scann} />
                {/* <Text></Text> */}
                <Text style={{left: 8}}>
                  - Este es un ejemplo de scanner.
                </Text>
                <Image source={scan} style={styles.scan} />
                <Text style={{left: 8}}>
                  - Para empezar vera la lista de clientes que se le han
                  asignado.
                </Text>
                <Image source={scann} style={styles.scann} />
              </View>
            </Content>
            <Footer e={this.props.navigation} />
          </Container>
        )}
      </Consumer>
    );
  }
}

const styles = StyleSheet.create({
  columna: {
    width: DEVICE_WIDTH * 0.9,
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  clientes: {
    width: DEVICE_WIDTH * 0.9,
    height: 200,
    left: 20,
  },
  exps: {
    width: DEVICE_WIDTH * 0.9,
    height: 300,
    left: 20,
  },
  docs: {
    width: DEVICE_WIDTH * 0.9,
    height: 700,
    left: 20,
  },
  scann: {
    width: DEVICE_WIDTH * 0.9,
    height: 150,
    left: 20,
  },
  scan: {
    width: DEVICE_WIDTH * 0.9,
    height: 700,
    left: 20,
  },
});
