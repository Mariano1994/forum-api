import { beforeEach, describe, expect, it } from "vitest";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryQuestionsRepositories } from "../../../../../test/respositories/in-memory-questions-repositories";
import { Question } from "../../enterprise/entities/question";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";

let InMemoryQuestionRepository: InMemoryQuestionsRepositories;
let sut: GetQuestionBySlugUseCase;

describe("Get Question By Slug Use Case", () => {
	beforeEach(() => {
		InMemoryQuestionRepository = new InMemoryQuestionsRepositories();
		sut = new GetQuestionBySlugUseCase(InMemoryQuestionRepository);
	});

	it("Should be able to get a question by slug", async () => {
		const newQuestion = Question.create({
			authorId: new UniqueEntityId(),
			title: "New Question",
			slug: Slug.create("new-question"),
			content: "This is a new question content ",
		});

		InMemoryQuestionRepository.create(newQuestion);
		const { question } = await sut.handler({
			slug: "new-question",
		});

		expect(question).toBeTruthy();
		expect(question.title).toEqual(newQuestion.title);
	});
});
