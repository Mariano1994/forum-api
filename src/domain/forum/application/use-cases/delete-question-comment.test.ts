import { beforeEach, describe, expect, it } from "vitest";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeQuestionComment } from "../../../../../test/factories/make-question-comment";
import { InMemoryQuestionCommentsRepositories } from "../../../../../test/respositories/in-memory-question-comments-repository";
import { DeleteCommentQuestionUseCase } from "./delete-comment-question";

let inMemoryQuestionRepository: InMemoryQuestionCommentsRepositories;
let sut: DeleteCommentQuestionUseCase;

describe("Dele question comment use case", () => {
	beforeEach(() => {
		inMemoryQuestionRepository = new InMemoryQuestionCommentsRepositories();
		sut = new DeleteCommentQuestionUseCase(inMemoryQuestionRepository);
	});

	it("should be able to delete a question comment", async () => {
		const questionComment = makeQuestionComment();

		await inMemoryQuestionRepository.create(questionComment);

		await sut.handler({
			questionCommentId: questionComment.id.toString(),
			authorId: questionComment.authorId.toString(),
		});

		expect(inMemoryQuestionRepository.items).toHaveLength(0);
	});

	it("should not able to delete a question comment from another authors", async () => {
		const questionComment = makeQuestionComment({
			authorId: new UniqueEntityId("author-1"),
		});
		await inMemoryQuestionRepository.create(questionComment);

		expect(async () => {
			await sut.handler({
				questionCommentId: questionComment.id.toString(),
				authorId: "author-2",
			});
		}).rejects.toBeInstanceOf(Error);
	});
});
