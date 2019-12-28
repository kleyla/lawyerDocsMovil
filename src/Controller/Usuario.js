import {Alert} from 'react-native';

const Usuario = {
  saveDate(token, e) {
    e.setState({Token: token});
  },

  check(e, e2, email, password) {
    fetch('http://192.168.0.17:8000/api/login', {
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {'Content-Type': 'application/json'},
      method: 'post',
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.length === 0) {
          Alert.alert('USUARIO INGRESADO INCORRECTO');
        } else {
          Alert.alert('Bienvenido ' + responseJson[0].name);
          //this.context.state.GuardarInformacion(responseJson);
          e2.state.GuardarInformacion(responseJson);
          //this.props.navigation.navigate('Bienvenida', {});
          e.navigate('Home', {});
        }
        console.log(responseJson);
      })
      .catch(error => {
        console.log(error);
        console.log('Error');
        Alert.alert('ERROR: PROBLEMA DE CONECTIVIDAD...!!!');
      });
  },
  Verificacion(e, e2, user, contra) {
    //e = this.props.navigation; e2=this.context
    fetch('http://192.168.43.10:3001/usuarios', {
      body: JSON.stringify({
        email: user,
        pass: contra,
      }),
      headers: {'Content-Type': 'application/json'},
      method: 'post',
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.length === 0) {
          Alert.alert('USUARIO INGRESADO INCORRECTO');
        } else {
          firebase
            .auth()
            .signInWithEmailAndPassword(user, contra)
            .then(() => this.props.navigation.navigate('Main'))
            .catch(error => this.setState({errorMessage: error.message}));
          Alert.alert('Bienvenido ' + responseJson[0].name);
          //this.context.state.GuardarInformacion(responseJson);
          e2.state.GuardarInformacion(responseJson);
          //this.props.navigation.navigate('Bienvenida', {});
          e.navigate('Bienvenida', {});
        }
        console.log(responseJson);
      })
      .catch(error => {
        console.log(error);
        console.log('Error');
        Alert.alert('ERROR: PROBLEMA DE CONECTIVIDAD...!!!');
      });
  },
};

export default Usuario;
