import {gql} from '@apollo/client';

export const GET_CHECKIN = gql`
  query GetCheckins {
    checkIn {
      id
      created
      mood
      tags {
        edges {
          node {
            id
            label
          }
        }
      }
      user {
        id
        created
        firstName
        lastName
      }
    }
  }
`;
