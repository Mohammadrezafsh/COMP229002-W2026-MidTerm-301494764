var express = require('express');
var router = express.Router();

let usersController = require('../controllers/users');

/* GET list of items */
router.get('/', usersController.usersList);
router.get('/:id', usersController.getByID);

// Routers for edit
router.put('/:id', usersController.processEdit);

// Delete
router.delete('/:id', usersController.performDelete);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/', usersController.processAdd);

module.exports = router;