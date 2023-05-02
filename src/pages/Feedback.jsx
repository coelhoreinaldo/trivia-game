/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { resetUser } from '../redux/actions/action';
import './Feedback.css';

class Feedback extends Component {
  userHitAndInfo = () => {
    let { email } = this.props;
    const { name, score } = this.props;
    email = email.trim();
    email = email.toLowerCase();
    const emailToLink = md5(email).toString();
    const urlIMG = `https://www.gravatar.com/avatar/${emailToLink}`;
    return {
      urlIMG,
      name,
      score,
    };
  };

  handlePlayAgain = () => {
    const { history, dispatch } = this.props;
    history.push('/');

    const rankingLS = JSON.parse(localStorage.getItem('rankingTrivia'));
    if (!rankingLS) {
      localStorage
        .setItem('rankingTrivia', JSON.stringify([this.userHitAndInfo()]));
    } else {
      localStorage
        .setItem('rankingTrivia', JSON.stringify([...rankingLS, this.userHitAndInfo()]));
    }

    dispatch(resetUser());
  };

  handleRanking = () => {
    const { history, dispatch } = this.props;
    history.push('/ranking');

    const rankingLS = JSON.parse(localStorage.getItem('rankingTrivia'));
    if (!rankingLS) {
      localStorage
        .setItem('rankingTrivia', JSON.stringify([this.userHitAndInfo()]));
    } else {
      localStorage
        .setItem('rankingTrivia', JSON.stringify([...rankingLS, this.userHitAndInfo()]));
    }

    dispatch(resetUser());
  };

  render() {
    const MIN_ASSERTIONS = 3;
    const { assertions, score } = this.props;
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
                className={
                  assertions < MIN_ASSERTIONS ? 'fail' : 'success'
                }
              >
                {
                  assertions < MIN_ASSERTIONS ? 'Could be better...' : 'Well Done!'
                }
              </strong>
            </div>
            <section className="buttons">
              <button
                className="button-64"
                data-testid="btn-ranking"
                onClick={ this.handleRanking }
              >
                <span>Ranking</span>
              </button>
              <button
                className="button-64"
                data-testid="btn-play-again"
                onClick={ this.handlePlayAgain }
              >
                <span>Play Again</span>
              </button>
            </section>
          </section>
        </main>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ player }) => ({
  email: player.gravatarEmail,
  name: player.name,
  score: player.score,
  assertions: player.assertions,
});

export default connect(mapStateToProps)(Feedback);
