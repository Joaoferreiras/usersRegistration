const express = require("express");
const uuid = require("uuid");
const port = 3001;
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(cors());

const users = [];

server.get("/users", (request, response) => {
  return response.json(users);
});

server.post("/users", (request, response) => {
  const { name, age } = request.body;
  const newUser = { id: uuid.v4(), name, age };
  users.push(newUser);

  return response.status(201).json(newUser);
});

server.delete("/users/:id", (request, response) => {
  const { id } = request.params;
  const index = users.findIndex((user) => user.id === id);
  if (index < 0) {
    return response.status(400).json({ message: "user not found" });
  }
  users.splice(index, 1);

  return response.status(204).json();
});

server.listen(port, () => {
  console.log(`🚀 server started on port ${port}`);
});
