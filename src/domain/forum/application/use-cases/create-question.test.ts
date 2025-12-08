import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryQuestionsRepositories } from "../../../../../test/respositories/in-memory-questions-repositories";
import { CreateQuestionUseCase } from "./create-question";

let InMemoryQuestionRepository: InMemoryQuestionsRepositories;
let sut: CreateQuestionUseCase;

describe("Create question use case", async () => {
	beforeEach(() => {
		InMemoryQuestionRepository = new InMemoryQuestionsRepositories();
		sut = new CreateQuestionUseCase(InMemoryQuestionRepository);
	});

	it("should create a question", async () => {
		const result = await sut.handler({
			authorId: "1",
			title: "New Question",
			content: "Tell me about javascript",
			attachmentsIds: ["1", "2"],
		});
		expect(result.isRight()).toBe(true);
		expect(InMemoryQuestionRepository?.items[0]).toEqual(
			result.value?.question,
		);
		expect(InMemoryQuestionRepository?.items[0].attachments).toHaveLength(2);
	});
});
