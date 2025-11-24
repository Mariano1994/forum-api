import { type Either, right } from "@/core/either";
import type { Answer } from "../../enterprise/entities/answer";
import type { AnswersRepository } from "../repositories/answers-repository";

interface ListQuestionAnswersUseCaseRequest {
	questionId: string;
	page: number;
}

type ListQuestionAnswersUseCaseResponse = Either<
	null,
	{
		answers: Answer[];
	}
>;
export class ListQuestionAnswersUseCase {
	public answerRepository: AnswersRepository;

	constructor(answerRepository: AnswersRepository) {
		this.answerRepository = answerRepository;
	}

	async handler({
		questionId,
		page,
	}: ListQuestionAnswersUseCaseRequest): Promise<ListQuestionAnswersUseCaseResponse> {
		const answers = await this.answerRepository.findManyByQuestionId(
			questionId,
			{ page },
		);

		return right({
			answers,
		});
	}
}
