const isRequiredArray = (message: string, max: number) => (
  value: Array<string>
) => {
  let errorMessage;

  if (!value || value.length < 1 || value.length > max) {
    errorMessage = message;
  }

  return errorMessage;
};

export default isRequiredArray;
