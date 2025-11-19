import type { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository";

interface GetQuestionBySlugRequest {
	slug: string;
}

interface GetQuestionBySlugResponse {
	question: Question;
}

export class GetQuestionBySlugUseCase {
	public questionResitory: QuestionsRepository;

	constructor(questionResponsitory: QuestionsRepository) {
		this.questionResitory = questionResponsitory;
	}

	async handler({
		slug,
	}: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse> {
		const question = await this.questionResitory.findBySlug(slug);

		if (!question) {
			throw new Error("Question not found");
		}

		return {
			question,
		};
	}
}
