import type { QuestionsRepository } from "../repositories/questions-repository";

interface EditQuestionUseCaseRequest {
	authorId: string;
	questionId: string;
	title: string;
	content: string;
}

type EditQuestionUseCaseResponse = {};

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
			throw new Error("Question not fount");
		}

		if (authorId !== question.authorId.toString()) {
			throw new Error("Not allowed");
		}

		question.title = title;
		question.content = content;

		await this.questionRepository.save(question);

		return {};
	}
}
