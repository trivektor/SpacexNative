import React from 'react';
import {SafeAreaView} from 'react-native';
import {Spinner} from 'native-base';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import {sortBy} from 'lodash-es';

import Launches from './launches';

const LAUNCHES_QUERY = gql`
  {
    launches {
      id
      mission_name
      launch_date_unix
      launch_year
      launch_date_local
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
        rocket_type
      }
      links {
        flickr_images
        mission_patch_small
      }
    }
  }
`;

const LaunchesLoader = ({navigation}) => {
  const {data, loading} = useQuery(LAUNCHES_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Spinner color='black' />;

  return (
    <Launches
      navigation={navigation}
      launches={sortBy(data.launches, 'launch_date_unix').reverse()} />
  );
};

export default LaunchesLoader;
