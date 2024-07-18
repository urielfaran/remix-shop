import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Link } from "@remix-run/react";
import { Loader2Icon } from "lucide-react";
import { useRemixForm } from "remix-hook-form";
import { z } from "zod";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as ShadForm,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { purchaseFormSchema } from "~/schemas/purchaeSchema";
import CreditCardNumberInput from "../purchase-components/CreditCardNumberInput";
import CreditCardExpirationInput from "../purchase-components/CreditCardExpirationInput";

export type purchaseFormFields = z.infer<typeof purchaseFormSchema>;
export const purchaseFormResolver = zodResolver(purchaseFormSchema);

function PurchaseForm() {
  const defaultValues = {
    id: "",
    creditCardNumber: "",
    creditCardExpiration: "",
    cvv: undefined,
  };

  const form = useRemixForm<purchaseFormFields>({
    resolver: purchaseFormResolver,
    submitConfig: {
      method: "POST",
    },
    defaultValues: defaultValues,
  });

  const { isSubmitting, errors } = form.formState;
  return (
    <>
      <h2 className="text-2xl text-center">
        <i>purchase</i>
      </h2>
      <ShadForm {...form}>
        <Form
          className="flex h-full flex-col justify-center gap-4"
          onSubmit={form.handleSubmit}
        >
          <FormField
            control={form.control}
            name={"id"}
            render={({ field }) => (
              <FormItem id={field.name} className="flex flex-col">
                <FormLabel>{"id"}</FormLabel>
                <Input
                  placeholder="id..."
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
            name={"creditCardNumber"}
            render={({ field }) => (
              <FormItem id={field.name} className="flex flex-col">
                <FormLabel>{"credit card number"}</FormLabel>
                <CreditCardNumberInput field={field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"creditCardExpiration"}
            render={({ field }) => (
              <FormItem id={field.name} className="flex flex-col">
                <FormLabel>{"credit card expiration"}</FormLabel>
                <CreditCardExpirationInput field={field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"cvv"}
            render={({ field }) => (
              <FormItem id={field.name} className="flex flex-col">
                <FormLabel>{"cvv"}</FormLabel>
                <Input
                  {...field}
                  placeholder="cvv..."
                  onChange={field.onChange}
                  className="flex-grow"
                  type="text"
                  value={field.value ? field.value.toString() : ""}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="mt-2 text-xs text-red-500">
            {errors.root?.message ? errors.root.message : null}
          </p>
          <div className="flex justify-around">
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  {"loading..."}
                  <span>
                    <Loader2Icon className="animate-spin" />
                  </span>
                </span>
              ) : (
                "Buy Now"
              )}
            </Button>
            <Link to={"/"} className={buttonVariants({ variant: "outline" })}>
              Cancel
            </Link>
          </div>
        </Form>
      </ShadForm>
    </>
  );
}

export default PurchaseForm;
