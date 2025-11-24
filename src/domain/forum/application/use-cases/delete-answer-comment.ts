import { type Either, left, right } from "@/core/either";
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { NotAlowwedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteCommentAnswerUseCaseRequest {
	authorId: string;
	answerCommentId: string;
}

type DeleteCommentAnswerUseCaseResponse = Either<
	ResourceNotFoundError | NotAlowwedError,
	{}
>;

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
			return left(new ResourceNotFoundError());
		}

		if (authorId !== answerComment.authorId.toString()) {
			return left(new NotAlowwedError());
		}

		await this.answerCommentRepository.delete(answerComment);

		return right({});
	}
}
