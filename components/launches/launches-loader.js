import React from 'react';
import {Spinner} from 'native-base';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import {sortBy} from 'lodash-es';

import Launches from './launches';

const LAUNCHES_QUERY = gql`
  {
    launches {
      id
      upcoming
      mission_name
      launch_date_unix
      launch_year
      launch_site {
        site_name
      }
      links {
        flickr_images
      }
    }
  }
`;

const LaunchesLoader = ({navigation}) => {
  const {data, loading} = useQuery(LAUNCHES_QUERY);

  if (loading) return <Spinner />;

  return (
    <Launches
      navigation={navigation}
      launches={sortBy(data.launches, 'launch_date_unix').reverse()} />
  );
};

export default LaunchesLoader;
