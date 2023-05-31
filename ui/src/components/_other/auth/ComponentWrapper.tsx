import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUserContext } from "@/state/User";
import { AuthService } from "@/services/AuthService";

const ComponentWrapper = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent: React.FC = (props) => {
    const { state: userState, dispatch: userDispatch } = useUserContext();
    const router = useRouter();

    async function handleGetUser() {
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

        router.push("/login");
      }

      userDispatch({
        type: "FETCH",
      });
    }

    useEffect(() => {
      if (!userState.user) {
        handleGetUser();
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default ComponentWrapper;
