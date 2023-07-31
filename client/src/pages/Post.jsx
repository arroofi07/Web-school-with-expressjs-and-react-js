// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function Post() {
//   let { id } = useParams();
//   const [postObject, setPostObject] = useState({});

//   useEffect(() => {
//     axios.get(`http://loc$alhost:3001/posts/byId/${id}`).then((response) => {
//       setPostObject(response.data);
//     });
//   });
//   return (
//     <div>
//       <div>{postObject.username}</div>
//       <div>{postObject.email}</div>
//       <div>{postObject.password}</div>
//     </div>
//   );
// }

// export default Post;
