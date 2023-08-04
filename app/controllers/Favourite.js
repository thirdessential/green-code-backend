const favourite = require("../services/favourite");
const Favourite = require("../services/favourite");

const listFavourite = async (req, res) => {
  try {
    const favourite = await Favourite.list();
    res.json({
      favourite,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
// const listCartPropertiesByType = async (req, res) => {
//     try {
//       const { body } = req;
//       const properties = await Cart.listByType(req.params.id,body);
  
//       // const product = await getProduct(id)
//       res.status(201).send({
//         properties,
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).send(err);
//     }
//   };
const listFavouriteByType = async (req, res) => {
 
  try {
    const { query } = req;
    const favourite = await Favourite.listByType(query);

    // const product = await getProduct(id)
    res.status(201).send({
      favourite,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const getFavourite = async (req, res) => {
 
  try {
    const favourite = await Favourite.getById(req.params.id);
  res.status(201).send({
      favourite,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const getFavouriteByUser = async (req, res) => {
  try {
    const favourite = await Favourite.getByUser(req.params.user);
  res.status(201).send({
      favourite,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const addFavourite = async (req, res) => {
  try {
    const { body } = req;
    const favourite = await Favourite.create(body);
    res.status(200).json(favourite);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const removeProperty = async (req, res) => {
  try {
    const { body } = req;
    const favourite = await Favourite.removeItem(body);
    res.status(200).json(favourite);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const emptyFavourite = async (req, res) => {
  try {
    const { id } = req.params;
    const favourite = await Favourite.empty(id);
    res.json({
      favourite,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = {
  listFavourite,
  emptyFavourite,
  addFavourite,
  getFavourite,
  removeProperty,
  getFavouriteByUser,
  listFavouriteByType
};
