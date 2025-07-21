import notEmpty from ".";

const testMessage = "TEST MESSAGE";
const validator = notEmpty(testMessage);

describe("notEmpty validator", () => {
  it("should return undefined when provided and array with string", () => {
    const results = validator(["first"]);
    expect(results).toBeUndefined();
  });

  it("should return an error message when provided an array", () => {
    const results = validator([]);
    expect(results).toBe(testMessage);
  });

  it("should return an error message when provided an empty string in an array", () => {
    const results = validator([""]);
    expect(results).toBe(testMessage);
  });

  it("should return an error message when provided an null in an array", () => {
    const results = validator(["first", null]);
    expect(results).toBe(testMessage);
  });

  it("should return an error message when not provided an array", () => {
    //@ts-ignore
    const results = validator("");
    expect(results).toBe(testMessage);
  });
});
