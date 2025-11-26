import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryAnswerRepositoreis } from "../../../../../test/respositories/in-memory-answer-repositories";
import { AnswerQuestionUseCase } from "./answer-question";

let InMemoryAnswerRepository: InMemoryAnswerRepositoreis;
let sut: AnswerQuestionUseCase;

describe("Answer question use case", async () => {
	beforeEach(() => {
		InMemoryAnswerRepository = new InMemoryAnswerRepositoreis();
		sut = new AnswerQuestionUseCase(InMemoryAnswerRepository);
	});

	it("should be able to create an Answer", async () => {
		const resutl = await sut.handler({
			instructorId: "1",
			questionId: "1",
			content: "New Answer",
		});

		expect(resutl.isRight()).toBe(true);
		expect(InMemoryAnswerRepository.items[0]).toEqual(resutl.value?.answer);
	});
});
