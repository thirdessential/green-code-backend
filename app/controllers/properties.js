const propertiesService = require("../services/properties");

const listProperties = async (req, res) => {
  try {
    const properties = await propertiesService.list();
    // const product = await getProduct(id)
    res.json({
      properties,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const listPropertiesByType = async (req, res) => {
    console.log(req.params)
  try {
   const {query}=req
    const properties = await propertiesService.listByType(query);
   
    // const product = await getProduct(id)
    res.status(201).send({
      properties,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const getProperty = async (req, res) => {
  console.log("get by id");
  try {
    const property = await propertiesService.getById(req.params.id);
    // const product = await getProduct(id)
  res.status(201).send({
      property,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const addProperties = async (req, res) => {
  try {
  
    const { body } = req;
    const property = await propertiesService.create(body);
    res.status(200).json(property);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const editProperties = async (req, res) => {
  try {
    const { body } = req;
    const property = await propertiesService.edit(req.params.id, body);
    res.json({
      property,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = {
  listProperties,
  editProperties,
  addProperties,
  getProperty,
  listPropertiesByType
};
