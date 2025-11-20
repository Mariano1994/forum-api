import type { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository";

interface ListRecentsQuestionsUseCaseRequest {
	page: number;
}

interface ListRecentsQuestionsUseCaseResponse {
	questions: Question[];
}

export class ListRecentsQuestionsUseCase {
	public questionsRepository: QuestionsRepository;

	constructor(questionsRepository: QuestionsRepository) {
		this.questionsRepository = questionsRepository;
	}

	async handler({
		page,
	}: ListRecentsQuestionsUseCaseRequest): Promise<ListRecentsQuestionsUseCaseResponse> {
		const questions = await this.questionsRepository.findManyRecent({ page });

		if (!questions) {
			throw new Error("Questions not found");
		}

		return {
			questions,
		};
	}
}
