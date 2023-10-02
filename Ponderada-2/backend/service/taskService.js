const { v4: uuid } = require("uuid");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Task {
  constructor(id, title, dir, description, date, completed, important) {
    if(!id){
      this.id = uuid();
    }else{
      this.id = id;
    }
    
    this.title = title;
    this.dir = dir;
    this.description = description;
    this.date = date;
    this.completed = completed;
    this.important = important;
  }

  createTask() {
    return prisma.task.create({
      data: {
        id: this.id,
        title: this.title,
        dir: this.dir,
        description: this.description,
        date: this.date,
        completed: this.completed,
        important: this.important,
      },
    });
  }

  getTasks() {
    return prisma.task.findMany();
  }

  updateTask() {
    return prisma.task.update({
      data: {
        id: this.id,
        title: this.title,
        dir: this.dir,
        description: this.description,
        date: this.date,
        completed: this.completed,
        important: this.important,
      },
      where: {
        id: this.id,
      },
    });
  }

  deleteAll() {
    return prisma.task.deleteMany();
  }
  deleteTask() {
    return prisma.task.delete({
      where: {
        id: this.id,
      },
    });
  }
  importantTask(id, important) {
    return prisma.task.update({
      data: {
        important: important,
      },
      where: {
        id: id,
      },
    });
  }
  completedTask(id, completed) {
    return prisma.task.update({
      data: {
        completed: completed,
      },
      where: {
        id: id,
      },
    });
  }
}

module.exports = { Task };
