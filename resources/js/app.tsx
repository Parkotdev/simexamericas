import "../css/app.css";
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

const appName = window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
  title: () => appName,
  resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob("./pages/**/*.tsx")),
  setup({ el, App, props }) {
    createRoot(el).render(
      <Provider store={store}>
        <CssBaseline />

        <ServiceProvider {...props}>
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
