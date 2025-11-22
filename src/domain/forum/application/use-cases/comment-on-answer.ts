import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerComment } from "../../enterprise/entities/answer-commet";
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import type { AnswersRepository } from "../repositories/answers-repository";

interface CommentOnAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
	content: string;
}

interface CommentOnAnswerUseCaseResponse {
	answerComment: AnswerComment;
}

export class CommentOnQuestoinUseCase {
	public answerRepository: AnswersRepository;
	public answerCommentsRepository: AnswerCommentsRepository;
	constructor(
		answersRepository: AnswersRepository,
		answerCommentsRepository: AnswerCommentsRepository,
	) {
		this.answerRepository = answersRepository;
		this.answerCommentsRepository = answerCommentsRepository;
	}

	async handler({
		authorId,
		answerId,
		content,
	}: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
		const answer = await this.answerRepository.findById(answerId);

		if (!answer) {
			throw new Error("Answer not found");
		}

		const answerComment = AnswerComment.create({
			authorId: new UniqueEntityId(authorId),
			answerId: new UniqueEntityId(answerId),
			content,
		});

		await this.answerCommentsRepository.create(answerComment);

		return {
			answerComment,
		};
	}
}
