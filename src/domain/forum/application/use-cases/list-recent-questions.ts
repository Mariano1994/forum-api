import { type Either, left, right } from "@/core/either";
import type { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface ListRecentsQuestionsUseCaseRequest {
	page: number;
}

type ListRecentsQuestionsUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		questions: Question[];
	}
>;

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
			return left(new ResourceNotFoundError());
		}

		return right({
			questions,
		});
	}
}
