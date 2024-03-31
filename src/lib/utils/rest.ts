export const addHeaders = (token: string) => ({
  Authorization: `Extension ${token}`,
  'Client-Id': import.meta.env.VITE_EXTENSION_CLIENT_ID,
});

const serialize = (obj: Record<string, string>) =>
  Object.entries(obj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&');

export const simpleGETClient = async <T>({
  url = import.meta.env.VITE_API_URL,
  endpoint,
  options,
}): Promise<T> => {
  try {
    const response = await fetch(
      `${url}${endpoint}?${serialize(options.query)}`,
      {
        headers: options.headers,
      },
    );
    if (response.ok) {
      const result = await response.json();
      return result;
    }
    throw new Error(response.statusText);
  } catch (err) {
    throw new Error(err);
  }
};
