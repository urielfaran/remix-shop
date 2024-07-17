import { LoginFormFields } from "~/components/forms/LoginForm";
import { prisma } from "./prisma.server";
import bcrypt from "bcryptjs";
import { authSessionStorage } from "./session.server";
import { redirect } from "@remix-run/react";

export const authSessionKey = "userId";

export async function loginAuthentication({
  email,
  password,
}: LoginFormFields) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    const errors = {
      errors: { root: { message: `username_or_password_incorrect` } },
    };
    return { session: null, errors };
  }
  return { erros: {}, user };
}

export async function getUserId(request: Request) {
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie"),
  );
  const userId = authSession.get(authSessionKey);
  if (!userId) return null;
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw redirect("/", {
      headers: {
        "set-cookie": await authSessionStorage.destroySession(authSession),
      },
    });
  }
  return user.id;
}

export async function logout({
  request,
  redirectTo = "/login",
}: {
  request: Request;
  redirectTo?: string;
}) {
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie"),
  );
  throw redirect(redirectTo, {
    headers: {
      "set-cookie": await authSessionStorage.destroySession(authSession),
    },
  });
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        name: true,
        shoppingList: {
          include: {
            products: true,
            user: true,
          }
        }
      }
    });
    return user;
  } catch {
    throw logout({ request });
  }
}

export async function requireAuth(request: Request) {
  const user = await getUser(request);
  if (!user) {
    throw redirect('/login');
  }
  return user;
}
export async function requireAnonymous(request: Request) {
  const user = await getUser(request);
  if (user) {
    throw redirect("/");
  }
}

export async function createUserSession(userId: string, redirectTo: string) {
  const authSession = await authSessionStorage.getSession();
  authSession.set(authSessionKey, userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await authSessionStorage.commitSession(authSession),
    },
  });
}
