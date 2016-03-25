/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/menu              ->  index
 * POST    /api/menu              ->  create
 * GET     /api/menu/:id          ->  show
 * PUT     /api/menu/:id          ->  update
 * DELETE  /api/menu/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Menu from './menu.model';
// import fs from 'fs';
// import multiparty from 'multiparty';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Menus
export function index(req, res) {
  Menu.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Menu from the DB
export function show(req, res) {
  Menu.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Updates an existing Menu in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Menu.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Menu from the DB
export function destroy(req, res) {
  Menu.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
