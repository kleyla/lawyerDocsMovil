import React, {Component} from 'react';

import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  PermissionsAndroid,
  Alert,
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

import ScanbotSDK from 'react-native-scanbot-sdk';
import RNFetchBlob from 'rn-fetch-blob';
// import {DocumentDirectoryPath, ExternalDirectoryPath} from 'react-native-fs';

import {Consumer} from '../Model/VarGlobales';

import Footer from './components/Footer';
import Header from './components/Header';
import {theme} from './constants';
import firebase from './components/Firebase';

var user = firebase.auth().currentUser;
var expediente = null;
const urlExa = 'http://www.africau.edu/images/default/sample.pdf';

export default class DocsExpediente extends Component {
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
    var idExpediente = state.params.expediente.id;
    expediente = state.params.expediente;
    // this.setState({cliente: this.state.item});
    console.log('El id es es ' + idExpediente);
    this.listenForTasks();
    return fetch(
      'https://karenwhocodes.000webhostapp.com/api/expedienteDocumentos/' +
        idExpediente,
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

  listenForTasks() {
    var tasksRef = firebase.database().ref('documentos/' + expediente.id);
    tasksRef.on('value', dataSnapshot => {
      var tasks = [];
      dataSnapshot.forEach(child => {
        tasks.push({
          nombre: child.val().nombre,
          doc: child.val().doc,
          user_id: child.val().user_id,
          fecha: child.val().fecha,
          key: child.key,
        });
        console.log('Los DOCS  ' + tasks);
      });

      this.setState({
        docs: tasks,
      });
      console.log('Los DOCS SON ' + this.state.docs);
    });
  }

  actualDownload = async item => {
    console.log('URL URL ' + item.doc);
    const {dirs} = RNFetchBlob.fs;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        // title: item,
        // path: `${dirs.DownloadDir}/${item}`,
        title: item.nombre,
        path: `${dirs.DownloadDir}/${item.nombre}`,
      },
    })
      // .fetch('GET', item, {})
      .fetch('GET', item.doc, {})
      .then(res => {
        console.log('The file saved to ', res.path());
      })
      .catch(e => {
        console.log(e);
      });
  };
  downloadFile = url => {
    try {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.actualDownload(url);
      } else {
        Alert.alert(
          'Permission Denied!',
          'You need to give storage permission to download the file',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  render() {
    // const cliente = this.props.cliente;
    const {state} = this.props.navigation;
    var idCliente = state.params.cliente.nombres;
    const cliente = state.params.cliente;
    const expediente = state.params.expediente;
    const expedienteId = state.params.expediente.id;
    console.log('Hey el cliente es ' + idCliente);
    console.log('Hey el Expediente es ' + expedienteId);
    this.setState.cliente = state.params.cliente;

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
      } else {
        // No user is signed in.
      }
    });
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
                    {/* <Text>User: {user.uid}</Text> */}
                  </View>
                  <View style={styles.right}>
                    <Text style={{fontSize: 8}}>
                      Fecha de Ingreso: {cliente.created_at}
                    </Text>
                  </View>
                </View>
              </CardItem>
            </Card>

            {/* Expediente */}
            <Card>
              <CardItem>
                <View style={styles.containerExpediente}>
                  <Text style={styles.subtitulo}>Expediente:</Text>
                  <Text>ID: {expediente.id}</Text>
                  <Text>Descripcion: {expediente.descripcion}</Text>
                </View>
              </CardItem>
            </Card>

            {/* Documentos */}
            <Content>
              <Card>
                <CardItem>
                  <View style={styles.containerExpediente}>
                    <Text style={styles.subtitulo}>Documentos:</Text>
                    <FlatList
                      data={this.state.docs}
                      renderItem={({item}) => (
                        <ListItem>
                          <View
                            style={styles.filaList}
                            onPress={() => {
                              this.props.navigation.navigate(
                                'DocsExpediente',
                                // {cliente: item.id },
                                {cliente: item},
                              );
                            }}>
                            <TouchableOpacity
                              style={styles.descrDoc}
                              onPress={() => {
                                this.props.navigation.navigate('ViewPdf', {
                                  doc: item,
                                });
                              }}>
                              <Text style={styles.text}>
                                Doc: {item.nombre}
                              </Text>
                              <Text style={styles.text02}>
                                Subido por: {item.user_id}
                              </Text>
                              <Text>{}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => {
                                this.actualDownload(item);
                              }}
                              // onPress={() => {
                              //   this.props.navigation.navigate('ViewPdf', {
                              //     url: item.doc,
                              //   });
                              // }}
                            >
                              <Icon name="clouddownload" style={styles.icon} />
                            </TouchableOpacity>
                          </View>
                        </ListItem>
                      )}
                    />
                  </View>
                </CardItem>
              </Card>
            </Content>
            {/* Boton redondo */}
            {/* <View style={{flex: 1}}> */}
            <Fab
              //   active={this.state.active}
              active={true}
              direction="up"
              containerStyle={{}}
              style={{backgroundColor: theme.colors.secondary}}
              position="bottomRight"
              onPress={() => {
                this.props.navigation.navigate('Scan', {
                  expediente: expediente,
                });
              }}
              // onPress={this.startDocumentScannerButtonTapped}
              //   onPress={() => this.setState({active: !this.state.active})}
            >
              <Icon name="plus" />
            </Fab>
            {/* </View> */}

            <Footer e={this.props.navigation} />
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
  descrDoc: {
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    flex: 1,
  },
  text02: {
    flex: 1,
    fontSize: 8,
  },
  icon: {
    alignSelf: 'flex-end',
    color: theme.colors.tertiary,
    fontSize: 28,
  },
});
