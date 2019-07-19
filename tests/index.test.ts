import { g, mt, j, p, pj, m, parents, numbers } from "./dataset";
import { reverseMatrix } from "../utils";
import kahn from "../index";

const familyResult = new Set([g, mt, j, p, pj, m]);

test("kahn on family", () => {
  expect(kahn(parents)).toEqual(familyResult);
});

test("reverse matrix on family", () => {
  expect(kahn(reverseMatrix(parents), { type: "children" })).toEqual(
    familyResult
  );
});

const numbersResult = new Set(["5", "3", "7", "11", "8", "2", "10", "9"]);

test("kahn on numbers", () => {
  expect(kahn(numbers)).toEqual(numbersResult);
});

test("reverse matrix on numbers", () => {
  expect(kahn(reverseMatrix(numbers), { type: "children" })).toEqual(
    numbersResult
  );
});

const mapWithLoop = new Map(numbers);
mapWithLoop.set("5", new Set(["10"]));

test("kahn on loop", () => {
  expect(() => kahn(mapWithLoop)).toThrow();
});
