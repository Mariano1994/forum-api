import { beforeEach, describe, expect, it } from "vitest";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeAnswerComment } from "../../../../../test/factories/make-answer-comment";
import { InMemoryAnswerCommentsRepositories } from "../../../../../test/respositories/in-memory-answer-comments-repository";
import { DeleteCommentAnswerUseCase } from "./delete-answer-comment";
import { NotAlowwedError } from "./errors/not-allowed-error";

let inMemoryAnswerRepository: InMemoryAnswerCommentsRepositories;
let sut: DeleteCommentAnswerUseCase;

describe("Dele answer comment use case", () => {
	beforeEach(() => {
		inMemoryAnswerRepository = new InMemoryAnswerCommentsRepositories();
		sut = new DeleteCommentAnswerUseCase(inMemoryAnswerRepository);
	});

	it("should be able to delete a answer comment", async () => {
		const answerComment = makeAnswerComment();

		await inMemoryAnswerRepository.create(answerComment);

		await sut.handler({
			answerCommentId: answerComment.id.toString(),
			authorId: answerComment.authorId.toString(),
		});

		expect(inMemoryAnswerRepository.items).toHaveLength(0);
	});

	it("should not able to delete a answer comment from another authors", async () => {
		const answerComment = makeAnswerComment({
			authorId: new UniqueEntityId("author-1"),
		});
		await inMemoryAnswerRepository.create(answerComment);

		const result = await sut.handler({
			answerCommentId: answerComment.id.toString(),
			authorId: "author-2",
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAlowwedError);
	});
});
