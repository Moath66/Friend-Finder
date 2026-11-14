import { names } from "./data.js";

async function loadNames() {
  return names;
}

export async function findMatchingNames(findName, loadData = loadNames) {
  if (typeof findName !== "string") {
    throw new TypeError("findName must be a string");
  }

  const match = findName.trim().toLowerCase();

  if (!match) {
    return [];
  }

  const list = await loadData();

  return list.filter((term) => term.name.toLowerCase().includes(match));
}
