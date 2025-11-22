import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionComment } from "../../enterprise/entities/question-commet";
import type { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import type { QuestionsRepository } from "../repositories/questions-repository";

interface CommentOnQuestionUseCaseRequest {
	authorId: string;
	questionId: string;
	content: string;
}

interface CommentOnQuestionUseCaseResponse {
	questionComment: QuestionComment;
}

export class CommentOnQuestoinUseCase {
	public questionRepository: QuestionsRepository;
	public questionCommentsRepository: QuestionCommentsRepository;
	constructor(
		questionsRepository: QuestionsRepository,
		questionCommentsRepository: QuestionCommentsRepository,
	) {
		this.questionRepository = questionsRepository;
		this.questionCommentsRepository = questionCommentsRepository;
	}

	async handler({
		authorId,
		questionId,
		content,
	}: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
		const question = await this.questionRepository.findById(questionId);

		if (!question) {
			throw new Error("Question not found");
		}

		const questionComment = QuestionComment.create({
			authorId: new UniqueEntityId(authorId),
			questionId: new UniqueEntityId(questionId),
			content,
		});

		await this.questionCommentsRepository.create(questionComment);

		return {
			questionComment,
		};
	}
}
