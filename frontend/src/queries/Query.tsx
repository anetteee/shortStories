import { gql } from '@apollo/client';

function Query() {
    const ALL_QUOTES = gql`
    query getQuote {
        quotes {
            _id
            quote
        }
    }
`;
}

export default Query;