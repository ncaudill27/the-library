import React from 'react';
import { NavLink } from 'react-router-dom';

const Thread = ({id, title, lastComment, clubSlug}) => {
  const lastUpdate = lastComment.posted.toLocaleString('en-US')
  return (
    <div className='Thread'>
      <h3>
        <NavLink
          to={`/${clubSlug}/${id}`}
          exact
        >{title}</NavLink>
      </h3>
      <p><strong>Last comment:</strong> {lastUpdate}</p>
      <p>{lastComment.content}</p>
    </div>
  );
}
export default Thread;