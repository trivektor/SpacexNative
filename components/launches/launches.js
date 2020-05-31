import React from 'react';
import {Container, Text} from 'native-base';

const Launches = ({launches}) => {
  return (
    <Container>
      <Text>Launches: {launches.length}</Text>
    </Container>
  );
};

export default Launches;
