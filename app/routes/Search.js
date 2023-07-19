const Search = require("../controllers/Search");
const { authenticateJWT, authenticateJWTAdmin } = require("../middlewares.js");
const router = require("express").Router();
router.post("/:userId", authenticateJWT, Search.addSearch);
router.get("/", Search.listSearch);
router.get("/getById/:id", Search.getSearch);
router.put("/:id", authenticateJWT, Search.getSearchByUser);
module.exports = router;
