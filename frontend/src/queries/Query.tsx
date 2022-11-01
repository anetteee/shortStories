// import React from "react";
// import { useQuery, gql } from "@apollo/client";
// import Pagination from "@mui/material/Pagination";
// import { useState } from "react";

// const GET_POST_INVENTORY = gql`
//   query getQuoteInventory(
//     $tag: String
//     $sortBy: String
//     $limit: Int
//     $offset: Int
//   ) {
//     getPost(tag: $tag, sortBy: $sortBy, limit: $limit, offset: $offset) {
//       posts {
//         _id
//         id
//         title
//         body
//         userId
//         tags
//         reactions
//       }
//       count
//     }
//   }
// `;

// const pageSize = 10;

// export function Query() {
//   const [page, setPage] = useState(1);
//   const { loading, data, refetch } = useQuery(GET_POST_INVENTORY, {
//     variables: {
//       tag: null,
//       sortBy: "asc",
//       limit: 10,
//       offset: page - 1,
//       keepPreviousData: true,
//     },
//   });

//   console.log("DataInventory", GET_POST_INVENTORY);
//   return (
//     <div>
//       <h3>Available Inventory</h3>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>ObjectID</th>
//               <th>Id (Number)</th>
//               <th>Title</th>
//               <th>Body</th>
//               <th>UserId</th>
//               <th>Tags</th>
//               <th>Reactions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data &&
//               data.getPost.posts?.map((inventory: any) => (
//                 <tr>
//                   <td>{inventory._id}</td>
//                   <td>{inventory.id}</td>
//                   <td>{inventory.title}</td>
//                   <td>{inventory.body}</td>
//                   <td>{inventory.userId}</td>
//                   <td>{inventory.tags}</td>
//                   <td>{inventory.reactions}</td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       )}
//       <Pagination
//         count={data.getPost.count / pageSize}
//         onChange={(_, page) =>
//           refetch({
//             tag: null,
//             sortBy: "asc",
//             limit: pageSize,
//             offset: (page - 1) * pageSize,
//             keepPreviousData: true,
//           })
//         }
//       />
//     </div>
//   );
// }
