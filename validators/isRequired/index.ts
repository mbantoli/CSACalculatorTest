const isRequired = (message: string) => (value: string | number) => {
  let errorMessage;

  if (!value && value !== 0) {
    errorMessage = message;
  }

  return errorMessage;
};

export default isRequired;
