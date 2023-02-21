import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useParams,
} from "@remix-run/react";

import { defaultLocale, langCookie, supportedLocales } from "./services/i18n";
import Footer from "./components/Footer";
import Header from "./components/Header";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request, params }: LoaderArgs) {
  // if home page url without lang
  if(new URL(request.url).pathname === '/') {
    //check if langCookie cookie exists
    const headerCookie = request.headers.get("Cookie")
    if(headerCookie) {
      const cookieValue = await langCookie.parse(headerCookie);
      // if cookieValue is a supported locale, redirect to it
      if(supportedLocales.includes(cookieValue)) {
        return redirect(`/${cookieValue}`, 302);
      }
    }
    //else redirect to default language     
    return redirect(`/${defaultLocale}`, 302);
  }

  //if page with lang param and supported lang, we want to create a cookie
  if(params?.lang && supportedLocales.includes(params?.lang)) {
    const lang = params?.lang
    return json(
      {  },
      {
        headers: {
          "Set-Cookie": await langCookie.serialize(lang)
        }
      }
    )
  }

  // else throw 404
  throw new Response("Not Found", {
    status: 404,
  });
}

export default function App() {
  const params = useParams()
  console.log('root App', params.lang)
  return (
    <html lang={params.lang}>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Outlet />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
