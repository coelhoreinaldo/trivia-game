import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Ranking.css';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const rankingLS = JSON.parse(localStorage.getItem('rankingTrivia'));
    rankingLS.sort((a, b) => b.score - a.score);
    return (
      <div className="cointainer-page-ranking">
        <h1 data-testid="ranking-title">RANKING</h1>

        <div className="container-users-ranking">
          {
            rankingLS.map((user, index) => (
              <div
                key={ index }
                className="container-user"
              >
                <img
                  src={ user.urlIMG }
                  alt="Imagem do participante"
                  className="img-user"
                />
                <div className="name-score-user">
                  <span data-testid={ `player-name-${index}` }>{user.name}</span>
                  <div className="score-user">
                    <span data-testid={ `player-score-${index}` }>{user.score}</span>
                    <span className="pts">pts</span>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        <button
          className="ranking-btn"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          JOGAR NOVAMENTE
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
