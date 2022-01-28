// Fetch the followers of a user account, by ID
// https://developer.twitter.com/en/docs/twitter-api/users/follows/quick-start

import needle from 'needle';

export default async function getfollowers(req, res) {
  const { userid } = req.query;
  const url = `https://api.twitter.com/2/users/${userid}/followers`;
  const bearerToken = process.env.BEARER_TOKEN;
  let users: string[] = [];
  let params = {
    max_results: 1000,
    'user.fields': 'created_at',
  };

  const options = {
    headers: {
      'User-Agent': 'v2FollowersJS',
      authorization: `Bearer ${bearerToken}`,
    },
  };

  let hasNextPage = true;
  let nextToken = null;
  while (hasNextPage) {
    let resp = await getPage(url, params, options, nextToken);
    if (
      resp &&
      resp.meta &&
      resp.meta.result_count &&
      resp.meta.result_count > 0
    ) {
      if (resp.data) {
        users.push.apply(users, resp.data);
      }
      if (resp.meta.next_token) {
        nextToken = resp.meta.next_token;
      } else {
        hasNextPage = false;
      }
    } else {
      hasNextPage = false;
    }
  }

  res.send(JSON.stringify({ users, followers: users.length }));
}

const getPage = async (url: string, params, options, nextToken) => {
  if (nextToken) {
    params.pagination_token = nextToken;
  }

  try {
    const resp = await needle('get', url, params, options);

    if (resp.statusCode != 200) {
      console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
      return;
    }
    return resp.body;
  } catch (err) {
    throw new Error(`Request failed: ${err}`);
  }
};
