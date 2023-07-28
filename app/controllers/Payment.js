const Payment = require("../services/Payment");

const PayPrice = async (req, res) => {
    try {
      const { body } = req;
      const payment = await Payment.create(body);
      res.status(200).json(payment);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  };
const PayRent = async (req, res) => {
    try {
      const { body } = req;
      const payment = await Payment.payRent(body);
      res.status(200).json(payment);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  };
const getPaymentByProperty = async (req, res) => {
    console.log(req.params)
  try {
    const payment = await Payment.getByPropertyId(req.params.id);
  res.status(201).send({
    payment
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};


module.exports = {
    getPaymentByProperty,PayPrice,PayRent
};
