const express = require("express");
const campsiteRouter = express.Router();

campsiteRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send all the campsites to you");
  })
  .post((req, res) => {
    res.end(
      `Will add the campsite: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /campsites");
  })
  .delete((req, res) => {
    res.end("Deleting all campsites");
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
