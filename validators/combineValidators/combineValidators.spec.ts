import combineValidators from "./";
import isRequired from "../isRequired";

const testMessageOne = "One";
const testMessageTwo = "Two";

describe("combineValidators", () => {
  it("should return message of first validation to fail", () => {
    const validatorOne = combineValidators([
      isRequired(testMessageOne),
      isRequired(testMessageTwo)
    ]);
    const validatorTwo = combineValidators([
      isRequired(testMessageTwo),
      isRequired(testMessageOne)
    ]);

    const resultsOne = validatorOne("");
    const resultsTwo = validatorTwo("");

    expect(resultsOne).toBe(testMessageOne);
    expect(resultsTwo).toBe(testMessageTwo);
  });

  it("should return undefined if all validators pass", () => {
    const validator = combineValidators([
      isRequired(testMessageOne),
      isRequired(testMessageTwo)
    ]);

    const results = validator("value");
    expect(results).toBeUndefined();
  });
});
