import type { Question } from "../../enterprise/entities/question";
import type { AnswersRepository } from "../repositories/answers-repository";
import type { QuestionsRepository } from "../repositories/questions-repository";

interface ChooseQuestionBestAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
}

interface ChooseQuestionBestAnswerUseCaseResponse {
	question: Question;
}

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
			throw new Error("Queston not Found");
		}

		const question = await this.questionsRepository.findById(
			answer.questionId.toString(),
		);

		if (!question) {
			throw new Error("Answer not found");
		}

		if (authorId !== question.authorId.toString()) {
			throw new Error("Not Allowed");
		}

		question.bestAnswerId = answer.id;

		await this.questionsRepository.save(question);

		return {
			question,
		};
	}
}
