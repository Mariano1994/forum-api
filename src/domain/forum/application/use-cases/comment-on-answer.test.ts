import { beforeEach, describe, expect, it } from "vitest";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { InMemoryAnswerCommentsRepositories } from "../../../../../test/respositories/in-memory-answer-comments-repository";
import { InMemoryAnswerRepositoreis } from "../../../../../test/respositories/in-memory-answer-repositories";
import { CommentOnQuestoinUseCase } from "./comment-on-answer";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepositories;
let inMemoryAnswersRepositories: InMemoryAnswerRepositoreis;
let sut: CommentOnQuestoinUseCase;

describe("Commnet on answer use case", () => {
	beforeEach(() => {
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepositories();
		inMemoryAnswersRepositories = new InMemoryAnswerRepositoreis();
		sut = new CommentOnQuestoinUseCase(
			inMemoryAnswersRepositories,
			inMemoryAnswerCommentsRepository,
		);
	});

	it("should comment on answer", async () => {
		const answer = makeAnswer();

		await inMemoryAnswersRepositories.create(answer);

		await sut.handler({
			authorId: answer.authorId.toString(),
			answerId: answer.id.toString(),
			content: "Test comment",
		});

		expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
			"Test comment",
		);
	});
});
