import { type Either, left, right } from "@/core/either";
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteCommentAnswerUseCaseRequest {
	authorId: string;
	answerCommentId: string;
}

type DeleteCommentAnswerUseCaseResponse = Either<string, {}>;

export class DeleteCommentAnswerUseCase {
	public answerCommentRepository: AnswerCommentsRepository;

	constructor(answerCommentRepository: AnswerCommentsRepository) {
		this.answerCommentRepository = answerCommentRepository;
	}

	async handler({
		authorId,
		answerCommentId,
	}: DeleteCommentAnswerUseCaseRequest): Promise<DeleteCommentAnswerUseCaseResponse> {
		const answerComment =
			await this.answerCommentRepository.findById(answerCommentId);

		if (!answerComment) {
			return left("Answer comment not foud");
		}

		if (authorId !== answerComment.authorId.toString()) {
			return left("Not allowed");
		}

		await this.answerCommentRepository.delete(answerComment);

		return right({});
	}
}
