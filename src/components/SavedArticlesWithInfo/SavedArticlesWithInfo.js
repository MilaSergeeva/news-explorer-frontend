import React from 'react';

function SavedArticlesWithInfo({ articles, onToggleClick }) {
  return (
    <div>
      <UserArticlesInfo articles={articles} />
      <SavedNews articles={articles} onToggleClick={onToggleClick} />
    </div>
  );
}

export default SavedArticlesWithInfo;
