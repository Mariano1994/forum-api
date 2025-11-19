import { beforeEach, describe, expect, it } from "vitest";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { InMemoryAnswerRepositoreis } from "../../../../../test/respositories/in-memory-answer-repositories";
import { DeleteAnswerUseCase } from "./delete-answer";

let inMemoryAnswerRepository: InMemoryAnswerRepositoreis;
let sut: DeleteAnswerUseCase;

describe("Delete answer use case", () => {
	beforeEach(() => {
		inMemoryAnswerRepository = new InMemoryAnswerRepositoreis();
		sut = new DeleteAnswerUseCase(inMemoryAnswerRepository);
	});

	it("should delete a answer", async () => {
		const newAnswer = makeAnswer(
			{ authorId: new UniqueEntityId("my-answer") },
			new UniqueEntityId("answer-1"),
		);

		await inMemoryAnswerRepository.create(newAnswer);

		await sut.handler({
			authorId: newAnswer.authorId.toString(),
			answerId: "answer-1",
		});

		expect(inMemoryAnswerRepository.items).toHaveLength(0);
	});

	it("should not be able to delete answer from others authors", async () => {
		const newAnswer = makeAnswer(
			{ authorId: new UniqueEntityId("my-answer") },
			new UniqueEntityId("answer-1"),
		);

		await inMemoryAnswerRepository.create(newAnswer);

		expect(async () => {
			await sut.handler({
				authorId: "answer-from-other-author",
				answerId: "answer-1",
			});
		}).rejects.toBeInstanceOf(Error);
	});
});
