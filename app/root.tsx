import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
// import styles from "./tailwind.css"
import "./tailwind.css";
// import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { LoaderFunctionArgs } from "@remix-run/node";
import clsx from "clsx";
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes";
import { themeSessionResolver } from "./utils/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request)
  return {
    theme: getTheme(),
  }
}

  
  export default function AppWithProviders() {
    const data = useLoaderData<typeof loader>()
    return (
      <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
        <App />
      </ThemeProvider>
    )
  }
  
  export function App() {
    const data = useLoaderData<typeof loader>()
    const [theme] = useTheme()
    return (
      <html lang="en" className={clsx(theme)}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
          <Links />
        </head>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    )
  }