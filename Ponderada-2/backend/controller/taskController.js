const taskService = require("../service/taskService");

require("express-async-errors");

const createTask = (req, res) => {
  //Pega as infos da requisição
  const {id, title, dir, date, description } = req.body;

  //Instancia a classe criando uma vaga
  const task = new taskService.Task(id,title, dir, description, date);

  //Tratamento das respostas do método da classe

  task.createTask().then((resul) => {
    if (resul.type === "error") {
      res.status(500).json({
        error: resul.message,
      });
    } else {
      res.status(200).json({
        message: resul.message,
        task: resul,
      });
    }
  });
};

const getTasks = (req, res) => {
  //Tratamento das respostas do método da classe
  const task = new taskService.Task();

  task.getTasks().then((resul) => {
    if (resul.type === "error") {
      res.status(500).json({
        error: resul.message,
      });
    } else {
      res.status(200).json({
        message: resul.message,
        task: resul,
      });
    }
  });
};

const deleteAll = (req, res) => {
  const task = new taskService.Task();

  task.deleteAll().then((resul) => {
    if (resul.type === "error") {
      res.status(500).json({
        error: resul.message,
      });
    } else {
      res.status(200).json({
        message: resul.message,
      });
    }
  });
};

const deleteTask = (req, res) => {
  const { id } = req.body;
  const task = new taskService.Task(id);
  task.deleteTask().then((resul) => {
    if (resul.type === "error") {
      res.status(500).json({
        error: resul.message,
      });
    } else {
      res.status(200).json({
        message: resul.message,
      });
    }
  });
};

const updateTask = (req, res) => {
  const {id, title, dir,  description, date, completed,important } = req.body;
  
  const task = new taskService.Task(id, title, dir, description, date, completed,important);
  
  task.updateTask().then((resul) => {
    if (resul.type === "error") {
      res.status(500).json({
        error: resul.message,
      });
    } else {
      res.status(200).json({
        message: resul.message,
      });
    }
  });
};

const importantTask = (req, res) => {
  const { id, important } = req.body;
  const task = new taskService.Task();
  task.importantTask(id,important).then((resul) => {
    if (resul.type === "error") {
      res.status(500).json({
        error: resul.message,
      });
    } else {
      res.status(200).json({
        message: resul.message,
      });
    }
  });
};


const completedTask = (req, res) => {
  const { id, completed } = req.body;
  const task = new taskService.Task();
  task.completedTask(id,completed).then((resul) => {
    if (resul.type === "error") {
      res.status(500).json({
        error: resul.message,
      });
    } else {
      res.status(200).json({
        message: resul.message,
      });
    }
  });
};

//Exporta as funções do controller para o ROUTER
module.exports = {
  createTask,
  getTasks,
  deleteAll,
  updateTask,
  deleteTask,
  importantTask,
  completedTask
};
