import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteCommentAnswerUseCaseRequest {
	authorId: string;
	answerCommentId: string;
}

type DeleteCommentAnswerUseCaseResponse = {};

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
			throw new Error("Comment not found");
		}

		if (authorId !== answerComment.authorId.toString()) {
			throw new Error("Not allowed");
		}

		await this.answerCommentRepository.delete(answerComment);

		return {};
	}
}
