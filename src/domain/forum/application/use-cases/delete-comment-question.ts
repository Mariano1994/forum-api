import { type Either, left, right } from "@/core/either";
import type { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { NotAlowwedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteCommentQuestionUseCaseRequest {
	authorId: string;
	questionCommentId: string;
}

type DeleteCommentQuestionUseCaseResponse = Either<
	ResourceNotFoundError | NotAlowwedError,
	{}
>;

export class DeleteCommentQuestionUseCase {
	public questionCommentRepository: QuestionCommentsRepository;

	constructor(questionCommentRepository: QuestionCommentsRepository) {
		this.questionCommentRepository = questionCommentRepository;
	}

	async handler({
		authorId,
		questionCommentId,
	}: DeleteCommentQuestionUseCaseRequest): Promise<DeleteCommentQuestionUseCaseResponse> {
		const questionComment =
			await this.questionCommentRepository.findById(questionCommentId);

		if (!questionComment) {
			return left(new ResourceNotFoundError());
		}

		if (authorId !== questionComment.authorId.toString()) {
			return left(new NotAlowwedError());
		}

		await this.questionCommentRepository.delete(questionComment);

		return right({});
	}
}
