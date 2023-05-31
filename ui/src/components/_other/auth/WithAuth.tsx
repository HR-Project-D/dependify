import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUserContext } from "@/state/User";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent: React.FC = (props) => {
    const { state: UserState } = useUserContext();
    const { isAuthenticated } = UserState;
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login"); // Redirect to login page if not authenticated
      }
    }, [UserState, isAuthenticated, router]);

    if (!isAuthenticated) {
      return null; // Render nothing until authentication status is checked
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
