import { beforeEach, describe, expect, it } from "vitest";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeAnswerComment } from "../../../../../test/factories/make-answer-comment";
import { InMemoryAnswerCommentsRepositories } from "../../../../../test/respositories/in-memory-answer-comments-repository";

import { ListAnswerCommentsUseCase } from "./list-answer-comments";

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentsRepositories;
let sut: ListAnswerCommentsUseCase;

describe("List questioin comments use case", () => {
	beforeEach(() => {
		inMemoryAnswerCommentRepository = new InMemoryAnswerCommentsRepositories();
		sut = new ListAnswerCommentsUseCase(inMemoryAnswerCommentRepository);
	});

	it("should be able to list comment from a answerm", async () => {
		await inMemoryAnswerCommentRepository.create(
			makeAnswerComment({ answerId: new UniqueEntityId("comment-1") }),
		);

		await inMemoryAnswerCommentRepository.create(
			makeAnswerComment({
				answerId: new UniqueEntityId("comment-1"),
			}),
		);

		await inMemoryAnswerCommentRepository.create(
			makeAnswerComment({
				answerId: new UniqueEntityId("comment-1"),
			}),
		);

		const result = await sut.handler({
			answerId: "comment-1",
			page: 1,
		});

		expect(result.value?.answerComments).toHaveLength(3);
	});

	it("should be able to list paginated comment answer", async () => {
		for (let i = 1; i <= 25; i++) {
			await inMemoryAnswerCommentRepository.create(
				makeAnswerComment({ answerId: new UniqueEntityId("comment-1") }),
			);
		}

		const result = await sut.handler({
			answerId: "comment-1",
			page: 2,
		});

		expect(result.value?.answerComments).toHaveLength(5);
	});
});
