import React from 'react';
import { queryByText, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import mockLocalStorage from './helpers/rankingMock';
import { mockApiData } from './helpers/apiMock';


describe('the game page', () => {
  const initialState = {
    player: {
      gravatarEmail: '',
      name: '',
      score: 40,
      assertions: 1
    }
  }

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (mockApiData),
    });


  });

  it('should make a fetch on page load and show the returned elements', async () => {
    renderWithRouterAndRedux(<App />, initialState, "/game")
    expect(fetch).toHaveBeenCalled();

    const loadingEl = screen.getByText(/carregando/i);
    expect(loadingEl).toBeInTheDocument();

    const questionCategoryEl = await screen.findByTestId('question-category')
    expect(questionCategoryEl).toBeInTheDocument();

    const questionTextEl = await screen.findByTestId('question-text')
    expect(questionTextEl).toBeInTheDocument();

    const answersEl = await screen.findAllByTestId('answer-options')
    expect(answersEl).toHaveLength(4)
    expect(answersEl[0]).toBeInTheDocument();
    expect(answersEl[3]).toBeInTheDocument();
  })

  it('should show the right answer when an answer is click and go to the next question on click of "next" button', async () => {
    renderWithRouterAndRedux(<App />, initialState, "/game")

    const answersEl = await screen.findAllByTestId('answer-options')
    const question1 = screen.getByText(/in terraria, what does the wall/i);
    expect(question1).toBeInTheDocument();
    answersEl.every((answer) => expect(answer).toBeInTheDocument())
    answersEl.every((answer) => expect(answer).toBeEnabled())

    const nextBtn = screen.queryByTestId('btn-next');
    expect(nextBtn).not.toBeInTheDocument();

    const correctAnswer = screen.getByRole('button', { name: /picksaw/i });
    const incorrectAnswer = screen.getByRole('button', { name: /pwnhammer/i });
    userEvent.click(correctAnswer)

    expect(correctAnswer).toBeDisabled();
    expect(incorrectAnswer).toBeDisabled();
    expect(correctAnswer).toHaveClass('green')
    expect(incorrectAnswer).toHaveClass('red')

    const nextBtn2 = screen.getByTestId('btn-next');
    expect(nextBtn2).toBeInTheDocument();
    userEvent.click(nextBtn2)

    const question2 = screen.getByText(/what is the name of the 4\-armed/i);
    expect(question2).toBeInTheDocument();

    const question1Again = screen.queryByText(/in terraria, what does the wall/i);
    expect(question1Again).not.toBeInTheDocument()
  })
});