import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';


describe('the feedback page', () => {
  const initialState = {
    player: {
      gravatarEmail: '',
      name: '',
      score: 40,
      assertions: 1
    }
  }

  it('should have the heading and buttons elements', () => {
    renderWithRouterAndRedux(<App />, initialState, '/feedback')
    const feedbackTextEl = screen.getByTestId('feedback-text');
    expect(feedbackTextEl).toBeInTheDocument();

    const scoreEl = screen.getByTestId('feedback-total-score');
    expect(scoreEl).toBeInTheDocument();

    const assertionsEl = screen.getByTestId('feedback-total-question');
    expect(assertionsEl).toBeInTheDocument();

    const rankingBtn = screen.getByTestId('btn-ranking');
    expect(rankingBtn).toBeInTheDocument();

    const playAgainBtn = screen.getByTestId('btn-play-again');
    expect(playAgainBtn).toBeInTheDocument();
  });

  it('should show the expected text if assertions was smaller than 3', () => {
    renderWithRouterAndRedux(<App />, initialState, '/feedback')

    const feedbackTextEl = screen.getByText(/could be better\.\.\./i)
    expect(feedbackTextEl).toBeInTheDocument();

    initialState.player.assertions = 3;

    
  });

  it('should show the expected text if assertions was bigger or equal 3', () => {
    const initialState2 = {
      player: {
        gravatarEmail: '',
        name: '',
        score: 40,
        assertions: 3
      }
    }
    renderWithRouterAndRedux(<App />, initialState2, '/feedback')

    const feedbackTextEl = screen.getByText(/well done!/i)
    expect(feedbackTextEl).toBeInTheDocument();
    
  });


  it('should redirect to ranking page when the ranking button is clicked', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/feedback')

    const rankingBtn = screen.getByTestId('btn-ranking');
    userEvent.click(rankingBtn)

    expect(history.location.pathname).toBe('/ranking')
  })

  it('should redirect to home page when the play again button is clicked', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/feedback')

    const rankingBtn = screen.getByTestId('btn-play-again');
    userEvent.click(rankingBtn)

    expect(history.location.pathname).toBe('/')
  })
})