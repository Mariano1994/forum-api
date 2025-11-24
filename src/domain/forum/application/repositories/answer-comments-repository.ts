import type { AnswerComment } from "../../enterprise/entities/answer-commet";

export interface AnswerCommentsRepository {
	findById(id: string): Promise<AnswerComment | null>;
	create(answerComment: AnswerComment): Promise<void>;
	delete(answerComment: AnswerComment): Promise<void>;
}
