import { beforeEach, describe, expect, it } from "vitest";
import { makeQuestion } from "../../../../../test/factories/make-question";
import { InMemoryQuestionCommentsRepositories } from "../../../../../test/respositories/in-memory-question-comments-repository";
import { InMemoryQuestionsRepositories } from "../../../../../test/respositories/in-memory-questions-repositories";
import { CommentOnQuestoinUseCase } from "./comment-on-question";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepositories;
let inMemoryQuestionsRepositories: InMemoryQuestionsRepositories;
let sut: CommentOnQuestoinUseCase;

describe("Commnet on question use case", () => {
	beforeEach(() => {
		inMemoryQuestionCommentsRepository =
			new InMemoryQuestionCommentsRepositories();
		inMemoryQuestionsRepositories = new InMemoryQuestionsRepositories();
		sut = new CommentOnQuestoinUseCase(
			inMemoryQuestionsRepositories,
			inMemoryQuestionCommentsRepository,
		);
	});

	it("should comment on question", async () => {
		const question = makeQuestion();

		await inMemoryQuestionsRepositories.create(question);

		await sut.handler({
			authorId: question.authorId.toString(),
			questionId: question.id.toString(),
			content: "Test comment",
		});

		expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
			"Test comment",
		);
	});
});
