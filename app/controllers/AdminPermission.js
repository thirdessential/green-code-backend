const AdminPermission = require("../services/adminPermission");

const listPermission = async (req, res) => {
  try {
    const adminPermission = await AdminPermission.list();
    res.json({
        adminPermission,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const addPermission = async (req, res) => {
  try {
   
    const { body } = req;
    const adminPermission = await AdminPermission.create(body);
    res.status(200).json(adminPermission);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};



module.exports = {
  listPermission,

  addPermission,
 
};
