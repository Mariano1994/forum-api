import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

import {
	QuestionComment,
	type QuestionCommentProps,
} from "@/domain/forum/enterprise/entities/question-commet";

export function makeQuestionComment(
	overide: Partial<QuestionCommentProps> = {},
	id?: UniqueEntityId,
) {
	const questionComment = QuestionComment.create(
		{
			authorId: new UniqueEntityId(),
			questionId: new UniqueEntityId(),
			content: faker.lorem.text(),
			...overide,
		},
		id,
	);

	return questionComment;
}
