import { type Either, left, right } from "@/core/either";
import type { QuestionsRepository } from "../repositories/questions-repository";
import { NotAlowwedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteQuestionUseCaseRequest {
	authorId: string;
	questionId: string;
}

type DeleteQuestionUseCaseResponse = Either<
	ResourceNotFoundError | NotAlowwedError,
	{}
>;
export class DeleteQuestionUseCase {
	public questionRepository: QuestionsRepository;

	constructor(quetionRepository: QuestionsRepository) {
		this.questionRepository = quetionRepository;
	}

	async handler({
		authorId,
		questionId,
	}: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
		const question = await this.questionRepository.findById(questionId);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		if (authorId !== question.authorId.toString()) {
			return left(new NotAlowwedError());
		}

		await this.questionRepository.delete(question);
		return right({});
	}
}
