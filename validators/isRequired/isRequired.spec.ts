import isRequired from "./";

const testMessage = "TEST MESSAGE";
const validator = isRequired(testMessage);

describe("isRequired validator", () => {
  it("should return undefined when provided a string", () => {
    const results = validator("string");
    expect(results).toBeUndefined();
  });

  it("should return undefined when provided zero", () => {
    const results = validator(0);
    expect(results).toBeUndefined();
  });

  it("should return an error message when provided an empty string", () => {
    const results = validator("");
    expect(results).toBe(testMessage);
  });

  it("should return an error message when provided undefined", () => {
    //@ts-ignore
    // eslint-disable-next-line no-undefined
    const results = validator(undefined);
    expect(results).toBe(testMessage);
  });
});
