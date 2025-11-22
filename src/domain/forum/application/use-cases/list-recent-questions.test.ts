import { beforeEach, describe, expect, it } from "vitest";
import { makeQuestion } from "../../../../../test/factories/make-question";
import { InMemoryQuestionsRepositories } from "../../../../../test/respositories/in-memory-questions-repositories";
import { ListRecentsQuestionsUseCase } from "./list-recent-questions";

let inMemoryQuestionsRepository: InMemoryQuestionsRepositories;
let sut: ListRecentsQuestionsUseCase;

describe("List recents question use casa", () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepositories();
		sut = new ListRecentsQuestionsUseCase(inMemoryQuestionsRepository);
	});

	it("should list recent question", async () => {
		await inMemoryQuestionsRepository.create(
			makeQuestion({ createdAt: new Date(2025, 0, 20) }),
		);
		await inMemoryQuestionsRepository.create(
			makeQuestion({ createdAt: new Date(2025, 0, 18) }),
		);
		await inMemoryQuestionsRepository.create(
			makeQuestion({ createdAt: new Date(2025, 0, 25) }),
		);
		await inMemoryQuestionsRepository.create(
			makeQuestion({ createdAt: new Date(2025, 0, 22) }),
		);
		await inMemoryQuestionsRepository.create(
			makeQuestion({ createdAt: new Date(2025, 0, 28) }),
		);
		await sut.handler({ page: 1 });
		expect(inMemoryQuestionsRepository.items[0].createdAt).toEqual(
			new Date(2025, 0, 28),
		);
		expect(inMemoryQuestionsRepository.items[1].createdAt).toEqual(
			new Date(2025, 0, 25),
		);
		expect(inMemoryQuestionsRepository.items[2].createdAt).toEqual(
			new Date(2025, 0, 22),
		);
	});

	it("should be able to list oaginated recent questions", async () => {
		for (let i = 1; i <= 25; i++) {
			await inMemoryQuestionsRepository.create(makeQuestion());
		}

		const { questions } = await sut.handler({
			page: 2,
		});

		expect(questions).toHaveLength(5);
	});
});
