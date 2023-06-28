/* eslint-disable react/jsx-max-depth */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { resetUser } from '../redux/actions/action';
import './Feedback.css';

function Feedback({ history }) {
  const MIN_ASSERTIONS = 3;
  const dispatch = useDispatch();
  const { email, name, score, assertions } = useSelector((state) => state.player);

  const userHitAndInfo = () => {
    let userEmail = email;
    userEmail = email ? userEmail.trim().toLowerCase() : '';
    const emailToLink = md5(userEmail).toString();
    const urlIMG = `https://www.gravatar.com/avatar/${emailToLink}`;
    return {
      urlIMG,
      name,
      score,
    };
  };

  const handlePlayAgain = () => {
    history.push('/');

    const rankingLS = JSON.parse(localStorage.getItem('rankingTrivia')) || [];
    localStorage
      .setItem('rankingTrivia', JSON.stringify([...rankingLS, userHitAndInfo()]));

    dispatch(resetUser());
  };

  const handleRanking = () => {
    history.push('/ranking');

    const rankingLS = JSON.parse(localStorage.getItem('rankingTrivia')) || [];
    localStorage
      .setItem('rankingTrivia', JSON.stringify([...rankingLS, userHitAndInfo()]));

    dispatch(resetUser());
  };

  useEffect(() => () => {
    dispatch(resetUser());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="feedbacks-main">
        <section className="results">
          <h3 className="feedbacks-title">Feedbacks</h3>
          <div>
            <p data-testid="feedback-total-score">{`Score: ${score}`}</p>
            <p data-testid="feedback-total-question">{`Assertions: ${assertions}`}</p>
            <strong
              data-testid="feedback-text"
              className={ assertions < MIN_ASSERTIONS ? 'fail' : 'success' }
            >
              {assertions < MIN_ASSERTIONS ? 'Could be better...' : 'Well Done!'}
            </strong>
          </div>
          <section className="buttons">
            <button
              className="button-64"
              data-testid="btn-ranking"
              onClick={ handleRanking }
            >
              <span>Ranking</span>
            </button>
            <button
              className="button-64"
              data-testid="btn-play-again"
              onClick={ handlePlayAgain }
            >
              <span>Play Again</span>
            </button>
          </section>
        </section>
      </main>
    </>
  );
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Feedback;
