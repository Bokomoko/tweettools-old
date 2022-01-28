import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

interface TweetUserData {
  name: string;
  username: string;
  created_at: string;
  id: string;
}

interface TweetUserListProps {
  tweetUserList: TweetUserData[];
}

export default function ListOfFollowers({ tweetUserList }: TweetUserListProps) {
  const [checked, setChecked] = React.useState({});

  const handleToggle = id => () => {
    const newChecked = { ...checked };
    if (newChecked[id]) {
      delete newChecked[id];
    } else {
      newChecked[id] = true;
    }
    setChecked(newChecked);
  };

  return (
    <List
      dense
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
    >
      {tweetUserList.map(({ name, username, created_at, id }) => {
        const labelId = `checkbox-list-secondary-label-${id}`;
        return (
          <ListItem
            key={id}
            secondaryAction={
              <Checkbox
                edge='end'
                onChange={handleToggle(id)}
                checked={checked[id]}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${id + 1}`}
                  src={`/static/images/avatar/${id + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`Line item ${id + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
