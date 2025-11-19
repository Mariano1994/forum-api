import { beforeEach, describe, expect, it } from "vitest";
import { makeQuestion } from "../../../../../test/factories/make-question";
import { InMemoryQuestionsRepositories } from "../../../../../test/respositories/in-memory-questions-repositories";
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
		const newQuestion = makeQuestion({ slug: Slug.create("new-question") });

		InMemoryQuestionRepository.create(newQuestion);
		const { question } = await sut.handler({
			slug: "new-question",
		});

		expect(question).toBeTruthy();
		expect(question.title).toEqual(newQuestion.title);
	});
});
