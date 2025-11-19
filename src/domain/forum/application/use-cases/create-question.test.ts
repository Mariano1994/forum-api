import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryQuestionsRepositories } from "../../../../../test/respositories/in-memory-questions-repositories";
import type { QuestionsRepository } from "../repositories/questions-repository";
import { CreateQuestionUseCase } from "./create-question";

let InMemoryQuestionRepository: QuestionsRepository;
let sut: CreateQuestionUseCase;

describe("Create question use case", async () => {
	beforeEach(() => {
		InMemoryQuestionRepository = new InMemoryQuestionsRepositories();
		sut = new CreateQuestionUseCase(InMemoryQuestionRepository);
	});
	it("should create a question", async () => {
		const { question } = await sut.handler({
			authorId: "1",
			title: "New Question",
			content: "Tell me about javascript",
		});

		expect(question.content).toBeTruthy();
	});
});
