const notEmpty = (message: string) => (value: Array<string | number>) => {
  let errorMessage;

  if (!Array.isArray(value)) {
    errorMessage = message;
  } else if (value.length === 0){
    errorMessage = message;
  } else {
    value.forEach(item => {
      if (!item && item !== 0) {
        errorMessage = message;
      }
    });
  }

  return errorMessage;
};

export default notEmpty;
