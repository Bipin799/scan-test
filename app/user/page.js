// "use client";

// import { useEffect, useState } from "react";
// import Layout from "../component/Layout";
// // import { Typography, CircularProgress } from "@mui/material";
// import UserGrid from "../component/UserGrid";
// import Loader from "../component/Loader";

// export default function UserList() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((res) => res.json())
//       .then((data) => {
//         setUsers(data); 
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <Layout>
//       <main style={{ padding: "20px" }}>
//         {/* <Typography
//           variant="h4"
//           component="h1"
//           color="primary"
//           gutterBottom
//           align="center"
//         >
//           Users Grid
//         </Typography> */}

//         {loading ? (
//           <Loader/>
//         ) : (
//           <UserGrid users={users} />
//         )}
//       </main>
//     </Layout>
//   );
// }











"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../component/Layout";
import UserGrid from "../component/UserGrid";
import Loader from "../component/Loader";
import { fetchUsers } from "../redux/user/action";

export default function UserList() {
  const dispatch = useDispatch();
  const { list: users, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Layout>
      <main style={{ padding: "20px" }}>
        {loading ? <Loader /> : <UserGrid users={users} />}
        {/* <UserGrid users={users} /> */}
      </main>
    </Layout>
  );
}