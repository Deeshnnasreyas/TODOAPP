import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import "./TodoItem.css";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
export default function TodoItem({
  isCompleted,
  todoData,
  currentEdit,
  handleUpdatetitle = () => {},
  handleUpdated = () => {},
  handleEdit = () => {},
  handleDelete = () => {},
  handleCompleted = () => {},
  taskCompleted,
  currentEditedItem,
}) {
  return (
    <div>
      {isCompleted === false &&
        todoData.map((item, index) => {
          if (currentEdit === index) {
            return (
              <div className="edit-container" key={index}>
                <input
                  placeholder="Updated Task"
                  onChange={(e) => handleUpdatetitle(e.target.value)}
                  value={currentEditedItem.title}
                />
                <Button
                  color="success"
                  variant="contained"
                  onClick={handleUpdated}
                >
                  Update
                </Button>
              </div>
            );
          } else {
            return (
              <div className="todo-item" key={index}>
                <h3>{item.title}</h3>
                <div className="todo-icon">
                  <Tooltip title="Edit">
                    <EditIcon
                      color="primary"
                      onClick={() => handleEdit(index, item)}
                    />
                  </Tooltip>
                  <Tooltip title="Delete">
                    <DeleteForeverIcon
                      color="error"
                      onClick={() => handleDelete(item.id)}
                    />
                  </Tooltip>
                  <Tooltip title="Completed">
                    <Checkbox
                      {...label}
                      color="success"
                      value={item.completed}
                      checked={item.completed === true}
                      onClick={() => handleCompleted(item.id)}
                    />
                  </Tooltip>
                </div>
              </div>
            );
          }
        })}
      {isCompleted === true &&
        taskCompleted.map((item, index) => (
          <div className="todo-item" key={index}>
            <div className="todo-item-data">
              <h3>Task-{item.title}</h3>
              <p>Completed on {moment(item?.date).format("DD/MM/YYYY")}</p>
            </div>
            <div className="todo-icon">
              <Tooltip title="Completed">
                <Checkbox
                  {...label}
                  color="success"
                  checked={item.completed === true}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <DeleteForeverIcon
                  color="error"
                  onClick={() => handleDelete(item.id)}
                />
              </Tooltip>
            </div>
          </div>
        ))}
    </div>
  );
}
