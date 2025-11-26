import { beforeEach, describe, expect, it } from "vitest";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeQuestion } from "../../../../../test/factories/make-question";
import { InMemoryQuestionsRepositories } from "../../../../../test/respositories/in-memory-questions-repositories";
import { DeleteQuestionUseCase } from "./delete-question";
import { NotAlowwedError } from "./errors/not-allowed-error";

let inMemoryQuestionRepository: InMemoryQuestionsRepositories;
let sut: DeleteQuestionUseCase;

describe("Delete question use case", () => {
	beforeEach(() => {
		inMemoryQuestionRepository = new InMemoryQuestionsRepositories();
		sut = new DeleteQuestionUseCase(inMemoryQuestionRepository);
	});

	it("should delete a question", async () => {
		const newQuestion = makeQuestion(
			{ authorId: new UniqueEntityId("my-question") },
			new UniqueEntityId("question-1"),
		);

		await inMemoryQuestionRepository.create(newQuestion);

		await sut.handler({
			authorId: newQuestion.authorId.toString(),
			questionId: "question-1",
		});

		expect(inMemoryQuestionRepository.items).toHaveLength(0);
	});

	it("should not be able to delete question from others authors", async () => {
		const newQuestion = makeQuestion(
			{ authorId: new UniqueEntityId("my-question") },
			new UniqueEntityId("question-1"),
		);

		await inMemoryQuestionRepository.create(newQuestion);
		const result = await sut.handler({
			authorId: "question-from-other-author",
			questionId: "question-1",
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAlowwedError);
	});
});
