import React from 'react';
import {ListItem, Avatar} from 'react-native-elements';
import {List, Text} from 'native-base';
import {format} from 'date-fns';

import {DATE_FORMAT} from '../../constants';

const LaunchListItem = ({
  id,
  mission_name,
  launch_date_unix,
  links,
  upcoming,
}) => {
  const leftAvatarUri = links.flickr_images[0] || 'https://www.spacex.com/static/images/share.jpg';
  const leftAvatar = (
    <Avatar
      rounded
      source={{uri: leftAvatarUri}}
    />
  );
  const title = (
    <Text style={{fontWeight: 'bold'}}>
      {mission_name}
      {" "}
      {upcoming && <Text style={{color: 'green'}}>(upcoming)</Text>}
    </Text>
  );
  const subtitle = format(launch_date_unix * 1000, DATE_FORMAT);

  return (
    <ListItem
      bottomDivider
      leftAvatar={leftAvatar}
      title={title}
      subtitle={subtitle} />
  );
}

const Launches = ({launches}) => {
  return launches.map(
    (launch) => <LaunchListItem key={launch.id} {...launch} />
  );
};

export default Launches;
