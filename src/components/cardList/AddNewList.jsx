// AddNewList
import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { v6 as uuidv6 } from "uuid";
/* -------------------------------------------------------------------------- */
import { useState, useContext, useEffect } from "react";
import TodoContext from "../../contexts/TodoContext";
export default function AddNewList() {
  console.log("***** AddNewList Renderd ****");
  const {
    btnsClick,
    setBtnsClick,
    taskData,
    setTaskData,
    allTasks,
    setAllTasks,
  } = useContext(TodoContext);
  return (
    <div className="add-new-list-section">
      <div
        className="inner"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          paddingTop: "4rem",
          zIndex: "1000"
        }}>
        <h2>Add New List</h2>
        <input
          type="text"
          value={
            allTasks.filter((task) => task.isEditingNow).length > 0
              ? allTasks.filter((task) => task.isEditingNow)[0].content
              : taskData.content
          }
          onChange={(e) => {
            setTaskData({ ...taskData, content: e.target.value, id: uuidv6() });
          }}
          id="add-list-input"
          placeholder="Add New List"
          style={{
            margin: "5rem 0",
            width: "90%",
            border: "none",
            outline: "none",
            borderRadius: "10px",
            padding: "1rem",
            color: "green",
            minHeight: "100px",
            backgroundColor: "rgba(255, 255, 255, 0.135)",
          }}
        />
        <section
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2vw",
          }}>
          <Button
            variant="contained"
            color="error"
            endIcon={<DeleteIcon />}
            style={{
              border: "none",
              outline: "none",
              borderRadius: "10px",
            }}
            onClick={() => {
              setTaskData({ ...taskData, content: "" });
            }}>
            reset
          </Button>
          <Button
            variant="contained"
            color="success"
            endIcon={<SendIcon />}
            style={{
              border: "none",
              outline: "none",
              borderRadius: "10px",
            }}
            /* ---------------------------- send ---------------------------------------------- */
            onClick={() => {
              if (taskData.content === "") return;
              setAllTasks([...allTasks, taskData]);
              setBtnsClick({
                ...btnsClick,
                isAddNewListBtnClicked: !btnsClick.isAddNewListBtnClicked,
              });
            }}>
            Submit
          </Button>
          <Button
            variant="contained"
            color="warning"
            endIcon={<SendIcon />}
            style={{
              border: "none",
              outline: "none",
              borderRadius: "10px",
              // width: "100%",
            }}
            onClick={() => {
              setBtnsClick({
                ...btnsClick,
                isAddNewListBtnClicked: !btnsClick.isAddNewListBtnClicked,
              });
            }}>
            Cancle
          </Button>
        </section>
      </div>
    </div>
  );
}
