import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const MIN_ASSERTIONS = 3;
    const { assertions, score, history } = this.props;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">Feedbacks</h1>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <p data-testid="feedback-text">
          {
            assertions < MIN_ASSERTIONS ? 'Could be better...' : 'Well Done!'
          }

        </p>
        <button
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          VER RANKING
        </button>
        <button
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ player }) => ({
  email: player.gravatarEmail,
  name: player.name,
  score: player.score,
  assertions: player.assertions,
});

export default connect(mapStateToProps)(Feedback);
