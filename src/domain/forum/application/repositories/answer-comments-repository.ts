import type { AnswerComment } from "../../enterprise/entities/answer-commet";

export interface AnswerCommentsRepository {
	create(answerComment: AnswerComment): Promise<void>;
}
