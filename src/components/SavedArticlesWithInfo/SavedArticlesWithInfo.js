import React from 'react';
import UserArticlesInfo from '../UserArticlesInfo/UserArticlesInfo';
import SavedNews from '../SavedNews/SavedNews';

function SavedArticlesWithInfo({ articles, onToggleClick }) {
  return (
    <div>
      <UserArticlesInfo articles={articles} />
      <SavedNews articles={articles} onToggleClick={onToggleClick} />
    </div>
  );
}

export default SavedArticlesWithInfo;
