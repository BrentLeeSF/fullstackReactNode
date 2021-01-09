const express = require("express");
const router = express.Router();
const storeController = require('../controllers/store.controller');

// Retrieve all stores
router.get('/store/findall', storeController.findAll);
router.get('/store/findallcounties', storeController.findAllCounties);
router.get('/store/findbycompanyid/:id', storeController.findByCompanyId);
router.get('/store/findbycounty/:county', storeController.findByCounty);

module.exports = router;

