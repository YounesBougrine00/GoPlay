const router = require("express").Router();
const userCtrl = require("../Contoller/userController");
const auth = require("../middleware/auth");

router.post("/register", userCtrl.register);

router.post("/login", userCtrl.login);

router.post("/authtoken", userCtrl.getAccessToken);

router.get("/userinfos", auth, userCtrl.getUserInfos);

router.get("/logout", userCtrl.logout);

router.patch("/update-infos", auth, userCtrl.updateUser);

module.exports = router;