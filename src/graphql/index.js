import ApolloClient, {createNetworkInterface} from 'apollo-client';
import gql from 'graphql-tag';

client = () => {
  return new ApolloClient({
    ssrMode: true,
    networkInterface: createNetworkInterface({
      uri: "https://api.graph.cool/simple/v1/ciw94hma112uz017133bkexrv",
      credentials: 'same-origin',
      // transfer request headers to networkInterface so that they're accessible to proxy server
      // Addresses this issue: https://github.com/matthew-andrews/isomorphic-fetch/issues/83

      // headers: {
      //   Authorization: `Bearer ${req.user.authToken}`,
      // }
    }),
  });
}

export function createRating(body) {
  const ql = client();

  const mutation = gql`
    mutation {
      createRating {
        id
      }
    }
  `

  return ql.mutate({
    mutation,
    null,
    forceFetch: true,
  });
}

export function createUserPosition(variables) {
  const ql = client();

  const mutation = gql`
    mutation($userId: ID!, $ratingId: ID!, $recordedAt: DateTime!) {
      createUserPosition(userId: $userId, ratingId: $ratingId, recordedAt: $recordedAt) {
        id
      }
    }
  `

  return ql.mutate({
    mutation,
    variables,
    forceFetch: true,
  });
}

export function createBeaconProximity(variables) {
  const ql = client();

  const mutation = gql`
    mutation($address: String!, $alias: String, $rssi: Int!, $userpositionId: ID) {
      createBeaconProximity(address: $address, alias: $alias, rssi: $rssi, userpositionId: $userpositionId) {
        id
      }
    }
  `

  return ql.mutate({
    mutation,
    variables,
    forceFetch: true,
  });
}

export function report(userid, proximities) {
  const rating = createRating();
  rating
  .then((res) => {
    const ratingId = res.data.createRating.id;

    createUserPosition({
      ratingId,
      userId: userid,
      recordedAt: new Date(),
    })
    .then((res) => {
      const positionId = res.data.createUserPosition.id;

      proximities.forEach((proximity) => {
        createBeaconProximity({
          address: proximity.address,
          alias: proximity.alias,
          rssi: proximity.rssi,

          userpositionId: positionId,
        })
        .then((res) => {
          // const positionId = res.data.createUserPosition.id;
        })
        .catch((err) => {
          console.log("ERROR: ", err);
        })
      });
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    })
  })
  .catch((err) => {
    console.log("ERROR: ", err);
  })
}
