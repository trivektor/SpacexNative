import React, {useState} from 'react';
import {Container, Header, Body, Title, Footer, FooterTab, Button, Text, Content} from 'native-base';

import Launchpads from './launchpads';
import Launches from './launches';

const COMPONENT_MAPPINGS = {
  launchpads: Launchpads,
  launches: Launches,
};

const Home = ({navigation}) => {
  const [activeTab, setActiveTab] = useState("launchpads");
  const ActiveComponent = COMPONENT_MAPPINGS[activeTab];

  return (
    <Container>
      <Content>
        <ActiveComponent navigation={navigation} />
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
  );
};

export default Home;
