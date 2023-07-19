const Tour = require("../services/requestTour");

const listTour = async (req, res) => {
  try {
    const tour = await Tour.list();
    res.json({
      tour,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getTour = async (req, res) => {
  try {
    const tour = await Tour.getById(req.params.id);
    res.status(201).send({
      tour,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const addTour = async (req, res) => {
  try {
    const { body } = req;
    const tour = await Tour.create(body);
    res.status(200).json(tour);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const getTourByAgent = async (req, res) => {
  try {
    const tour = await Tour.getByAgent(req.params.id);
    res.status(201).send({
      tour,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = {
  listTour,
  getTourByAgent,
  addTour,
  getTour
};
