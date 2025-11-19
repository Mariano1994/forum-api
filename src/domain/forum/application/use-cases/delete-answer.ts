import type { AnswersRepository } from "../repositories/answers-repository";

interface DeleteAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
}

type DeleteAnswerUseCaseResponse = {};

export class DeleteAnswerUseCase {
	public answerRepository: AnswersRepository;

	constructor(answerRepository: AnswersRepository) {
		this.answerRepository = answerRepository;
	}

	async handler({
		authorId,
		answerId,
	}: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
		const answer = await this.answerRepository.findById(answerId);

		if (!answer) {
			throw new Error("Answer not found");
		}

		if (authorId !== answer.authorId.toString()) {
			throw new Error("Not allowed");
		}

		await this.answerRepository.delete(answer);

		return {};
	}
}
