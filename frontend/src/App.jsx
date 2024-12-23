// import React, { Children, useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Navigate, Route, Routes } from "react-router-dom";
// import Auth from "./pages/auth/Auth";
// import Chat from "./pages/chat/Chat";
// import Profile from "./pages/profile/Profile";
// import { useAppStore } from "./store";
// import { api } from "./lib/api";
// import { GET_USER_INFO } from "./utils/constants";

// // const PrivateRoute = ({ children }) => {
// //   const { userInfo } = useAppStore();
// //   const isAuthenticated = !userInfo;
// //   return isAuthenticated ? children : <Navigate to="/auth" />;
// // };

// // const AuthRoute = ({ children }) => {
// //   const { userInfo } = useAppStore();
// //   const isAuthenticated = !userInfo;
// //   return isAuthenticated ? <Navigate to="/chat" /> : children;
// // };

// const PrivateRoute = ({ children }) => {
//   const { userInfo } = useAppStore();
//   const isAuthenticated = !!userInfo; // Check if userInfo exists
//   return isAuthenticated ? children : <Navigate to="/auth" />;
// };

// const AuthRoute = ({ children }) => {
//   const { userInfo } = useAppStore();
//   const isAuthenticated = !!userInfo; // Check if userInfo exists
//   return isAuthenticated ? <Navigate to="/chat" /> : children;
// };


// function App() {
//   const { userInfo, setUserInfo } = useAppStore();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const response = await api.get(GET_USER_INFO, {
//           withCredentials: true,
//         });

//         if (response.status === 200 && response.data.id) {
//           setUserInfo(response.data);
//         } else {
//           setUserInfo(undefined);
//         }
//         console.log({ response });
//       } catch (error) {
//         setUserInfo(undefined);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (!userInfo) {
//       getUserData();
//     } else {
//       setLoading(false);
//     }
//   }, [userInfo, setUserInfo]);

//   if (loading) {
//     return <div>loading..</div>;
//   }

//   return (
//     <>
//       <Routes>
//         <Route
//           path="/auth"
//           element={
//             <AuthRoute>
//               <Auth />
//             </AuthRoute>
//           }
//         />
//         <Route
//           path="/chat"
//           element={
//             <PrivateRoute>
//               <Chat />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             <PrivateRoute>
//               <Profile />
//             </PrivateRoute>
//           }
//         />
//         <Route path="*" element={<Navigate to="/auth" />} />
//       </Routes>
//     </>
//   );
// }

// export default App;




import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";


import Auth from "./pages/auth/Auth";
import Chat from "./pages/chat/Chat";
import Profile from "./pages/profile/Profile";
import { useAppStore } from "./store";
import { api } from "./lib/api";
import { GET_USER_INFO } from "./utils/constants";


const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo; // Check if userInfo exists
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo; // Check if userInfo exists
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};

function App() {


  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await api.get(GET_USER_INFO, { withCredentials: true });

        if (response.status === 200 && response.data?.id) {
          setUserInfo(response.data);
        } else {
          console.warn("Unexpected response format:", response);
          setUserInfo(undefined);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        setUserInfo(undefined);
      } finally {
        setLoading(false);
      }
    };


    if (!userInfo) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

 
  
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
  
    <Routes>
      <Route
        path="/auth"
        element={
          <AuthRoute>
            <Auth />
          </AuthRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/auth" />} />
      
    </Routes>
  

  );
}

export default App;
