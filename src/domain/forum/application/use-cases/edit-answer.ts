import { type Either, left, right } from "@/core/either";
import type { Answer } from "../../enterprise/entities/answer";
import type { AnswersRepository } from "../repositories/answers-repository";
import { NotAlowwedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface EditAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
	content: string;
}

type EditAnswerUseCaseResponse = Either<
	ResourceNotFoundError | NotAlowwedError,
	{
		answer: Answer;
	}
>;

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
			return left(new ResourceNotFoundError());
		}

		if (authorId !== answer.authorId.toString()) {
			return left(new NotAlowwedError());
		}

		answer.content = content;

		await this.answerRepository.save(answer);

		return right({
			answer,
		});
	}
}
