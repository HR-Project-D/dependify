// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import { useUserContext } from "@/state/User";

import { AuthService } from "@/services/AuthService";
import { useUserContext } from "@/state/User";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// const withAuth = (WrappedComponent: React.ComponentType) => {
//   const AuthenticatedComponent: React.FC = (props) => {
//     const { state: UserState } = useUserContext();
//     const { isAuthenticated } = UserState;
//     const router = useRouter();

//     useEffect(() => {
//       console.log(UserState.attemptedFetch);
//     }, [UserState.attemptedFetch]);

//     useEffect(() => {
//       console.log("withAuth: ", isAuthenticated);

//       if (UserState.attemptedFetch) {
//         if (!isAuthenticated) {
//           router.push("/login"); // Redirect to login page if not authenticated
//         }
//       }
//     }, [UserState.attemptedFetch, isAuthenticated, router]);

//     if (!isAuthenticated) {
//       return null; // Render nothing until authentication status is checked
//     }

//     return <WrappedComponent {...props} />;
//   };

//   return AuthenticatedComponent;
// };

// export default withAuth;

// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import { useUserContext } from "@/state/User";
// import { AuthService } from "@/services/AuthService";

// const ComponentWrapper = (WrappedComponent: React.ComponentType) => {
//   const AuthenticatedComponent: React.FC = (props) => {
//     const { dispatch: userDispatch } = useUserContext();
//     const router = useRouter();

//     async function handleGetUser() {
//       console.log("handleGetUser");

//       try {
//         const response = await AuthService.getUser();

//         userDispatch({
//           type: "LOGIN",
//           payload: response,
//         });
//       } catch {
//         userDispatch({
//           type: "LOGOUT",
//         });

//         router.push("/login");
//       }

//       userDispatch({
//         type: "FETCH",
//       });
//     }

//     useEffect(() => {
//       handleGetUser();
//     }, []);

//     return <WrappedComponent {...props} />;
//   };

//   return AuthenticatedComponent;
// };

// export default ComponentWrapper;

export function useSession() {
  const { state: UserState, dispatch: userDispatch } = useUserContext();
  const { isAuthenticated } = UserState;
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  async function handleGetUser() {
    console.log("handleGetUser");

    try {
      const response = await AuthService.getUser();

      userDispatch({
        type: "LOGIN",
        payload: response,
      });
    } catch {
      userDispatch({
        type: "LOGOUT",
      });
    }

    userDispatch({
      type: "FETCH",
    });
    setLoading(false);
  }

  useEffect(() => {
    handleGetUser();
  }, []);

  useEffect(() => {
    console.log(UserState.attemptedFetch);

    if (UserState.attemptedFetch && !isAuthenticated) {
      router.push("/login");
    }
  }, [UserState.attemptedFetch, isAuthenticated, router]);

  return loading;
}
