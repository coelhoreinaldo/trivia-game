import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Ranking.css';

class Ranking extends Component {
  state = {
    rankingLS: [],
  };

  componentDidMount() {
    const rankingLS = JSON.parse(localStorage.getItem('rankingTrivia'));
    rankingLS.sort((a, b) => b.score - a.score);
    this.setState({
      rankingLS,
    });
  }

  render() {
    const { history } = this.props;
    const { rankingLS } = this.state;
    return (
      <main className="ranking-main">

        <h1 data-testid="ranking-title" className="ranking-title">Ranking</h1>
        <section className="users-ranking">
          {
            rankingLS.map((user, index) => (
              <section
                key={ index }
                className="user"
              >
                <img
                  src={ user.urlIMG }
                  alt="user"
                  className="user-img"
                />
                <section className="name-score">
                  <span data-testid={ `player-name-${index}` }>{user.name}</span>
                  <div className="score-user">
                    <span data-testid={ `player-score-${index}` }>
                      {`Score: ${user.score}`}
                      {' '}
                      <i className="ri-star-fill star" />
                    </span>
                  </div>
                </section>
              </section>
            ))
          }
        </section>

        <button
          className="button-64"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          <span>Play Again</span>
        </button>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
