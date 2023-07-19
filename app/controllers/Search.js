const Search = require("../services/search");

const listSearch = async (req, res) => {
  try {
    const search = await Search.list();
    res.json({
      search,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getSearch = async (req, res) => {
  try {
    const search = await Search.getById(req.params.id);
    res.status(201).send({
      search,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const addSearch = async (req, res) => {
  try {
    const { body, params } = req;
    const search = await Search.create(body, params.userId);
    res.status(200).json(search);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const getSearchByUser = async (req, res) => {
  try {
    const search = await Search.getByUser(req.params.id);
    res.json({
      search,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = {
  listSearch,
  getSearchByUser,
  addSearch,
  getSearch,
};
