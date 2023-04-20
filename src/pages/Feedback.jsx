import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">Feedbacks</h1>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player }) => ({
  email: player.gravatarEmail,
  name: player.name,
  score: player.score,
  assertions: player.assertions,
});

export default connect(mapStateToProps)(Feedback);
