import HomeLayout from "@/layouts/home";
import { store } from "@/store/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import React, { Suspense } from "react";
import Spinner from "@/components/loader/spinner";
import ApiErrorPrompt from "@/utils/ApiPrompt";
import ApiSuccess from "@/utils/ApiSuccess";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ApiErrorPrompt />
      <ApiSuccess />
      <HomeLayout>
        <Component {...pageProps} />
      </HomeLayout>
    </Provider>
  );
}
