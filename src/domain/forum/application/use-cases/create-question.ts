import { type Either, right } from "@/core/either";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository";

interface CreateQuestionUseCaseRequest {
	authorId: string;
	title: string;
	content: string;
}

type CreateQuestionUseCaseResponse = Either<null, { question: Question }>;

export class CreateQuestionUseCase {
	public questionRepository: QuestionsRepository;

	constructor(questionRepository: QuestionsRepository) {
		this.questionRepository = questionRepository;
	}

	async handler({
		authorId,
		title,
		content,
	}: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
		const question = Question.create({
			authorId: new UniqueEntityId(authorId),
			title,
			content,
		});

		await this.questionRepository.create(question);

		return right({
			question,
		});
	}
}
