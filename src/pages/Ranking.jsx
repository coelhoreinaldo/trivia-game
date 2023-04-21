import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const rankingLS = JSON.parse(localStorage.getItem('rankingTrivia'));
    rankingLS.sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1 data-testid="ranking-title">RANKING</h1>

        <div>
          {
            rankingLS.map((user, index) => (
              <div key={ index }>
                <img
                  src={ user.urlIMG }
                  alt="Imagem do participante"
                />
                <p data-testid={ `player-name-${index}` }>{user.name}</p>
                <p data-testid={ `player-score-${index}` }>{user.score}</p>
              </div>
            ))
          }
        </div>

        <button
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
