const roles = require("../controllers/role");
const { authenticateJWT, authenticateJWTAdmin } = require("../middlewares.js");
const router = require("express").Router();
router.post("/", authenticateJWTAdmin, roles.addRole);
router.get("/", roles.listRoles);
router.get("/getByType/:type", roles.listRoleByType);
router.get("/getById/:id", roles.getRoleById);
router.put("/:id", authenticateJWTAdmin, roles.editRole);
module.exports = router;
