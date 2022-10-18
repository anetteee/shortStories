import React from 'react';
import { useQuery, gql } from '@apollo/client';

interface QuoteIventory {
    _id: string;
    id: number;
    quote: string;
    author: string;
}

interface QuoteIventoryData {
    quoteInventory: QuoteIventory[];
}

interface QuoteInventoryVars {
    author: string;
}

const GET_QUOTE_INVENTORY = gql`
    query getQuoteInventory($author: String!) {
        quotesInventory(author: $author) {
            _id
            id
            quote
            author
        }
    }
`;

export function Query() {
    const {loading, data} = useQuery<QuoteIventoryData, QuoteInventoryVars> (
        GET_QUOTE_INVENTORY, 
        {variables: {author: "Kevin Kruse"}}
    );
    return (
        <div>
            <h3>Available Inventory</h3>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Quote</th>
                            <th>Id (Number in list)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.quoteInventory.map(inventory => (
                            <tr>
                                <td>{inventory.quote}</td>
                                <td>{inventory.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}