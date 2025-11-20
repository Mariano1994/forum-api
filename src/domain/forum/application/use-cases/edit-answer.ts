import type { Answer } from "../../enterprise/entities/answer";
import type { AnswersRepository } from "../repositories/answers-repository";

interface EditAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
	content: string;
}

type EditAnswerUseCaseResponse = {
	answer: Answer;
};

export class EditAnswerUseCase {
	public answerRepository: AnswersRepository;

	constructor(answerRepository: AnswersRepository) {
		this.answerRepository = answerRepository;
	}

	async handler({
		authorId,
		answerId,
		content,
	}: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
		const answer = await this.answerRepository.findById(answerId);

		if (!answer) {
			throw new Error("Answer not fount");
		}

		if (authorId !== answer.authorId.toString()) {
			throw new Error("Not allowed");
		}

		answer.content = content;

		await this.answerRepository.save(answer);

		return {
			answer,
		};
	}
}
