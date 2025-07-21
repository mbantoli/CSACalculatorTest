import greaterThanZero from "./";

const testMessage = "TEST MESSAGE";
const validator = greaterThanZero(testMessage);

describe("greaterThanZero validator", () => {
  it("should return undefined when provided a numeric string greater than zero", () => {
    const results = validator("1234");
    expect(results).toBeUndefined();
  });

  it("should return undefined when provided a numeric string greater than zero with a '$' ", () => {
    const results = validator("$1234");
    expect(results).toBeUndefined();
  });

  it("should return undefined when provided a numeric string greater than zero with a '%", () => {
    const results = validator("1234%");
    expect(results).toBeUndefined();
  });

  it("should return undefined when provided an empty string", () => {
    const results = validator("");
    expect(results).toBeUndefined();
  });

  it("should return an error message when provided a '0'", () => {
    const results = validator("0");
    expect(results).toBe(testMessage);
  });

  it("should return an error message when provided a negative numeric string", () => {
    const results = validator("-1");
    expect(results).toBe(testMessage);
  });
});
