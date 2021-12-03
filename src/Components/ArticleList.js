import React from 'react';
import APIService from './APIService';

export default function ArticleList(props) {
  const editArticle = article => {
    props.editArticle(article);
  };

  const deleteArticle = article => {
    APIService.DeleteArticle(article.id).then(() => {
      props.deleteArticle(article);
    });
  };
  return (
    <div>
      {props.articles &&
        props.articles.map(article => {
          return (
            <div key={article.id}>
              <h2>{article.title}</h2>
              <p>{article.body}</p>
              <p>
                {article.date.slice(0, 10)} - {article.date.slice(12, 19)}
              </p>
              <div className="row">
                <div className="col-md-1">
                  <button
                    className="btn"
                    onClick={() => editArticle(article)}
                    style={{ backgroundColor: '#0F6B77', color: '#f1f1f1' }}
                  >
                    Update
                  </button>
                </div>
                <div className="col">
                  <button
                    className="btn"
                    onClick={() => deleteArticle(article)}
                    style={{ backgroundColor: '#BD3117', color: '#f1f1f1' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
    </div>
  );
}
