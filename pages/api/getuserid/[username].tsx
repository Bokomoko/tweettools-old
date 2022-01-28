import axios from 'axios';

export default async function handler(req, res) {
  const { username } = req.query;
  const queryUserID = `https://api.twitter.com/2/users/by/username/${username}`;
  const bearerToken = process.env.BEARER_TOKEN;
  const options = {
    headers: {
      'User-Agent': 'Twitter-User-ID-Fetcher',
      authorization: `Bearer ${bearerToken}`,
    },
  };
  const { data } = await axios.get(queryUserID, options);
  res.send(JSON.stringify({ username, userID: data.data.id }));
}
