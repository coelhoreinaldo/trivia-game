import { connect } from 'react-redux';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  render() {
    let { email } = this.props;
    const { name, score } = this.props;
    email = email.trim();
    email = email.toLowerCase();
    const emailToLink = md5(email).toString();

    return (
      <header className="header">
        <section className="profile">
          <img src={ `https://www.gravatar.com/avatar/${emailToLink}` } alt="userIMG" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{name}</p>
        </section>
        <p data-testid="header-score">{`Score: ${score}`}</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player }) => ({
  email: player.gravatarEmail,
  name: player.name,
  score: player.score,
});

export default connect(mapStateToProps)(Header);
