import React, {useEffect} from 'react';
import {Spinner} from 'native-base';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';

import Launch from './launch';

const LAUNCH_QUERY = gql`
  query LaunchQuery($id: ID!) {
    launch(id: $id) {
      id
      upcoming
      details
      mission_name
      launch_date_unix
      launch_success
      telemetry {
        flight_club
      }
      rocket {
        rocket_name
        first_stage {
          cores {
            core {
              asds_attempts
              asds_landings
              block
              id
              missions {
                flight
                name
              }
              original_launch
              reuse_count
              rtls_attempts
              rtls_landings
              status
              water_landing
            }
            flight
            block
            gridfins
            legs
            reused
            land_success
            landing_intent
            landing_type
            landing_vehicle
          }
        }
        second_stage {
          payloads {
            manufacturer
            payload_type
            payload_mass_kg
            payload_mass_lbs
            orbit
            orbit_params {
              reference_system
              regime
              longitude
              semi_major_axis_km
              eccentricity
              periapsis_km
              apoapsis_km
              inclination_deg
            }
          }
        }
      }
      launch_site {
        site_name
        site_name_long
      }
      launch_success
      links {
        flickr_images
        article_link
        video_link
        wikipedia
      }
    }
  }
`;

// TODO: error handling
const LaunchLoader = ({route, navigation}) => {
  const {params: {id}} = route;
  const {data, loading} = useQuery(LAUNCH_QUERY, {variables: {id}});

  useEffect(() => {
    navigation.setParams({launchTitle: 'Loading...'});
  }, []);

  if (loading) return <Spinner color='black' />;

  return (
    <Launch launch={data.launch} navigation={navigation} />
  );
};

export default LaunchLoader;
