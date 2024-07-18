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
  field: ControllerRenderProps<purchaseFormFields, "creditCardNumber">;
}

function CreditCardNumberInput({ field }: CardNumberProps) {
  return (
    <FormControl>
      <InputOTP maxLength={16} {...field}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
          <InputOTPSlot index={6} />
          <InputOTPSlot index={7} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={8} />
          <InputOTPSlot index={9} />
          <InputOTPSlot index={10} />
          <InputOTPSlot index={11} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={12} />
          <InputOTPSlot index={13} />
          <InputOTPSlot index={14} />
          <InputOTPSlot index={15} />
        </InputOTPGroup>
      </InputOTP>
    </FormControl>
  );
}

export default CreditCardNumberInput;
