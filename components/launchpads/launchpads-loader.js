import React, {useEffect, useState} from 'react';
import {Container, Header, Body, Title, Footer, FooterTab, Button, Text, Content, Spinner} from 'native-base';

import {SPACEX_API_HOST} from '../../constants';
import Launchpads from './launchpads';

const LaunchpadsLoader = () => {
  const [fetching, setFetching] = useState(true);
  const [launchpads, setLaunchpads] = useState([]);

  useEffect(() => {
    fetch(`${SPACEX_API_HOST}/launchpads`)
      .then((response) => response.json())
      .then((json) => setLaunchpads(json))

    setFetching(false);
  }, []);

  return fetching
    ? <Spinner />
    : <Launchpads launchpads={launchpads} />;
};

export default LaunchpadsLoader;
