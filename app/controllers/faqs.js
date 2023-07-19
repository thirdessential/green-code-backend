const Faqs = require("../services/faqs");

const listFaqs = async (req, res) => {
  try {
    const faqs = await Faqs.list();
    res.json({
      faqs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getFaqs = async (req, res) => {
  try {
    const faqs = await Faqs.getById(req.params.id);
  res.status(201).send({
      faqs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const addFaqs = async (req, res) => {
  try {
    const { body } = req;
    const faqs = await Faqs.create(body);
    res.status(200).json(faqs);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const editFaqs = async (req, res) => {
  try {
    const { body } = req;
    const faqs = await Faqs.edit(req.params.id, body);
    res.json({
      faqs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = {
  listFaqs,
  editFaqs,
  addFaqs,
  getFaqs
};
