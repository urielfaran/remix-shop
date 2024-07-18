export const idValidator = (value: string) => {
  // Remove any non-digit characters
  value = value.replace(/\D/g, "");

  // Israeli value must be exactly 9 digits
  if (value.length !== 9) {
    return false;
  }

  let sum = 0;

  for (let i = 0; i < 9; i++) {
    let num = parseInt(value[i], 10);

    // Multiply every second digit by 2
    if (i % 2 !== 0) {
      num *= 2;
    }

    // If the result is greater than 9, sum the digits of the result
    if (num > 9) {
      num = Math.floor(num / 10) + (num % 10);
    }

    sum += num;
  }

  // ID is valid if sum is divisible by 10
  return sum % 10 === 0;
};
