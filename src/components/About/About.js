import './About.css';
import React from 'react';

import avatar from '../../images/avatar_mila.png';

function About() {
  const userInfo = ' ';

  return (
    <div className="profile__container">
      <img className="profile__avatar" src={avatar} alt="Аватар" />
      <div className="profile__about">
        <h3 className="profile__title">About the author</h3>
        <p className="profile__context">
          &nbsp; A few words about myself. Despite my previous experience, at
          some point I decided to develop myself as a web developer. In the
          beginning I studied using free curses, articles and of course YouTube.
          Then I found serious and high-quality training course for web
          developers - Yandex.Praktikum. <br /> In total it took me 10 months to
          graduate. When I had free time I also took part in additional real
          projects. All that gave me good initial knowledge to enter the
          profession. I learned varied tools such as HTML, CSS, JavaScript,
          Express.js, Reakt and Node.js.{' '}
        </p>
        <p className="profile__context">
          &nbsp; I like being able to create something from nothing. Taking a
          visual concept from my imagination and crafting a beautiful object -
          either physical or digital - gives me great satisfaction. I like 3D
          modelling, hands crafting, traveling and snowboarding.
        </p>
      </div>
    </div>
  );
}

export default About;
