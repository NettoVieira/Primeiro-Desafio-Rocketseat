const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require('uuidv4');

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const {title, url, techs, likes = 0} = request.body;

  const repository = {id: uuid(), title, url, techs, likes};

  repositories.push(repository);

  return response.json([ repository ]);

});

app.put("/repositories/:id", (request, response) => {
   
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json( { error: 'repository not found' } );
  };

  const repository = {
    id,
    title,
    url,
    techs
  };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
 
});


app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  repositories.splice(repositories.indexOf(id), 1);

  return response.status(200).json(repositories);

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
