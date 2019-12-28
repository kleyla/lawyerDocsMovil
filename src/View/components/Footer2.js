import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, } from 'native-base';
import {Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';

export default class Footer2 extends Component {
  render() {
    return (
      <Container>
        
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="apps" />
              <Text>Apps</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button vertical active>
              <Icon active name="navigate" />
              <Text>Navigate</Text>
            </Button>
            <Button vertical>
              <Icon name="person" />
              <Text>Contact</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}