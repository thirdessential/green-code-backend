const HelpRequest = require("../services/help_request");

const listHelpRequest = async (req, res) => {
   
  try {
    const helpRequest = await HelpRequest.list();
    res.json({
        helpRequest,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getHelpRequest = async (req, res) => {
 
  try {
    const helpRequest= await HelpRequest.getById(req.params.id);
  res.status(201).send({
    helpRequest,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const addHelpRequest = async (req, res) => {
  try {
    const { body } = req;
    const helpRequest = await HelpRequest.create(body);
    res.status(200).json(helpRequest);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const editHelpRequest = async (req, res) => {
  try {
    const { body } = req;
    const helpRequest = await HelpRequest.edit(req.params.id, body);
    res.json({
        helpRequest,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = {
  listHelpRequest,
  editHelpRequest,
  addHelpRequest,
  getHelpRequest
};
