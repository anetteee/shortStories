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

/*
interface QuoteInventoryVars {
    author: string;
}
*/

const GET_QUOTE_INVENTORY = gql`
    query getQuoteInventory {
        getQuote {
            _id
            id
            quote
            author
        }
    }
`;

export function Query() {
    const {loading, data} = useQuery<QuoteIventoryData> (
        GET_QUOTE_INVENTORY
    );
    
    console.log(data)
    return (
        <div>
            
            <h3>Available Inventory</h3>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ObjectID</th>
                            <th>Id (Number)</th>
                            <th>Quote</th>
                            <th>Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.quoteInventory?.map(inventory => (
                            <tr>
                                <td>{inventory._id}</td>
                                <td>{inventory.id}</td>
                                <td>{inventory.quote}</td>
                                <td>{inventory.author}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}