export const getLocalStorage = (name: string) => {
  const storage = localStorage.getItem(name);
  if (storage) return JSON.parse(storage);
};

export const setLocalStorage = (name: string, value: any) => {
  localStorage.setItem(name, JSON.stringify(value));
};

export const removeLocalStorage = (name: string) => {
  localStorage.removeItem(name);
};
