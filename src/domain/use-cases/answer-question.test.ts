import {describe, expect, it} from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'


describe('Answer question use case', ()=> {


  it('should create an Answer', async ()=> {
    const answerQuestion = new AnswerQuestionUseCase()

    const answer =answerQuestion.handler({
      instructorId: '1',
      questionId: '1',
      content: 'New Answer'
    })

    expect(answer.content).toEqual('New Answer')
  })
})