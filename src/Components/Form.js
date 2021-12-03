import React, { useState, useEffect } from 'react';
import APIService from './APIService';

function Form(props) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    setTitle(props.article.title);
    setBody(props.article.body);
  }, [props.article]);

  const updateArticle = () => {
    APIService.UpdateArticle(props.article.id, { title, body })
      .then(response => props.updatedData(response))
      .catch(err => console.log(err));
  };

  const insertArticle = () => {
    APIService.InsertArticle({ title, body })
      .then(response => props.insertedArticle(response))
      .catch(err => console.log(err));
  };

  return (
    <div>
      {props.article ? (
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            value={title}
            type="text"
            className="form-control"
            placeholder="Please enter title"
            onChange={e => setTitle(e.target.value)}
          />
          <label htmlFor="body" className="form-label">
            Description
          </label>
          <textarea
            value={body}
            rows="5"
            className="form-control"
            placeholder="Please enter description"
            onChange={e => setBody(e.target.value)}
          />
          {props.article.id ? (
            <button className="btn btn-success mt-3" onClick={updateArticle}>
              Update
            </button>
          ) : (
            <button className="btn btn-success mt-3" onClick={insertArticle}>
              Add
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Form;
