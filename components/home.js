import React, {useState} from 'react';
import {Container, Header, Body, Title, Footer, FooterTab, Button, Text, Content, Icon} from 'native-base';

import Launchpads from './launchpads';
import Launches from './launches';
import Rockets from './rockets';

const COMPONENT_MAPPINGS = {
  launchpads: Launchpads,
  launches: Launches,
  rockets: Rockets,
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
            <Icon type="MaterialIcons" name="location-on" />
            <Text>Launchpads</Text>
          </Button>
          <Button
            active={activeTab === "launches"}
            onPress={() => setActiveTab("launches")}>
            <Icon type="Octicons" name="dashboard" />
            <Text>Launches</Text>
          </Button>
          <Button
            active={activeTab === "rockets"} 
            onPress={() => setActiveTab("rockets")}>
            <Icon type="Octicons" name="rocket" />
            <Text>Rockets</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default Home;
