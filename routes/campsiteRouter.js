const express = require("express");
const Campsite = require("../models/campsite");

const campsiteRouter = express.Router();

campsiteRouter
  .route("/")
  .get((req, res, next) => {
    Campsite.find()
      .then((campsites) => {
        require.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(campsites);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Campsite.create(req.body)
      .then((campsite) => {
        console.log("Campsite Created ", campsite);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(campsite);
      })
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /campsites");
  })
  .delete((req, res, next) => {
    Campsite.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
      })
      .catch((err) => next(err));
  });

campsiteRouter
  .route("/:campsiteId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(`Sending campsite with id of ${req.params.campsiteId}`);
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `This operation for adding campsite with id ${req.params.campsiteId} is not supported`
    );
  })
  .put((req, res) => {
    res.end(
      `updating campsite with id ${req.body.name} and description as ${req.body.description} for id ${req.params.campsiteId}`
    );
  })
  .delete((req, res) => {
    res.end(`Deleting campsite with id ${req.params.campsiteId}`);
  });

module.exports = campsiteRouter;
