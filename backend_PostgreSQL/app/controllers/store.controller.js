const db = require("../models");
const Store = db.stores;
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');


exports.findAll = async function(req, res) {

  try {
    const data = await Store.findAll()
    res.send(data);

  } catch (error) {
    res.status(500).send({
        message: error.message || "Some error occured while retrieving Store",
    });
  }
};

exports.findAllCounties = async function(req, res) {

  try {
    const county = req.params.county;

    const data = await Store.findAll({
      attributes: [Sequelize.fn('DISTINCT', Sequelize.col('county')), 'county'],
      order: [['county', 'ASC']],
    })
    res.send(data);

  } catch (error) {
    res.status(500).send({
        message: error.message || "Some error occured while retrieving Store",
    });
  } 

};


exports.findByCounty = async function(req, res) {

  try {
      const { county } = req.params;

      const data = await Store.findAll({
          attributes: ['id','license', 'name', 'county', 'sales'],
          where: {
              county: { [Op.like]: county }
          },
          order: [['name', 'ASC']],
        })
      res.send(data);

  } catch (error) {
      res.status(500).send({
          message: error.message || "Some error occured while retrieving Store",
      });
  }
};


exports.findByCompanyId = async function(req, res) {

  try {
      const { id } = req.params;
      const data = await Store.findAll({ 
          where: {id: id} 
      })
      res.send(data);

  } catch (error) {
      res.status(500).send({
          message: error.message || "Some error occured while retrieving Store",
      });
  }
};

