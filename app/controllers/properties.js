const propertiesService = require("../services/properties");
const axios = require("axios");
const listProperties = async (req, res) => {
  try {
    const properties = await propertiesService.list();
    res.json({
      properties,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const listPropertiesByType = async (req, res) => {
  try {
    const { query } = req;
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
const listSuggestedProperties = async (req, res) => {
  try {
    const { query } = req;
    const properties = await propertiesService.suggestedProp(query);

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
  try {
    const property = await propertiesService.getById(req.params.id);
    res.status(201).send({
      property,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const deleteProperty = async (req, res) => {
  try {
    const property = await propertiesService.remove(req.params.id);
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

const getNearBySchools = async (req, res) => {
  try {
    const response = await axios.get(req.query.url);
    console.log(response);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const priceEvaluation = async (req, res) => {
//   try {
//     const { query, headers } = req;
//     let config = {
//       method: "get",
//       rejectUnauthorized: false,
//       maxBodyLength: Infinity,
//       url: "https://api.gateway.attomdata.com/propertyapi/v1.0.0/valuation/homeequity",
//       headers: headers,
//       params:query,
//     };
//     const property = await axios.request(config);
//     res.json({
//       property,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// };

module.exports = {
  listProperties,
  editProperties,
  addProperties,
  getProperty,
  getNearBySchools,
  deleteProperty,
  listSuggestedProperties,
  // priceEvaluation,
  listPropertiesByType,
};
