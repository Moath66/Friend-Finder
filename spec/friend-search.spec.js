import { findMatchingNames } from "../src/js/friend-search.js";

describe("findMatchingNames", () => {
  it("when user enter matching name", async () => {
    const result = await findMatchingNames("Moath");

    expect(result).toEqual([{ id: 1, name: "Moath Mohamed" }]);
  });

  it("deal with case-insensitive search", async () => {
    const result = await findMatchingNames("moath mohamed");

    expect(result).toEqual([{ id: 1, name: "Moath Mohamed" }]);
  });

  it(" multiple matching Names", async () => {
    const result = await findMatchingNames("Ahmed");

    expect(result).toEqual([
      { id: 2, name: "Ahmed Hassan" },
      { id: 4, name: "Omar Ahmed" },
      { id: 5, name: "Ahmed Ali" },
    ]);
  });

  it(" when user enter name that not existed in the array", async () => {
    const result = await findMatchingNames("Nonexistent Name");

    expect(result).toEqual([]);
  });

  it("when user enter space", async () => {
    const result = await findMatchingNames("  ");
    expect(result).toEqual([]);
  });

  it("when user enter invalid input", async () => {
    const result = await expectAsync(
      findMatchingNames(563),
    ).toBeRejectedWithError(TypeError, "findName must be a string");
  });

  it("deal with rejected Promise from loadData", async () => {
    const loadData = () => Promise.reject(new Error("Failed to load data"));
    await expectAsync(findMatchingNames("Moath", loadData)).toBeRejectedWithError(
      Error,
      "Failed to load data",
    );
  });
});
