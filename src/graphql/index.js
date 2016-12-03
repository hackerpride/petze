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

export function createBeaconProximity(variables) {
  const ql = client();

  const mutation = gql`
    mutation($address: String!, $alias: String, $rssi: Int!) {
      createBeaconProximity(address: $address, alias: $alias, rssi: $rssi) {
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
