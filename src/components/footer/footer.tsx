import React from 'react';
import './footer.scss';
import gitHubLogo from '../../assets/icons/github-icon.svg';
import rsLogo from '../../assets/icons/rs_school_js.svg';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-wrapper">
        <span>&copy; 2021 &#171; Snake Game &#187; Created by Artyom Makarau.</span>
        <ul className="footer__contacts">
          <li>
            <a href="https://github.com/ArtyomMakarov" target="_blank">
              <img src={gitHubLogo} alt="github"/>
            </a>
          </li>
          <li>
            <a href="https://rs.school/js/" target="_blank">
              <img src={rsLogo} alt="RSS School"/>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}