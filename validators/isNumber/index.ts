const isNumber = (message: string) => (value: string): string | undefined => {
  let errorMessage;

  const regex = /^(-){0,1}[0-9.]+$/gi;
  const isValid = regex.exec(value);

  //valid characters
  if (!value || typeof value !== "string" || !isValid) {
    errorMessage = message;
  } else {
    //valid number
    const number = Number.parseFloat(value);
    if (Number.isNaN(number)) {
      errorMessage = message;
    }
  }

  return errorMessage;
};

export default isNumber;
