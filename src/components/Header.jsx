import { connect, useDispatch, useSelector } from 'react-redux';
import React from 'react';
import md5 from 'crypto-js/md5';
import './Header.css';

function Header() {
  useDispatch();
  const { email, name, score } = useSelector((state) => state.player);

  let userEmail = email;
  userEmail = email ? userEmail.trim().toLowerCase() : '';
  const emailToLink = md5(userEmail).toString();

  return (
    <header className="header">
      <section className="profile">
        <img src={ `https://www.gravatar.com/avatar/${emailToLink}` } alt="userIMG" data-testid="header-profile-picture" />
        <div>
          <p data-testid="header-player-name">{name}</p>
          <strong data-testid="header-score">{`Score: ${score}`}</strong>
        </div>
      </section>
    </header>
  );
}

const mapStateToProps = ({ player }) => ({
  email: player.gravatarEmail,
  name: player.name,
  score: player.score,
});

export default connect(mapStateToProps)(Header);
