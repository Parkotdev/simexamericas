export const validEmail = (email: string) => {
  return /^([\da-z_\\.-]+)@([\da-z\\.-]+)\.([a-z\\.]{2,6})$/.exec(email);
};
