import { beforeEach, describe, expect, it } from "vitest";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { InMemoryAnswerRepositoreis } from "../../../../../test/respositories/in-memory-answer-repositories";
import { ListQuestionAnswersUseCase } from "./list-question-anwsers";

let inMemoryAnswerRepository: InMemoryAnswerRepositoreis;
let sut: ListQuestionAnswersUseCase;

describe("List question answers use case", () => {
	beforeEach(() => {
		inMemoryAnswerRepository = new InMemoryAnswerRepositoreis();
		sut = new ListQuestionAnswersUseCase(inMemoryAnswerRepository);
	});

	it("should list answers from a question", async () => {
		await inMemoryAnswerRepository.create(
			makeAnswer({ questionId: new UniqueEntityId("question-1") }),
		);

		await inMemoryAnswerRepository.create(
			makeAnswer({ questionId: new UniqueEntityId("question-1") }),
		);

		await inMemoryAnswerRepository.create(
			makeAnswer({ questionId: new UniqueEntityId("question-1") }),
		);

		const result = await sut.handler({
			questionId: "question-1",
			page: 1,
		});

		expect(result.value?.answers).toHaveLength(3);
	});

	it("should be able to list paginated answer questions", async () => {
		for (let i = 1; i <= 25; i++) {
			await inMemoryAnswerRepository.create(
				makeAnswer({ questionId: new UniqueEntityId("question-1") }),
			);
		}

		const result = await sut.handler({
			questionId: "question-1",
			page: 2,
		});

		expect(result.value?.answers).toHaveLength(5);
	});
});
