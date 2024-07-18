export function setSearchParamsString(
  searchParams: URLSearchParams,
  changes: Record<string, string | number | undefined>
) {
  const newSearchParams = new URLSearchParams(searchParams);

  for (const [key, value] of Object.entries(changes)) {
    if (value === undefined) {
      newSearchParams.delete(key);
      continue;
    }

    newSearchParams.set(key, String(value));
  }

  // Print string manually to avoid over-encoding the URL
  // Browsers are ok with $ nowadays
  return Array.from(newSearchParams.entries())
    .map(([key, value]) =>
      value ? `${key}=${encodeURIComponent(value)}` : key
    )
    .join("&");
}

export function isValidMMYYYY(dateStr: string): boolean {
  // Regular expression to match mm/yyyy format
  const regex = /^(0[1-9]|1[0-2])\d{2}$/;

  // Test the string against the regular expression
  if (!regex.test(dateStr)) {
    return false;
  }

  // Extract the month and year
  const month = Number(dateStr.slice(0, 2)); // Extracts "12"
  const year = Number(dateStr.slice(2)); // Extracts "25"

  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-based

  // Validate the year range
  if (year < currentYear || year > currentYear + 8) {
    return false;
  }

  // If the year is the current year, ensure the month is not in the past
  if (year === currentYear && month < currentMonth + 3) {
    return false;
  }

  return true;
}
