import './UserArticlesInfo.css';
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function UserArticlesInfo({ articles }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [savedArticlesInfo, setSavedArticlesInfo] = React.useState('');
  const [articleCount, setArticleCount] = React.useState('');
  const [articlesSortedTags, setArticlesSortedTags] = React.useState({});

  const counter = articles.length;

  React.useEffect(() => {
    const keywords = {};

    articles.forEach((article) => {
      if (article.keyword in keywords) {
        keywords[article.keyword] += 1;
      } else {
        keywords[article.keyword] = 1;
      }
    });

    const articlesSorted = Object.keys(keywords).sort((a, b) => {
      return keywords[b] - keywords[a];
    });

    setArticlesSortedTags(articlesSorted);

    if (articlesSorted.length <= 3) {
      const articlesKeyword = articlesSorted.join(', ');
      setSavedArticlesInfo(articlesKeyword);
    } else {
      const articlesKeyword = `${articlesSorted[0]}, ${articlesSorted[1]} `;
      const articleCountElse = ` ${articlesSorted.length - 2}-м другим`;
      setSavedArticlesInfo(articlesKeyword);
      setArticleCount(articleCountElse);
    }
  }, [articles]);

  return (
    <div className="user-info">
      <h5 className="user-info__title">Сохранённые статьи</h5>
      <h2 className="user-info__main-info">
        {currentUser.name}, у вас {counter} сохранённых статей
      </h2>
      <p className="user-info__additional-info">
        По ключевым словам:
        <span className="user-info__additional-info_font_bold">
          {' '}
          {savedArticlesInfo}
        </span>
        {articlesSortedTags.length > 3 && 'и' && (
          <span className="user-info__additional-info_font_bold">
            {articleCount}
          </span>
        )}
      </p>
    </div>
  );
}

export default UserArticlesInfo;
