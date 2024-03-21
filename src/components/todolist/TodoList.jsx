import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import Aos from "aos";
import { toast } from "react-toastify";
import "./TodoList.css";
import TodoItem from "../todoitems/TodoItem";
export default function TodoList() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [todoData, setTodoData] = useState([]);
  const [task, setTask] = useState("");
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");
  const [taskCompleted, setCompletedTask] = useState([]);
  useEffect(() => {
    Aos.init({ duration: 2000 });
    // To get todoData array from local storage
    let todoDatas = localStorage.getItem("todoData");
    if (todoDatas) {
      let data = JSON.parse(todoDatas);
      setTodoData(data);
      let filterData = data.filter((todo) => todo.completed == true);
      setCompletedTask(filterData);
    }
  }, [todoData]);

  //   To add task
  const handleAdd = () => {
    let todoArry = {
      id: uuidv4(),
      title: task,
      isEdit: false,
      completed: false,
    };
    let temp = [...todoData];
    temp.push(todoArry);
    setTodoData(temp);
    localStorage.setItem("todoData", JSON.stringify(temp));
    if (task) {
      toast.success("Task Added");
    }
    setTask("");
  };
  //   To delete task
  const handleDelete = (id) => {
    let temp = [...todoData];
    let deleteData = temp.filter((todo) => todo.id !== id);
    localStorage.setItem("todoData", JSON.stringify(deleteData));
    setTodoData(deleteData);
    toast.success("Task Deleted");
  };
  //   To handle completed task
  const handleCompleted = (id) => {
    let temp = [...todoData];
    const newTodos = temp.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodoData(newTodos);
    localStorage.setItem("todoData", JSON.stringify(newTodos));
    toast.success("Task Completed");
  };
  //   To edit task
  const handleEdit = (index, item) => {
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  };
  //   To get previously added task
  const handleUpdatetitle = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, title: value };
    });
  };
  //   To update task
  const handleUpdated = () => {
    let temp = [...todoData];
    temp[currentEdit] = currentEditedItem;
    setTodoData(temp);
    localStorage.setItem("todoData", JSON.stringify(temp));
    setCurrentEdit("");
    toast.success("Task Updated");
  };
  return (
    <>
      <div className="todo-container" data-aos="fade-up">
        <h1>Todo App</h1>
        <div className="todo-content">
          <div className="todo-input">
            <Box
              sx={{
                maxWidth: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
              md={{
                width: 600,
                maxWidth: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <TextField
                fullWidth
                placeholder="Enter the Task"
                id="fullWidth"
                color="secondary"
                style={{ background: "white" }}
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <Button color="success" variant="contained" onClick={handleAdd}>
                Add
              </Button>
            </Box>
          </div>
        </div>
        <div className="btn-container">
          <Button
            variant={`${isCompleted === false && "contained"}`}
            onClick={() => setIsCompleted(false)}
          >
            Todo
          </Button>
          <Button
            variant={`${isCompleted === true && "contained"}`}
            onClick={() => setIsCompleted(true)}
          >
            Completed
          </Button>
        </div>
        <div className="todo-lists">
          <TodoItem
            isCompleted={isCompleted}
            todoData={todoData}
            currentEdit={currentEdit}
            handleUpdatetitle={handleUpdatetitle}
            handleUpdated={handleUpdated}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleCompleted={handleCompleted}
            taskCompleted={taskCompleted}
            currentEditedItem={currentEditedItem}
          />
        </div>
      </div>
    </>
  );
}
