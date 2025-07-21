import isNumber from "./";

const testMessage = "TEST MESSAGE";
const validator = isNumber(testMessage);

describe("isNumber validator", () => {
  it("should return undefined when provided a numeric string", () => {
    const results = validator("1234");
    expect(results).toBeUndefined();
  });

  it("should return undefined when provided a negative numeric string", () => {
    const results = validator("-1234");
    expect(results).toBeUndefined();
  });

  it("should return undefined when provided zero", () => {
    const results = validator("0");
    expect(results).toBeUndefined();
  });

  it("should return an error message when provided no characters", () => {
    const results = validator("");
    expect(results).toBe(testMessage);
  });

  it("should return an error message  when provided non numeric characters", () => {
    const results = validator("12abc34");
    expect(results).toBe(testMessage);
  });
});
