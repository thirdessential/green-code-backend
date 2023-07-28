const PriceHistory = require("../services/PriceHistory");



const getPriceHistoryByProperty = async (req, res) => {
    console.log(req.params)
  try {
    const priceHistory = await PriceHistory.getByPropertyId(req.params.id);
  res.status(201).send({
    priceHistory
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};


module.exports = {
    getPriceHistoryByProperty
};
