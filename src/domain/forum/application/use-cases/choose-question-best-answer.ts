import { type Either, left, right } from "@/core/either";
import type { Question } from "../../enterprise/entities/question";
import type { AnswersRepository } from "../repositories/answers-repository";
import type { QuestionsRepository } from "../repositories/questions-repository";
import { NotAlowwedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface ChooseQuestionBestAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<
	ResourceNotFoundError | NotAlowwedError,
	{
		question: Question;
	}
>;

export class ChooseQuestionBestAnswerUseCase {
	public answersRepository: AnswersRepository;
	public questionsRepository: QuestionsRepository;

	constructor(
		answersRepository: AnswersRepository,
		questionsRepository: QuestionsRepository,
	) {
		this.answersRepository = answersRepository;
		this.questionsRepository = questionsRepository;
	}

	async handler({
		answerId,
		authorId,
	}: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			return left(new ResourceNotFoundError());
		}

		const question = await this.questionsRepository.findById(
			answer.questionId.toString(),
		);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		if (authorId !== question.authorId.toString()) {
			return left(new NotAlowwedError());
		}

		question.bestAnswerId = answer.id;

		await this.questionsRepository.save(question);

		return right({
			question,
		});
	}
}
