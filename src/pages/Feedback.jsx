import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { resetUser } from '../redux/actions/action';

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

  handleClick = ({ target }) => {
    const { history, dispatch } = this.props;
    if (target.value === 'ranking') {
      history.push('/ranking');
    } else {
      history.push('/');
    }

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
      <div>
        <Header />
        <h1>Feedbacks</h1>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <p data-testid="feedback-text">
          {
            assertions < MIN_ASSERTIONS ? 'Could be better...' : 'Well Done!'
          }

        </p>
        <button
          data-testid="btn-ranking"
          onClick={ (e) => this.handleClick(e) }
          value="ranking"
        >
          VER RANKING
        </button>
        <button
          data-testid="btn-play-again"
          onClick={ (e) => this.handleClick(e) }
          value="play-again"
        >
          Play Again
        </button>
      </div>
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
