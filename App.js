import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//VarGlobales
import {Provider} from './src/Model/VarGlobales';
// import './src/View/components/fixtimerbug'
//Modulos
import Login from './src/View/Login';
import Home from './src/View/Home';
import ClienteProfile from './src/View/ClienteProfile';
import DocsExpediente from './src/View/DocsExpediente';
import Scan from './src/View/Scan'
import ViewPdf from './src/View/ViewPdf'
import Tutorial from './src/View/Tutorial'
// import Register from './src/View/Register';

const AppNavigator = createStackNavigator(
  {
    Login: {screen: Login},
    Home: {screen: Home},
    ClienteProfile: {screen: ClienteProfile},
    DocsExpediente: { screen: DocsExpediente },
    Scan: { screen: Scan},
    ViewPdf: {screen: ViewPdf},
    Tutorial: {screen: Tutorial},
    // Register: { screen: Register },
  },
  {
    defaultNavigationOptions: {header: null},
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider>
        <AppContainer />
        </Provider>
    )
  }
}
