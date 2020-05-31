/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {Container, Header, Body, Title, Footer, FooterTab, Button, Text, Content, StyleSheet} from 'native-base';
import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import {Launchpads, Launches} from './components';

const COMPONENT_MAPPINGS = {
  launchpads: Launchpads,
  launches: Launches,
};

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql',
});

const App = () => {
  const [activeTab, setActiveTab] = useState("launchpads");
  const ActiveComponent = COMPONENT_MAPPINGS[activeTab];

  return (
    <ApolloProvider client={client}>
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
              <Text>Launchpads</Text>
            </Button>
            <Button
              active={activeTab === "launches"}
              onPress={() => setActiveTab("launches")}>
              <Text>Launches</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    </ApolloProvider>
  );
};

export default App;
