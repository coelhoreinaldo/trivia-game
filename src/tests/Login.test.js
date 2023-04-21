import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { fail, mockApiData } from './helpers/apiMock';

const initialState = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
}

describe('the login page', () => {
  const emailTestId = 'input-gravatar-email';
  const nameTestId = 'input-player-name';
  const email = 'user@teste.com';
  it('should have the expected elements', () => {
    renderWithRouterAndRedux(<App />);

    const emailEl = screen.getByTestId(emailTestId);
    expect(emailEl).toBeInTheDocument();

    const nameEl = screen.getByTestId(nameTestId);
    expect(nameEl).toBeInTheDocument();

    const buttonEl = screen.getByRole('button', { name: /play/i });
    expect(buttonEl).toBeInTheDocument();
  });

  it('should enable the button if inputs are valid', () => {
    renderWithRouterAndRedux(<App />);
    const buttonEl = screen.getByRole('button', { name: /play/i });
    expect(buttonEl).toBeDisabled();

    const emailEl = screen.getByTestId(emailTestId);
    const nameEl = screen.getByTestId(nameTestId);

    userEvent.type(emailEl, email);
    userEvent.type(nameEl, '123435');

    const buttonEl2 = screen.getByRole('button', { name: /play/i });
    expect(buttonEl2).toBeEnabled();
  });

  it('should make a fetch when the button play is clicked', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (mockApiData)
    })

    const { history } = renderWithRouterAndRedux(<App />);

    const emailEl = screen.getByTestId(emailTestId);
    const nameEl = screen.getByTestId(nameTestId);

    userEvent.type(emailEl, email);
    userEvent.type(nameEl, 'Teste');

    const buttonEl = screen.getByTestId('btn-play');
    userEvent.click(buttonEl);
    expect(fetch).toHaveBeenCalledTimes(1)

  });

  it('should redirect to settings page when the button settings is clicked', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailEl = screen.getByTestId(emailTestId);
    const nameEl = screen.getByTestId(nameTestId);

    userEvent.type(emailEl, email);
    userEvent.type(nameEl, 'Teste');

    const buttonEl = screen.getByTestId('btn-settings');
    userEvent.click(buttonEl);

    expect(history.location.pathname).toBe('/config');
  });

  it('should fail', () => {
    jest.spyOn(global, 'fetch').mockRejectedValue({
      json: async () => (fail),
    });
    const { history } = renderWithRouterAndRedux(<App />);

    const buttonEl = screen.getByTestId('btn-play');
    userEvent.click(buttonEl)

    expect(history.location.pathname).toBe('/')
  })
});
