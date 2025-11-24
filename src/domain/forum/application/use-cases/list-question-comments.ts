import { type Either, right } from "@/core/either";
import type { QuestionComment } from "../../enterprise/entities/question-commet";
import type { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface ListQuestionAnswersUseCaseRequest {
	questionId: string;
	page: number;
}

type ListQuestionAnswersUseCaseResponse = Either<
	null,
	{
		questionComments: QuestionComment[];
	}
>;

export class ListQuestionCommentsUseCase {
	public questionCommentsRepository: QuestionCommentsRepository;

	constructor(questionCommentRepository: QuestionCommentsRepository) {
		this.questionCommentsRepository = questionCommentRepository;
	}

	async handler({
		questionId,
		page,
	}: ListQuestionAnswersUseCaseRequest): Promise<ListQuestionAnswersUseCaseResponse> {
		const questionComments =
			await this.questionCommentsRepository.findManyByQuestionId(questionId, {
				page,
			});

		return right({
			questionComments,
		});
	}
}
