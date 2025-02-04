const express = require("express");
const router = express.Router();
const tasks = require("../controllers/task.controller");
const taskSchema = require("../schemas/task.schema");
const validate = require("../middlewares/validate.middleware");
const verifyToken = require("../middlewares/auth.middleware");

router.use(verifyToken);
router.get("/findAll", tasks.findAll);
router.get("/findOne/:taskId", tasks.findOne);
router.post("/create", validate(taskSchema.createTaskSchema), tasks.create);
router.put("/update/:taskId", validate(taskSchema.createTaskSchema), tasks.update);

module.exports = router;
