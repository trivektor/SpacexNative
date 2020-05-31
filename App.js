/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {Container, Header, Body, Title, Footer, FooterTab, Button, Text, Content, StyleSheet} from 'native-base';

import {Launchpads, History} from './components';

const COMPONENT_MAPPINGS = {
  launchpads: Launchpads,
  history: History,
};

const App = () => {
  const [activeTab, setActiveTab] = useState("launchpads");
  const ActiveComponent = COMPONENT_MAPPINGS[activeTab];

  return (
    <Container>
      <Header>
        <Body>
          <Title>Public SpaceX Archives</Title>
        </Body>
      </Header>
      <Content>
        <ActiveComponent />
      </Content>
      <Footer>
        <FooterTab>
          <Button
            active={activeTab === "launchpads"}
            onPress={() => setActiveTab("launchpads")}>
            <Text>Launches</Text>
          </Button>
          <Button
            active={activeTab === "history"}
            onPress={() => setActiveTab("history")}>
            <Text>History</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default App;
