import { describe, expect, it } from "vitest";
import { WatchedList } from "./watched-list";

class NumberWatchedList extends WatchedList<number> {
	compareItems(a: number, b: number) {
		return a === b;
	}
}

describe("watched list", () => {
	it(" should be able to create a watched list with initial items", () => {
		const list = new NumberWatchedList([1, 2, 4, 5]);
		expect(list.currentItems).toHaveLength(4);
	});

	it(" should be able to add new items to the list", () => {
		const list = new NumberWatchedList([1, 2, 4, 5]);

		list.add(6);
		expect(list.currentItems).toHaveLength(5);
		expect(list.getNewItems()).toEqual([6]);
	});

	it(" should be able to remove items from the list", () => {
		const list = new NumberWatchedList([1, 2, 4, 5]);

		list.remove(4);
		expect(list.currentItems).toHaveLength(3);
		expect(list.getRemovedItems()).toEqual([4]);
	});

	it(" should be able to add an item even if it was removed before ", () => {
		const list = new NumberWatchedList([1, 2, 4, 5]);

		list.remove(4);
		list.add(4);
		expect(list.currentItems).toHaveLength(4);
		expect(list.getRemovedItems()).toEqual([]);
		expect(list.getNewItems()).toEqual([]);
	});

	it(" should be able to remove an item even if it was add before ", () => {
		const list = new NumberWatchedList([1, 2, 4, 5]);

		list.add(4);
		list.remove(4);
		expect(list.currentItems).toHaveLength(3);
		expect(list.getRemovedItems()).toEqual([4]);
		expect(list.getNewItems()).toEqual([]);
	});

	it(" should be able to update watched list items ", () => {
		const list = new NumberWatchedList([1, 2, 4, 5]);

		list.update([3, 4, 6]);

		expect(list.getRemovedItems()).toEqual([1, 2, 5]);
		expect(list.getNewItems()).toEqual([3, 6]);
	});
});
