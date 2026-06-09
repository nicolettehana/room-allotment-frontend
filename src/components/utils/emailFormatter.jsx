export const decodeEmail = (email) => {
  if (!email) return;

  // Replace [at] with @
  let result = email?.split("[at]");
  result = result.join("@");

  // Replace [dot] with .
  result = result?.split("[dot]");
  result = result.join(".");

  return result;
};

export const encodeEmail = (email) => {
  // Replace "@" with [at]
  let result = email?.split("@");
  result = result.join("[at]");

  // Replace "." with [dot]
  result = result?.split(".");
  result = result.join("[dot]");

  return result;
};
