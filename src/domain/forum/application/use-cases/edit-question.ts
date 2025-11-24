import { type Either, left, right } from "@/core/either";
import type { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository";
import { NotAlowwedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface EditQuestionUseCaseRequest {
	authorId: string;
	questionId: string;
	title: string;
	content: string;
}

type EditQuestionUseCaseResponse = Either<
	ResourceNotFoundError | NotAlowwedError,
	{
		question: Question;
	}
>;

export class EditQuestionUseCase {
	public questionRepository: QuestionsRepository;

	constructor(questionRepository: QuestionsRepository) {
		this.questionRepository = questionRepository;
	}

	async handler({
		authorId,
		questionId,
		title,
		content,
	}: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
		const question = await this.questionRepository.findById(questionId);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		if (authorId !== question.authorId.toString()) {
			return left(new NotAlowwedError());
		}

		question.title = title;
		question.content = content;

		await this.questionRepository.save(question);

		return right({
			question,
		});
	}
}
