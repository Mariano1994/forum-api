import { describe, expect, it } from "vitest";
import { Slug } from "./slug";

describe("Slug normalization", () => {
	it("should create a slug from a text", () => {
		const slug = Slug.createFromText("Exemple Title");

		expect(slug.value).toEqual("exemple-title");
	});
});
