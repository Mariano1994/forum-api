import { type Either, left, right } from "@/core/either";
import type { AnswersRepository } from "../repositories/answers-repository";
import { NotAlowwedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
}

type DeleteAnswerUseCaseResponse = Either<
	ResourceNotFoundError | NotAlowwedError,
	{}
>;

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
			return left(new ResourceNotFoundError());
		}

		if (authorId !== answer.authorId.toString()) {
			return left(new NotAlowwedError());
		}

		await this.answerRepository.delete(answer);

		return right({});
	}
}
