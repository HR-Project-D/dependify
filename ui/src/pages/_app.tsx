import "@/styles/globals.css";
import "@/styles/cmdk.css";

import type { AppProps } from "next/app";

import { UserContext, initialUserState, userReducer } from "@/state/User";
import { useReducer } from "react";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }: AppProps) {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  return (
    <ThemeProvider attribute='class' disableTransitionOnChange defaultTheme='system'>
      <UserContext.Provider value={{ state: userState, dispatch: userDispatch }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </ThemeProvider>
  );
}
