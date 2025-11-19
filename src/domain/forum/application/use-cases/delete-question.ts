import type { QuestionsRepository } from "../repositories/questions-repository";

interface DeleteQuestionUseCaseRequest {
	authorId: string;
	questionId: string;
}

type DeleteQuestionUseCaseResponse = {};
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
			throw new Error("Question not Found");
		}

		if (authorId !== question.authorId.toString()) {
			throw new Error("not allowed");
		}

		await this.questionRepository.delete(question);
		return {};
	}
}
