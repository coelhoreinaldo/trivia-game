import React from 'react';
import { queryByText, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import mockLocalStorage from './helpers/rankingMock';
import { fail, mockApiData } from './helpers/apiMock';
import { act } from 'react-dom/test-utils';

const initialState = {
  player: {
    gravatarEmail: '',
    name: '',
    score: 40,
    assertions: 1
  }
}

describe('the game page', () => {

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

  it('should redirect to feedbacks page when show the last question', async () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, "/game")
    const question1 = await screen.findByText(/in terraria, what does the wall/i);
    expect(question1).toBeInTheDocument();
    const correctAnswer = screen.getByRole('button', { name: /picksaw/i });
    userEvent.click(correctAnswer);
    const nextBtn = await screen.findByTestId('btn-next');
    userEvent.click(nextBtn)

    const question2 = screen.getByRole('button', { name: /orendo/i });
    userEvent.click(question2);
    const nextBtn2 = await screen.findByTestId('btn-next');
    userEvent.click(nextBtn2)

    const question3 = screen.getByRole('button', { name: /radiation/i });
    userEvent.click(question3);
    const nextBtn3 = await screen.findByTestId('btn-next');
    userEvent.click(nextBtn3)

    const question4 = screen.getByRole('button', { name: /every villain is lemonade/i });
    userEvent.click(question4);
    const nextBtn4 = await screen.findByTestId('btn-next');
    userEvent.click(nextBtn4)

    const question5 = screen.getByRole('button', { name: /sayori/i });
    userEvent.click(question5);
    const nextBtn5 = await screen.findByTestId('btn-next');
    userEvent.click(nextBtn5)

    expect(history.location.pathname).toBe('/feedback')
  })
  it('should show the expected text when the times out', async () => {
    jest.useFakeTimers();
    renderWithRouterAndRedux(<App />, initialState, "/game")

    const timerInitialState = await screen.findByText('30');
    expect(timerInitialState).toBeInTheDocument();

    for (let i = 0; i < 31; i += 1) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    const timeOutText = screen.getByRole('heading', { name: /THE TIME IS OVER/i });
    expect(timeOutText).toBeInTheDocument();
  })
});

describe('the game page', () => {
  it('should redirect to home if token expire', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue({
      json: async () => (fail),
    });

    const { history } = renderWithRouterAndRedux(<App />, initialState, "/game")
    const loading = screen.getByText(/carregando/i)
    expect(loading).toBeInTheDocument();
    const emailEl = await screen.findByTestId("input-gravatar-email")
    expect(emailEl).toBeInTheDocument();

    expect(history.location.pathname).toBe('/')
  })

})