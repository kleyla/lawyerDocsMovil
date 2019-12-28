import React, {Component} from 'react';
import ScanbotSDK, {Page} from 'react-native-scanbot-sdk';

import {
  View,
  Button,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Text,
  Alert,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Container} from 'native-base';
import _ from 'lodash';

import {Consumer} from '../Model/VarGlobales';
import Footer from './components/Footer';
import Header from './components/Header';
import {theme} from './constants';

// import {DocumentDirectoryPath, ExternalDirectoryPath} from 'react-native-fs';
// import RNFetchBlob from 'react-native-fetch-blob';
import RNFetchBlob from 'rn-fetch-blob';
// import './components/fixtimerbug'
var user = null;
var expediente = null;

import firebase from './components/Firebase';
const firestore = firebase.firestore();
const database = firebase.database();
// var user = firebase.auth().currentUser;
const storage = firebase.storage();
// var storageRef = storage.ref();
// Create a child reference
// var docsRef = storageRef.child('documentos');
var user;

export default class Scan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pages: [],
      selectedPage: null,
      spinnerVisible: false,
      debugText: '',
      // user: null,
      // expediente: null,
      date: null,
    };
  }

  componentDidMount() {
    user = firebase.auth().currentUser;
    this.initializeSDK();
    //FECHA
    this.getCurrentDate();
  }

  async initializeSDK() {
    var licenseKey =
      'XcQrnP041cmQkzAr5LAh7d+kj27scz' +
      '8vVVAdATYHsP3XExmvBWZoTPw1W+kK' +
      'zh5+iZjnSxbf12Gyemsnn+rd/+tdkR' +
      '1M05zOVfgcc8bRi/5qYktAZ97uO1gj' +
      'lX/XEKUwnlmC9Wf0fybMhzaI9YIExb' +
      'wrnXB+R7gBX/KDWtkJkZDfVsb0KYSO' +
      'J4RbGxZgVw9DBaRpBISEQoV8VVvOUi' +
      'uCz1MeogPJx6da5m/JdPOpPcq3KD23' +
      'uhMc7d7fX/dCJc1gMOS4DBDCDIu0kv' +
      'TFLlvV9yk3ZEFNvi18Je1bWVLO4Lp0' +
      'TskcBJ/vzgwqkNLqiGXLk9YweWEYd4' +
      'buVFks5doxbA==\nU2NhbmJvdFNESw' +
      'pjb20ubGF3eWVyZG9jcwoxNTc1Njc2' +
      'Nzk5CjI2MjE0Mwoz\n';

    const options = {
      licenseKey: licenseKey, // Optional license key (empty for trial mode)
      loggingEnabled: true, // Consider switching logging OFF in production builds for security and performance reasons!
      storageImageFormat: 'JPG', // Optional image format - JPG or PNG. Default is JPG.
      storageImageQuality: 80, // Optional image JPG quality. Default is 80.
      //   storageBaseDirectory: 'file:///./assets/docs/', // Optional custom storage path.
    };
    try {
      const result = await ScanbotSDK.initializeSDK(options);
      // initialization succeeded
      console.log('aqui es ok');
      this.debugLog('initializeSDK result: ' + JSON.stringify(result));
    } catch (ex) {
      // initialization failed
      console.log('aqui es ta mal');
      this.debugLog('initializeSDK error: ' + JSON.stringify(ex.error));
    }
  }

  startScanbotCameraButtonTapped = async () => {
    const result = await ScanbotSDK.UI.startDocumentScanner({
      // Customize colors, text resources, etc..
      polygonColor: '#00ffff',
      cameraPreviewMode: 'FIT_IN',
    });

    this.debugLog(`DocumentScanner result: ${JSON.stringify(result)}`);

    if (result.status === 'OK') {
      this.setPages(this.state.pages.concat(result.pages));
    }
  };
  debugLog(msg: String) {
    console.log(msg);
    this.setState({
      debugText: msg,
    });
  }
  setPages = (pages: Page[], selectedPage: Page) => {
    this.setState({
      pages: pages,
      selectedPage: selectedPage
        ? _.find(pages, p => p.pageId == selectedPage.pageId)
        : _.last(pages),
    });
  };
  renderPickedImages() {
    let {pages} = this.state;
    if (pages) {
      return pages.map((p, i) => (
        <TouchableHighlight
          key={i}
          onPress={() => this.onPickedImageSelected(p)}>
          <Image
            style={styles.galleryImage}
            source={{
              uri:
                p.documentPreviewImageFileUri || p.originalPreviewImageFileUri,
            }}
          />
        </TouchableHighlight>
      ));
    }
  }
  onPickedImageSelected = (page: Page) => {
    this.setState({selectedPage: page});
  };

  renderDocumentImage() {
    let {selectedPage, filterPreviewUri} = this.state;
    if (selectedPage) {
      return (
        <Image
          style={styles.documentImage}
          source={{
            uri:
              filterPreviewUri ||
              selectedPage.documentPreviewImageFileUri ||
              selectedPage.originalPreviewImageFileUri,
          }}
        />
      );
    }
  }
  getCurrentDate() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    that.setState({
      //Setting the value of the date time
      date:
        date + '-' + month + '-' + year + ' ' + hours + ':' + min + ':' + sec,
    });
  }
  createPDFButtonTapped = async () => {
    if (!this.checkAllDocumentImages(true)) {
      return;
    }

    this.showSpinner();
    try {
      const imageUris = this.state.pages.map(
        p => p.documentImageFileUri || p.originalImageFileUri,
      );
      const result = await ScanbotSDK.createPDF(imageUris, 'FIXED_A4');
      this.debugLog('createPDF result: ' + JSON.stringify(result));
      var docpdf = result.pdfFileUri;
      const Blob = RNFetchBlob.polyfill.Blob;
      const fs = RNFetchBlob.fs;
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
      window.Blob = Blob;

      let uploadBlob = null;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log('USER ACTUAL ES' + user.uid);
        } else {
          // No user is signed in.
          console.log('USER NO LOGUED');
        }
      });
      this.getCurrentDate();
      var nameDoc = 'doc exp_' + expediente.id + ' ' + this.state.date + '.pdf';
      console.log('NAMEDOC ES ' + nameDoc);
      const docsRef = firebase
        .storage()
        .ref('expediente/' + expediente.id)
        .child(nameDoc);
      let mime = 'file/pdf';
      fs.readFile(docpdf, 'base64')
        .then(data => {
          return Blob.build(data, {type: `${mime};BASE64`});
        })
        .then(blob => {
          uploadBlob = blob;
          return docsRef.put(blob, {contentType: mime});
        })
        .then(() => {
          uploadBlob.close();
          return docsRef.getDownloadURL();
        })
        .then(url => {
          // URL of the image uploaded on Firebase storage
          console.log('URL FIREBASE ' + url);
          // this.uploadFirestore(url, nameDoc)
          database
            .ref('documentos/' + expediente.id)
            .push({
              nombre: nameDoc,
              doc: url,
              user_id: user.uid,
              // expediente_id: expediente.id,
              // descripcion: null,
              fecha: this.state.date,
            })
            .then(function() {
              console.log('Document successfully written!');
            })
            .catch(function(error) {
              console.error('Error writing document: ', error);
            });
        })
        .catch(error => {
          console.log('ERRORES .. ' + error);
        });

      // this.delayedAlert('PDF creado', result.pdfFileUri);
      this.delayedAlert('PDF creado', 'El documento fue creado exitosamente');
    } finally {
      this.hideSpinner();
    }
  };

  checkAllDocumentImages = () => {
    const {pages} = this.state;
    if (pages.length > 0 && _.every(pages, p => p && p.documentImageFileUri)) {
      return true;
    } else {
      Alert.alert(
        'Imagenes de Documentos son necesarias',
        'Por favor scanee algun documento.',
      );
      return false;
    }
  };
  showSpinner() {
    this.setState({spinnerVisible: true});
  }
  delayedAlert(title: string, message: string) {
    setTimeout(() => {
      Alert.alert(title, message);
    }, 500);
  }
  hideSpinner() {
    this.setState({spinnerVisible: false});
  }
  sdkCleanupButtonTapped = async () => {
    this.resetSelectedPages();
    await ScanbotSDK.cleanup();
    this.debugLog('Cleanup finished');
  };
  resetSelectedPages = () => {
    this.setState({
      pages: [],
      selectedPage: null,
    });
  };

  onLayout = evt => {
    const {width} = evt.nativeEvent.layout;
    this.setState({width});
  };

  render() {
    const {state} = this.props.navigation;
    expediente = state.params.expediente;
    console.log('HeyYY el Expediente es ' + expediente.id);
    // console.log('HeyYYYY el USUARIO ID es ' + user.uid);
    // this.setState({
    //     user: user,
    //     expediente: expediente,
    // })

    if (this.state.spinnerVisible) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      //   <View style={styles.containerMain}>
      <Consumer>
        {value => (
          <Container>
            <Header />
            <ScrollView onLayout={this.onLayout}>
              <View style={styles.botones}>
                <Button
                  title="Scannear"
                  style={styles.btnScan}
                  color = '#ba54f5'
                  onPress={this.startScanbotCameraButtonTapped}></Button>
                <Text> </Text>
                <Button
                  title="Crear PDF"
                  color = '#53f5b9'
                  onPress={this.createPDFButtonTapped}></Button>
                <Text> </Text>
                <Button
                  title="Limpiar"
                  color = '#f5b953'
                  onPress={this.sdkCleanupButtonTapped}></Button>
              </View>
              <View style={styles.container}>{this.renderPickedImages()}</View>
              <View style={styles.container}>{this.renderDocumentImage()}</View>
            </ScrollView>
            <Footer e={this.props.navigation}/>
          </Container>
        )}
      </Consumer>
      //   </View>
    );
  }
}

const styles = StyleSheet.create({
  botones: {
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'red',
    // alignItems: 'center',
  },
  btnScan: {
    // color: theme.colors.primary,
    color: 'red',
    textDecorationColor: 'black',
    // backgroundColor: theme.colors.primary,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
    margin: 5,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    margin: 10,
  },
  infoblock: {
    textAlign: 'center',
    backgroundColor: '#aaa',
    margin: 10,
    height: 100,
    textAlignVertical: 'center',
  },
  demoButtonPanel: {
    margin: 10,
  },
  documentImage: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
  galleryImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  debugOutputHeader: {
    margin: 10,
    fontWeight: 'bold',
  },
  debugOutputContent: {
    margin: 10,
    marginTop: 0,
    fontFamily: 'Courier',
  },
});
