const Articles = require("../services/articles");

const listArticles = async (req, res) => {
  try {
    const articles = await Articles.list();
    res.json({
      articles,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getArticles = async (req, res) => {
  try {
    const articles = await Articles.getById(req.params.id);
  res.status(201).send({
      articles,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const addArticles = async (req, res) => {
  try {
    const { body } = req;
    const articles = await Articles.create(body);
    res.status(200).json(articles);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const editArticles = async (req, res) => {
  try {
    const { body } = req;
    const articles = await Articles.edit(req.params.id, body);
    res.json({
      articles
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = {
  listArticles,
  editArticles,
  addArticles,
  getArticles
};
