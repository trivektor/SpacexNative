import React from 'react';
import {SafeAreaView} from 'react-native';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import {Spinner} from 'native-base';

import Rockets from './rockets';

const ROCKETS_QUERY = gql`
  {
    rockets {
      id
      name
      description
      first_flight
      success_rate_pct
    }
  }
`;

const RocketsLoader = () => {
  const {data, loading} = useQuery(ROCKETS_QUERY);

  if (loading) return <Spinner />;

  const {rockets} = data;

  return (
    <Rockets rockets={rockets} />
  );
};

export {RocketsLoader as default};