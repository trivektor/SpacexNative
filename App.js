/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {Container, Header, Body, Title, Footer, FooterTab, Button, Text, Content, StyleSheet} from 'native-base';

import {Launches, History} from './components';

const COMPONENT_MAPPINGS = {
  launches: Launches,
  history: History,
};

const App = () => {
  const [activeTab, setActiveTab] = useState("launches");
  const ActiveComponent = COMPONENT_MAPPINGS[activeTab];

  return (
    <Container>
      <Header>
        <Body>
          <Title>Unofficial SpaceX App</Title>
        </Body>
      </Header>
      <Content>
        <ActiveComponent />
      </Content>
      <Footer>
        <FooterTab>
          <Button
            active={activeTab === "launches"}
            onPress={() => setActiveTab("launches")}>
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
