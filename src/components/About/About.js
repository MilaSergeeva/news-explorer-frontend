import './About.css';
import React from 'react';

import avatar from '../../images/avatar.png';

function About() {
  const userInfo =
    'Это блок с описанием автора проекта. Здесь следует указать, как вас зовут, чем вы занимаетесь, какими технологиями разработки владеете. Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем можете помочь потенциальным заказчикам. ';

  return (
    <div className="profile__container">
      <img className="profile__avatar" src={avatar} alt="Аватар" />
      <div className="profile__about">
        <h3 className="profile__title">Об авторе</h3>
        <p className="profile__context">{userInfo}</p>
      </div>
    </div>
  );
}

export default About;
