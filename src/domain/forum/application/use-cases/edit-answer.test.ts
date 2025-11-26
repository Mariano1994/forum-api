import { beforeEach, describe, expect, it } from "vitest";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { InMemoryAnswerRepositoreis } from "../../../../../test/respositories/in-memory-answer-repositories";
import { EditAnswerUseCase } from "./edit-answer";
import { NotAlowwedError } from "./errors/not-allowed-error";

let inMemoryAnswerRepository: InMemoryAnswerRepositoreis;
let sut: EditAnswerUseCase;

describe("Edit answer use case", () => {
	beforeEach(() => {
		inMemoryAnswerRepository = new InMemoryAnswerRepositoreis();
		sut = new EditAnswerUseCase(inMemoryAnswerRepository);
	});

	it("should edit a answer", async () => {
		const newAnswer = makeAnswer(
			{ authorId: new UniqueEntityId("my-answer") },
			new UniqueEntityId("answer-1"),
		);

		await inMemoryAnswerRepository.create(newAnswer);

		await sut.handler({
			authorId: "my-answer",
			answerId: newAnswer.id.toValue(),
			content: "Edited content",
		});

		expect(inMemoryAnswerRepository?.items[0]).toMatchObject({
			content: "Edited content",
		});
	});

	it("should not be able to edit answer form another author", async () => {
		const newAnswer = makeAnswer(
			{ authorId: new UniqueEntityId("my-answer") },
			new UniqueEntityId("answer-1"),
		);

		await inMemoryAnswerRepository.create(newAnswer);
		const result = await sut.handler({
			authorId: "my-answer-23",
			answerId: newAnswer.id.toValue(),
			content: "Edited content",
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAlowwedError);
	});
});
