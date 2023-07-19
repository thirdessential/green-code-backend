const Forms = require("../services/contactForm");

const listForm = async (req, res) => {
  try {
    const form = await Forms.list();
    res.json({
      form,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getForm = async (req, res) => {
  try {
    const form = await Forms.getById(req.params.id);
    res.status(201).send({
      form,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const addForm = async (req, res) => {
  try {
    const { body } = req;
    const form = await Forms.create(body);
    res.status(200).json(form);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const getFormsByAgent = async (req, res) => {
  try {
    const form = await Forms.getByAgent(req.params.id);
    res.status(201).send({
      form,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = {
  listForm,
  getFormsByAgent,
  addForm,
  getForm,
};
