export type ValidatorType = (value: string) => string | undefined;

const combineValidators = (validators: Array<ValidatorType>) => (
  value: string
) => {
  const errorMessages: Array<string> = [];

  validators.forEach(validator => {
    const validatorErrorMessage = validator(value);

    if (validatorErrorMessage) {
      errorMessages.push(validatorErrorMessage);
    }
  });

  return errorMessages[0];
};

export default combineValidators;
