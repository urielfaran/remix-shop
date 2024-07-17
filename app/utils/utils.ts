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

export async function getRequestField(
  name: string,
  request: Request,
  options: {
    stringified: boolean;
  } = {
    stringified: true,
  },
) {
  // clone the request to get a copy because we have error when trying read the same
  // request twice and to not modify the original request
  const requestClone = request.clone();
  const formData = await requestClone.formData();

  const _action = formData.get(name)?.toString() ?? '';
  // parse the _action from the form data, parsing is needed because the form data is stringified
  return options.stringified ? JSON.parse(_action) : _action;
}