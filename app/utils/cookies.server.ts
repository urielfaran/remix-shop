import { createCookie } from "@remix-run/node"; // or cloudflare/deno

export const shoppingListCookie = createCookie("buyList", {
  // These are defaults for this cookie.
  path: "/",
  sameSite: "lax",
  httpOnly: true,
  secure: true,
  expires: new Date(Date.now() + 60_000),
  maxAge: 60,
});
