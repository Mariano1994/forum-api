import { beforeEach, describe, expect, it } from "vitest";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeQuestionComment } from "../../../../../test/factories/make-question-comment";
import { InMemoryQuestionCommentsRepositories } from "../../../../../test/respositories/in-memory-question-comments-repository";
// import { makeComment } from "../../../../../test/factories/make-comment";

import { ListQuestionCommentsUseCase } from "./list-question-comments";

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentsRepositories;
let sut: ListQuestionCommentsUseCase;

describe("List questioin comments use case", () => {
	beforeEach(() => {
		inMemoryQuestionCommentRepository =
			new InMemoryQuestionCommentsRepositories();
		sut = new ListQuestionCommentsUseCase(inMemoryQuestionCommentRepository);
	});

	it("should be able to list comment from a questionm", async () => {
		await inMemoryQuestionCommentRepository.create(
			makeQuestionComment({ questionId: new UniqueEntityId("comment-1") }),
		);

		await inMemoryQuestionCommentRepository.create(
			makeQuestionComment({
				questionId: new UniqueEntityId("comment-1"),
			}),
		);

		await inMemoryQuestionCommentRepository.create(
			makeQuestionComment({
				questionId: new UniqueEntityId("comment-1"),
			}),
		);

		const { questionComments } = await sut.handler({
			questionId: "comment-1",
			page: 1,
		});

		expect(questionComments).toHaveLength(3);
	});

	it("should be able to list paginated comment comments", async () => {
		for (let i = 1; i <= 25; i++) {
			await inMemoryQuestionCommentRepository.create(
				makeQuestionComment({ questionId: new UniqueEntityId("comment-1") }),
			);
		}

		const { questionComments } = await sut.handler({
			questionId: "comment-1",
			page: 2,
		});

		expect(questionComments).toHaveLength(5);
	});
});
