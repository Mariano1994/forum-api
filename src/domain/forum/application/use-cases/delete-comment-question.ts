import type { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface DeleteCommentQuestionUseCaseRequest {
	authorId: string;
	questionCommentId: string;
}

type DeleteCommentQuestionUseCaseResponse = {};

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
			throw new Error("Comment not found");
		}

		if (authorId !== questionComment.authorId.toString()) {
			throw new Error("Not allowed");
		}

		await this.questionCommentRepository.delete(questionComment);

		return {};
	}
}
