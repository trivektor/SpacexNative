import React, {useEffect} from 'react';
import {Spinner} from 'native-base';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';

import Rocket from './rocket';

const ROCKET_QUERY = gql`
  query RocketQuery($id: ID!) {
    rocket(id: $id) {
      id
      boosters
      cost_per_launch
      description
      diameter {
        feet
        meters
      }
      engines {
        engine_loss_max
        layout
        number
        propellant_1
        propellant_2
        thrust_sea_level {
          kN
          lbf
        }
        thrust_to_weight
        thrust_vacuum {
          kN
          lbf
        }
        type
        version
      }
      first_flight
      first_stage {
        burn_time_sec
        engines
        fuel_amount_tons
        reusable
        thrust_sea_level {
          kN
          lbf
        }
        thrust_vacuum {
          kN
          lbf
        }
      }
      height {
        feet
        meters
      }
      landing_legs {
        material
        number
      }
      mass {
        kg
        lb
      }
      name
      payload_weights {
        id
        kg
        lb
        name
      }
      second_stage {
        burn_time_sec
        engines
        fuel_amount_tons
        payloads {
          composite_fairing {
            diameter {
              feet
              meters
            }
            height {
              feet
              meters
            }
          }
          option_1
        }
        thrust {
          kN
          lbf
        }
      }
      stages
      success_rate_pct
      type
      wikipedia
    }
  }
`;

const RocketLoader = ({route, navigation}) => {
  const {params: {id}} = route;
  const {data, loading} = useQuery(ROCKET_QUERY, {
    variables: {id},
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    navigation.setParams({launchTitle: 'Loading...'});
  }, []);

  if (loading) return <Spinner color='black' />;

  return <Rocket rocket={data.rocket} navigation={navigation} />;
};

export default RocketLoader;
