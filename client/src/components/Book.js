import React from 'react';

function Book(props) {
  return (
    <li>
      <h3>{props.title}</h3>
      <img src={props.src} alt={props.title + " Cover Picture"} />
      <h4>{props.author}</h4>
      <p>{props.description}</p>
    </li>
  );
}

Book.defaultProps = {
  title: "Title Missing",
  author: "Author Missing",
  src: "https://www.google.com/url?sa=i&url=https%3A%2F%2Freadtiger.com%2Fwkp%2Fen%2FBook%3AJulia_Lee&psig=AOvVaw0DuqWZ0Te6nFrmVXIIVetb&ust=1586286067381000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLjg6Z--1OgCFQAAAAAdAAAAABAD",
  description: "No description posted"
}

export default Book;