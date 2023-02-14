/* eslint-disable @typescript-eslint/no-explicit-any */
import "../css/app.scss";
import "./bootstrap";
import "./i18n";

import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Provider } from "react-redux";
import { ProSidebarProvider } from "react-pro-sidebar";
import { CssBaseline } from "@mui/material";
import { store } from "./context/app/store";
import { ServiceProvider } from "./context";
import { Layout } from "./components";

const appName = window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
  title: () => appName,
  // resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob("./pages/**/*.tsx")),
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.tsx", { eager: true });
    const page: any = pages[`./Pages/${name}.tsx`];
    page.default.layout = name === "auth/Login" ? undefined : (page: any) => <Layout>{page}</Layout>;
    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <Provider store={store}>
        <CssBaseline />

        <ServiceProvider>
          <ProSidebarProvider>
            <App {...props} />
          </ProSidebarProvider>
        </ServiceProvider>
      </Provider>
    );
  },
  progress: {
    color: "#4B5563"
  }
});
