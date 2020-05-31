import React from 'react';
import {Spinner} from 'native-base';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';

import Launchpads from './launchpads';

const LAUNCHPADS_QUERY = gql`
  {
    launchpads {
      id
      location {
        name
        region
        longitude
        latitude
      }
      attempted_launches
    }
  }
`;

// TODO: error handling
const LaunchpadsLoader = () => {
  const {data, loading} = useQuery(LAUNCHPADS_QUERY);

  if (loading) return <Spinner />;

  return <Launchpads launchpads={data.launchpads} />;
};

export default LaunchpadsLoader;
