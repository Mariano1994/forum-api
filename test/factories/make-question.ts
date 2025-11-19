import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
	Question,
	type QuestionPros,
} from "@/domain/forum/enterprise/entities/question";

export function makeQuestion(
	overide: Partial<QuestionPros> = {},
	id?: UniqueEntityId,
) {
	const question = Question.create(
		{
			authorId: new UniqueEntityId(),
			title: faker.lorem.sentence(),
			content: faker.lorem.text(),
			...overide,
		},
		id,
	);

	return question;
}
