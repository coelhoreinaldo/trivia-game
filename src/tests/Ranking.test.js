import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import mockLocalStorage from './helpers/rankingMock';


describe('the ranking page', () => {
  const initialState = {
    player: {
      gravatarEmail: '',
      name: '',
      score: 40,
      assertions: 1
    }
  }

  it('should redirect to home page when the play again button is clicked', () => {
    localStorage.setItem('rankingTrivia', JSON.stringify(mockLocalStorage))

    const { history } = renderWithRouterAndRedux(<App />, initialState, '/ranking')

    const rankingBtn = screen.getByTestId('btn-go-home');
    userEvent.click(rankingBtn)

    expect(history.location.pathname).toBe('/')
  })
});