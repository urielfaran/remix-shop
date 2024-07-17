import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { getValidatedFormData } from "remix-hook-form";
import LoginForm, {
  LoginFormFields,
  loginFormResolver,
} from "~/components/forms/LoginForm";
import { ModeToggle } from "~/components/headerComponents/ModeToggle";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import {
  createUserSession,
  loginAuthentication,
  requireAnonymous,
} from "~/utils/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAnonymous(request);
  return {};
}
function login() {
  return (
    <div className="default flex h-screen w-screen flex-col">
      <header className="flex flex-row justify-between gap-4 p-4">
        <ModeToggle />
      </header>
      <Separator />
      <div className="flex h-full items-center justify-center">
        <Card className="flex flex-col gap-8 p-10 border-2 bg-transparent">
          <LoginForm />
        </Card>
      </div>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<LoginFormFields>(request, loginFormResolver);

  if (errors) {
    return json({ errors, defaultValues }, { status: 400 });
  }

  const { email, password } = data;

  const { errors: loginErrors, user } = await loginAuthentication({
    email,
    password,
  });

  if (loginErrors)
    return json(
      {
        ...loginErrors,
        defaultValues: { email, password },
      },
      { status: 403 }
    );
  return await createUserSession(user.id, "/");
}

export default login;
