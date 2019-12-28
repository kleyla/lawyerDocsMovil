import React, {Component} from 'react';

//Importaciones de los controladores
import Usuario from '../Controller/Usuario';

export class Provider extends Component {
  state = {
    Saludo: 'Hola Karen',
    Token: undefined,

    GuardarInformacion: valor => {
      Usuario.saveDate(valor, this);
    },
    //Funciones de ControladorUsuario
    checkUser: (e, e2, email, pass) => {
      Usuario.check(e, e2, email, password);
    },
    VerificarDatos: (e, e2, user, contra) => {
      Usuario.Verificacion(e, e2, user, contra);
    },
  };

  render() {
    return (
      <VarGlobales.Provider
        value={{ state: this.state }}>
        {this.props.children}
      </VarGlobales.Provider>
    );
  }
}

export const VarGlobales = React.createContext();
export const Consumer = VarGlobales.Consumer;
