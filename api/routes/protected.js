const router = require("express").Router();

router.get("/", async (req, res) => {
  console.log(req.user);
  return res.status(200).json({ message: "success" });
});

module.exports = router;
