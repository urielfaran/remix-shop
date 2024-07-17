import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@remix-run/react";
import { Loader2Icon } from "lucide-react";
import { useRemixForm } from "remix-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as ShadForm,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { loginFormSchema } from "~/schemas/loginSchema";

export type LoginFormFields = z.infer<typeof loginFormSchema>;
export const loginFormResolver = zodResolver(loginFormSchema);

function LoginForm() {
  const defaultValues = {
    email: "",
    password: "",
  };

  const form = useRemixForm<LoginFormFields>({
    resolver: loginFormResolver,
    submitConfig: {
      method: "POST",
    },
    defaultValues: defaultValues,
  });

  const { isSubmitting, errors } = form.formState;
  return (
    <>
      <h2 className="text-2xl text-center">
        <i>Login</i>
      </h2>
      <ShadForm {...form}>
        <Form
          className="flex h-full flex-col justify-center gap-4"
          onSubmit={form.handleSubmit}
        >
          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem id={field.name} className="flex flex-col">
                <FormLabel>{"email"}</FormLabel>
                <Input
                  placeholder="email..."
                  {...field}
                  onChange={field.onChange}
                  className="flex-grow"
                  value={field.value ? field.value.toString() : ""}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"password"}
            render={({ field }) => (
              <FormItem id={field.name} className="flex flex-col">
                <FormLabel>{"password"}</FormLabel>
                <Input
                  {...field}
                  placeholder="password..."
                  onChange={field.onChange}
                  className="flex-grow"
                  type="password"
                  value={field.value ? field.value.toString() : ""}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="mt-2 text-xs text-red-500">
            {errors.root?.message ? errors.root.message : null}
          </p>

          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                {"loging in"}
                <span>
                  <Loader2Icon className="animate-spin" />
                </span>
              </span>
            ) : (
              "log-in"
            )}
          </Button>
        </Form>
      </ShadForm>
    </>
  );
}

export default LoginForm;
