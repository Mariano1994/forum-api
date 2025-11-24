import type { AnswerComment } from "../../enterprise/entities/answer-commet";
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface ListAnswerAnswersUseCaseRequest {
	answerId: string;
	page: number;
}

interface ListAnswerAnswersUseCaseResponse {
	answerComments: AnswerComment[];
}

export class ListAnswerCommentsUseCase {
	public answerCommentsRepository: AnswerCommentsRepository;

	constructor(answerCommentRepository: AnswerCommentsRepository) {
		this.answerCommentsRepository = answerCommentRepository;
	}

	async handler({
		answerId,
		page,
	}: ListAnswerAnswersUseCaseRequest): Promise<ListAnswerAnswersUseCaseResponse> {
		const answerComments =
			await this.answerCommentsRepository.findManyByAnswerId(answerId, {
				page,
			});

		return {
			answerComments,
		};
	}
}
