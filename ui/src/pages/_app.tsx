import "@/styles/globals.css";
import "@/styles/cmdk.css";

import type { AppProps } from "next/app";
import { UserContext, initialUserState, userReducer } from "@/state/User";
import { useReducer } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  return (
    <UserContext.Provider value={{ state: userState, dispatch: userDispatch }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
