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

const RocketsLoader = ({navigation}) => {
  const {data, loading} = useQuery(ROCKETS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Spinner color="black" />;

  const {rockets} = data;

  return (
    <Rockets 
      navigation={navigation} 
      rockets={rockets} />
  );
};

export {RocketsLoader as default};