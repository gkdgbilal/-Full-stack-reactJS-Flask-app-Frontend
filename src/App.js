import './App.css';
import React, { useState, useEffect } from 'react';
import ArticleList from './Components/ArticleList';
import Form from './Components/Form';

function App() {
  const [articles, setArticles] = useState([]);
  const [editedArticle, setEditedArticle] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setArticles(data))
      .catch(err => console.error(err));
  }, []);

  const editArticle = article => {
    setEditedArticle(article);
  };

  const updatedData = article => {
    const new_article = articles.map(my_article => {
      if (my_article.id === article.id) {
        return article;
      } else {
        return my_article;
      }
    });
    setArticles(new_article);
  };

  const openForm = () => {
    setEditedArticle({ title: '', body: '' });
  };

  const insertedArticle = article => {
    const new_articles = [...articles, article];
    setArticles(new_articles);
  };

  const deleteArticle = article => {
    const new_articles = articles.filter(my_article => {
      if (my_article.id === article.id) {
        return false;
      } else {
        return true;
      }
    });
    setArticles(new_articles);
  };

  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <h1>Flask and ReactJS Course</h1>
        </div>
        <div className="col">
          <button className="btn btn-success" onClick={openForm}>
            Insert Article
          </button>
        </div>
      </div>
      <ArticleList
        articles={articles}
        editArticle={editArticle}
        deleteArticle={deleteArticle}
        article={editedArticle}
        updatedData={updatedData}
        insertedArticle={insertedArticle}
        editedArticle={editedArticle}
      />
      {editedArticle ? (
        <Form
          article={editedArticle}
          updatedData={updatedData}
          insertedArticle={insertedArticle}
        />
      ) : null}
    </div>
  );
}

export default App;
