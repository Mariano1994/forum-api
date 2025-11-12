import { describe, expect, it } from "vitest";
import type { Answer } from "../entities/answer";
import type { AnswersRepository } from "../repositories/answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";

const fakeAnswerRepository: AnswersRepository = {
	create: async (answer: Answer) => {
		return;
	},
};

describe("Answer question use case", async () => {
	it("should create an Answer", async () => {
		const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository);

		const answer = await answerQuestion.handler({
			instructorId: "1",
			questionId: "1",
			content: "New Answer",
		});

		expect(answer.content).toEqual("New Answer");
	});
});
