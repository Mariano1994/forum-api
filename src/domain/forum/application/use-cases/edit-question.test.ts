import { beforeEach, describe, expect, it } from "vitest";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeQuestion } from "../../../../../test/factories/make-question";
import { InMemoryQuestionsRepositories } from "../../../../../test/respositories/in-memory-questions-repositories";
import { EditQuestionUseCase } from "./edit-question";

let inMemoryQuestionRepository: InMemoryQuestionsRepositories;
let sut: EditQuestionUseCase;

describe("Edit question use case", () => {
	beforeEach(() => {
		inMemoryQuestionRepository = new InMemoryQuestionsRepositories();
		sut = new EditQuestionUseCase(inMemoryQuestionRepository);
	});

	it("should edit a question", async () => {
		const newQuestion = makeQuestion(
			{ authorId: new UniqueEntityId("my-question") },
			new UniqueEntityId("question-1"),
		);

		await inMemoryQuestionRepository.create(newQuestion);

		await sut.handler({
			authorId: "my-question",
			questionId: newQuestion.id.toValue(),
			title: "new title",
			content: "Edited content",
		});

		expect(inMemoryQuestionRepository?.items[0]).toMatchObject({
			title: "new title",
			content: "Edited content",
		});
	});

	it("should not be able to edit question form another author", async () => {
		const newQuestion = makeQuestion(
			{ authorId: new UniqueEntityId("my-question") },
			new UniqueEntityId("question-1"),
		);

		await inMemoryQuestionRepository.create(newQuestion);

		expect(async () => {
			await sut.handler({
				authorId: "my-question-23",
				questionId: newQuestion.id.toValue(),
				title: "new title",
				content: "Edited content",
			});
		}).rejects.toBeInstanceOf(Error);
	});
});
