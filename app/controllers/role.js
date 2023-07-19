const Role = require("../services/role");

const listRoles = async (req, res) => {
  try {
    const roles = await Role.list();
    // const product = await getProduct(id)
    res.json({
      roles,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const listRoleByType = async (req, res) => {
  console.log(req.params);
  try {
    const { type } = req.params;
    const roles = await Role.getByType(type);
    // const product = await getProduct(id)
    res.status(201).send({
      roles,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const getRoleById = async (req, res) => {
  console.log("get by id");
  try {
    const roles = await Role.getById(req.params.id);
    // const product = await getProduct(id)
    res.status(201).send({
      roles,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const addRole = async (req, res) => {
  try {
    const { body } = req;
    const roles = await Role.create(body);
    res.status(200).json(roles);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const editRole = async (req, res) => {
  try {
    const { body } = req;
    const roles = await Role.edit(req.params.id, body);
    res.json({
      roles,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = {
  listRoles,
  editRole,
  addRole,
  getRoleById,
  listRoleByType,
};
