const Hidden = require("../services/hiddenProperty");

const listHidden = async (req, res) => {
  try {
    const hidden = await Hidden.list();
    res.json({
      hidden,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const listHiddenByType = async (req, res) => {
 
  try {
    const { query } = req;
    const hidden = await Hidden.listByType(query);

    // const product = await getProduct(id)
    res.status(201).send({
      hidden,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const getHidden = async (req, res) => {
 
  try {
    const hidden = await Hidden.getById(req.params.id);
  res.status(201).send({
      hidden,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const getHiddenByUser = async (req, res) => {
  try {
    const hidden = await Hidden.getByUser(req.params.user);
  res.status(201).send({
      hidden,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const addHidden = async (req, res) => {
  try {
    const { body } = req;
    console.log(body)
    const hidden = await Hidden.create(body);
    res.status(200).json(hidden);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const removeProperty = async (req, res) => {
  try {
    const { body } = req;
    const hidden = await Hidden.removeItem(body);
    res.status(200).json(hidden);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const emptyHidden = async (req, res) => {
  console.log("res",req)
  try {
    const { id } = req.body;
    const hidden = await Hidden.empty(id);
    res.json({
      hidden,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = {
  listHidden,
  emptyHidden,
  addHidden,
  getHidden,
  removeProperty,
  getHiddenByUser,
  listHiddenByType
};
