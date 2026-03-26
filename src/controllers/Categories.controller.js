/* eslint-disable */
const categoriesService = require('../services/categories.service.js');

async function get(req, res) {
  const categories = await categoriesService.getAll();
  return res.send(categories);
}

async function getOne(req, res) {
  const { id } = req.params;

  const category = await categoriesService.getById(id);

  if (!category) {
    res.sendStatus(404);

    return;
  }

  res.send(category);
}

function create(req, res) {
  const { name, type } = req.body;

  if (!name || !type) {
    res.sendStatus(400);

    return;
  }

  const category = categoriesService.create({
    name,
    type,
  });

  res.status(201).send(category);
}

function update(req, res) {
  const { id } = req.params;

  const category = categoriesService.getById(id);

  if (!category) {
    res.sendStatus(404);

    return;
  }

  const updatedCategory = categoriesService.update({ id, ...req.body });

  res.json(updatedCategory);
}

function remove(req, res) {
  const { id } = req.params;

  if (!categoriesService.getById(id)) {
    return res.sendStatus(404);
  }

  categoriesService.remove(id);
  res.sendStatus(204);
}

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
