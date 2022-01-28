import React from 'react';
import axios from 'axios';

import ListOfFollowers from './components/Listoffollowers';

export default function GetUserID() {
  const [reqUserName, setReqUserName] = React.useState('');
  const [myFollowers, setMyFollowers] = React.useState([]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setReqUserName(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const queryUserID = `http://localhost:3000/api/getuserid/${reqUserName}`;
    const response = await axios.get(queryUserID, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { username, userID } = response.data;
    console.log({ username, userID });
    (async () => {
      const response = await axios.get(
        `localhost:3000/api/getfollowers/${userID}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
          },
        }
      );
      const { users, followers } = response.data;

      setMyFollowers(users);
    })();
  };
  return (
    <div>
      <input type='text' placeholder='Enter your name' onChange={handleInput} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
