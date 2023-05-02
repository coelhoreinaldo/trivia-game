import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <a href="https://github.com/coelhoreinaldo" target="_blank" rel="noreferrer">
          <i className="ri-github-fill" />
          {' '}
        </a>
        <a href="https://www.linkedin.com/in/coelhoreinaldo/" target="_blank" rel="noopener noreferrer">
          {' '}
          <i className="ri-linkedin-box-fill" />
        </a>
      </footer>
    );
  }
}

export default Footer;
