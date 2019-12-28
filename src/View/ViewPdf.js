import React, {Component} from 'react';
import PDFView from 'react-native-view-pdf';
import RNFetchBlob from 'rn-fetch-blob';

import {ActivityIndicator, View, Alert} from 'react-native';

var documento = null;
const {dirs} = RNFetchBlob.fs;
const downDir = dirs.DownloadDir;

export default class ViewPdf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      active: false,
    };
  }
  componentDidMount() {
    const {state} = this.props.navigation;
    documento = state.params.doc;
    console.log('La Url es es ' + documento.nombre);
    this.setState({
      isLoading: false,
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
      <View style={{flex: 1}}>
        {/* Some Controls to change PDF resource */}
        <PDFView
          style={{flex: 1}}
          //   resource="http://www.pdf995.com/samples/pdf.pdf"
          resource={
            Platform.OS === 'ios'
              ? 'test-pdf.pdf'
              : downDir + '/' + documento.nombre
          }
          resourceType="file"
          onError={error => {
            console.log('onError', error);
            Alert.alert(
              'Archivo no encontrado!',
              'Por favor descargue el archivo',
            );
          }}
        />
      </View>
    );
  }
}
