import { ControllerRenderProps } from "react-hook-form";
import { purchaseFormFields } from "../forms/purchaseForm";
import { FormControl } from "../ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "../ui/input-otp";


interface CardNumberProps {
    field: ControllerRenderProps<purchaseFormFields, "creditCardExpiration">;

}

function CreditCardExpirationInput({ field }: CardNumberProps) {
  return (
    <FormControl>
      <InputOTP maxLength={4} {...field}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        {/* <InputOTPSeparator /> */}
        <p>/</p>
        <InputOTPGroup>
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    </FormControl>
  );
}

export default CreditCardExpirationInput;
