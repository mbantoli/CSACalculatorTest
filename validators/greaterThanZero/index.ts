const greaterThanZero = (message: string) => (value: string) => {
  let errorMessage;

  if (typeof value === "undefined" || value === "") {
    return;
  }

  const number = Number.parseFloat(value.replace(/[%,$]{0,1}/gi, ""));

  if (Number.isNaN(number)) {
    errorMessage = message;
  } else {
    if (number <= 0) {
      errorMessage = message;
    }
  }

  return errorMessage;
};

export default greaterThanZero;
