import React, {Component} from 'react';
import {
  View,
  // Button,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  Card,
  CardItem,
  Left,
  Right,
  Thumbnail,
  Body,
  Button,
} from 'native-base';

import {Consumer} from '../../Model/VarGlobales';

export default class Cliente extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     // id: '',
  //     // nombres: '',
  //     // apellidos: '',
  //     // email: '',
  //     // ci: '',
  //     // numero: '',
  //     // genero: '',
  //     // direccion: '',
      
  //   };
  // }

  componentDidMount() {
    console.log(this.props.cliente)
    // this.setState({
      // id: this.props.id,
      // nombres: this.props.nombres,
      // apellidos: this.props.apellidos,
      // ci: this.props.ci,
      // direccion: this.props.direccion,
      // genero: this.props.genero,
      // numero: this.props.numero,
      
    // })
    // console.log(this.state)
    // console.log(this.context.state);
    // console.log(id);
    // this.setState.id = this.props.id;
    // this.setState.image = this.props.image;
    // this.setState.name = this.props.nombres;
    // this.setState.ci = this.props.cliente.ci;
  }

  render() {
    const {
      id,
      nombres,
      apellidos,
      email,
      ci,
      numero,
      genero,
      direccion,
      estado,
      created_at,
      updated_at,
    } = this.props;

    return (
      <Consumer>
        {value => (
          <Card>
            <View style={styles.comentario}>
              <CardItem>
                <Left>
                  {/* <Thumbnail source={this.state.image} /> */}
                  <Body>
                    <View>
                      {/* <Text note>{this.props.nombres}</Text> */}
                      <Text note>{nombres}</Text>
                    </View>
                    {/* <Text note>{this.state.apellidos}</Text> */}
                    <Text note>{this.props.apellidos}</Text>
                    <Text style={styles.fecha}>{this.props.ci}</Text>
                  </Body>
                </Left>
              </CardItem>
            </View>
          </Card>
        )}
      </Consumer>
    );
  }
}

const styles = StyleSheet.create({
  comentario: {
    backgroundColor: 'red',
  },

  fecha: {
    fontSize: 8,
    alignSelf: 'flex-end',
    //   backgroundColor: 'red'
  },
});
