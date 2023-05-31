import "@/styles/globals.css";
import "@/styles/cmdk.css";

import type { AppProps } from "next/app";

import { UserContext, initialUserState, userReducer } from "@/state/User";
import { UIContext, initialUIState, UIReducer } from "@/state/UI";
import { useEffect, useReducer } from "react";
import { ThemeProvider } from "next-themes";
import { AuthService } from "@/services/AuthService";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [uiState, uiDispatch] = useReducer(UIReducer, initialUIState);

  const router = useRouter();

  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      defaultTheme="dark"
    >
      <UIContext.Provider value={{ state: uiState, dispatch: uiDispatch }}>
        <UserContext.Provider
          value={{ state: userState, dispatch: userDispatch }}
        >
          <Component {...pageProps} />
        </UserContext.Provider>
      </UIContext.Provider>
    </ThemeProvider>
  );
}
