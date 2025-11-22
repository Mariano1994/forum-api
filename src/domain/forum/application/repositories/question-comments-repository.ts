import type { QuestionComment } from "../../enterprise/entities/question-commet";

export interface QuestionCommentsRepository {
	create(questionComment: QuestionComment): Promise<void>;
}
