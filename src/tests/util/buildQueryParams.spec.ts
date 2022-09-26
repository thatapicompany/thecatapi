import { buildQueryParams } from "../../util/buildQueryParams";

type Mapper = (x: Record<string, any>) => [string, any][];
const mapper: Mapper = (x) =>
  Object.entries(x).map(([key, value]) => {
    if (typeof value === "number") {
      return [key, value * 2];
    }
    return [key, value];
  });

describe("buildQueryParams", function () {
  it("should return empty string when called with an empty object", () => {
    expect(buildQueryParams({})).toEqual("");
  });
  it("should return empty string when called with an empty object and a mapper", () => {
    expect(buildQueryParams({}, mapper)).toEqual("");
  });
  it("should return build a string of query params", () => {
    expect(
      buildQueryParams({
        a: 1,
        b: 2,
        c: "hello",
        d: [false, true],
        e: ["high", "low"],
      })
    ).toEqual("?a=1&b=2&c=hello&d=false,true&e=high,low");
  });
  it("should return build a string of query params with a mapper", () => {
    expect(
      buildQueryParams(
        {
          a: 1,
          b: 2,
          c: "hello",
          d: [false, true],
          e: ["high", "low"],
        },
        mapper
      )
    ).toEqual("?a=2&b=4&c=hello&d=false,true&e=high,low");
  });
});
