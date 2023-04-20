import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">Feedbacks</h1>
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ player }) => ({
  email: player.gravatarEmail,
  name: player.name,
  score: player.score,
});

export default connect(mapStateToProps)(Feedback);
