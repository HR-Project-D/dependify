import { useUserContext } from "@/state/User";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useSession() {
  const router = useRouter();
  const { state: userState, dispatch: userDispatch } = useUserContext();

  const [setupCompleted, setSetupCompleted] = useState(false);

  useEffect(() => {
    router.push("/setup");
  }, [router]);

  useEffect(() => {
    if (setupCompleted && !userState.isAuthenticated) {
      router.push("/login");
    }
  }, [router, userState.isAuthenticated]);
}
