import React, {useEffect, useState} from 'react';
import {Container, Header, Body, Title, Footer, FooterTab, Button, Text, Content, Spinner} from 'native-base';

import {SPACEX_API_HOST} from '../../constants';
import Launches from "./launches";

const LaunchesLoader = () => {
  const [fetching, setFetching] = useState(true);
  const [launches, setLaunches] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${SPACEX_API_HOST}/launches`);
      const json = await response.json();

      setLaunches(json);
    } catch (err) {

    } finally {
      setFetching(false);
    }
  }, []);

  return (
    <Container>
      <Content>
        {
          fetching ?
            <Spinner color="black" /> :
            <Launches launches={launches} />
        }
      </Content>
    </Container>
  );
};

export default LaunchesLoader;
