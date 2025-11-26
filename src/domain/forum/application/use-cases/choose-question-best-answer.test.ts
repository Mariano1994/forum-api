import { beforeEach, describe, expect, it } from "vitest";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { makeQuestion } from "../../../../../test/factories/make-question";
import { InMemoryAnswerRepositoreis } from "../../../../../test/respositories/in-memory-answer-repositories";
import { InMemoryQuestionsRepositories } from "../../../../../test/respositories/in-memory-questions-repositories";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer";
import { NotAlowwedError } from "./errors/not-allowed-error";

let inMemoryAnswersRepository: InMemoryAnswerRepositoreis;
let inMemoryQuestionsRepository: InMemoryQuestionsRepositories;
let sut: ChooseQuestionBestAnswerUseCase;

describe("Choose question best answer use case", () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswerRepositoreis();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepositories();
		sut = new ChooseQuestionBestAnswerUseCase(
			inMemoryAnswersRepository,
			inMemoryQuestionsRepository,
		);
	});

	it("should be able to choose question best answer", async () => {
		const newQuestion = makeQuestion();

		const answer = makeAnswer({
			questionId: newQuestion.id,
		});

		await inMemoryQuestionsRepository.create(newQuestion);
		await inMemoryAnswersRepository.create(answer);

		await sut.handler({
			answerId: answer.id.toString(),
			authorId: newQuestion.authorId.toString(),
		});

		expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(
			answer.id,
		);
	});

	it("should not be able to choose another author question best", async () => {
		const newQuestion = makeQuestion({
			authorId: new UniqueEntityId("my-question"),
		});

		const answer = makeAnswer({
			questionId: newQuestion.id,
		});

		await inMemoryQuestionsRepository.create(newQuestion);
		await inMemoryAnswersRepository.create(answer);

		const result = await sut.handler({
			answerId: answer.id.toString(),
			authorId: "another-author",
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAlowwedError);
	});
});
