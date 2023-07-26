const Agent = require("../services/agent");

const listAgent = async (req, res) => {
  try {
    const agent = await Agent.list();
    res.json({
      agent,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getAgent = async (req, res) => {
  try {
    const agent = await Agent.getById(req.params.id);
    res.status(201).send({
      agent,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const addAgent = async (req, res) => {
  try {
    const { body } = req;
    const agent = await Agent.create(body);
    res.status(200).json(agent);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const TakeProperty = async (req, res) => {
  try {
    const { body } = req;
    const agent = await Agent.takeProperty(body);
    res.status(200).json(agent);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const editAgent = async (req, res) => {
  try {
    const { body } = req;
    const agent = await Agent.edit(req.params.id, body);
    res.json({
      agent,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = {
  listAgent,
  editAgent,
  addAgent,
  getAgent,
  TakeProperty
};
