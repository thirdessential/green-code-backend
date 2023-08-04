const Cities = require("../services/cities");

const listCities = async (req, res) => {
  try {
    const city = await Cities.list();
    res.json({
      city,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const listFilteredCities = async (req, res) => {
    console.log(req.params.category)
  try {
    const city = await Cities.listByCategory(req.params.category);
    res.json({
      city,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};


module.exports = {
  listCities,
  listFilteredCities
};
