const router = require("express").Router();
const stadiumController = require("../Contoller/stadiumController");


router.post("/get-stadiums", stadiumController.getStadiums);
router.post("/get-stadiums-search", stadiumController.getStadiumsByName);
router.get("/get-stadium/:sid", stadiumController.getStadiumInfos);


module.exports = router;