import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

import {
	AnswerComment,
	type AnswerCommentProps,
} from "@/domain/forum/enterprise/entities/answer-commet";

export function makeAnswerComment(
	overide: Partial<AnswerCommentProps> = {},
	id?: UniqueEntityId,
) {
	const answerComment = AnswerComment.create(
		{
			authorId: new UniqueEntityId(),
			answerId: new UniqueEntityId(),
			content: faker.lorem.text(),
			...overide,
		},
		id,
	);

	return answerComment;
}
