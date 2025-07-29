//header
import Typography from "@mui/material/Typography";
import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
/* -------------------------------------------------------------------------- */
import TodoContext from "../../contexts/TodoContext";
import { useContext } from "react";

export default function Header() {
  console.log("***** header Renderd ****");
  const {
    btnsClick,
    setBtnsClick,
    taskData,
    setTaskData,
    allTasks,
    setAllTasks,
  } = useContext(TodoContext);

  const [clicked, setClicked] = React.useState("web");
  const handleChange = (event, newAlignment) => {
    setClicked(newAlignment);
  };

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
      }}>
      <Typography
        variant="h3"
        component="div"
        style={{
          fontWeight: "bold",
          position: "relative",
          width: "max-content",
          margin: "1rem auto",
        }}>
        My Tasks
        <span
          id="tasks-count"
          style={{
            position: "absolute",
            top: "0",
            right: "-15%",
            color: "green",
            fontSize: "1rem",
            backgroundColor: "black",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "5px",
          }}>
          {allTasks.length}
        </span>
      </Typography>
      <ToggleButtonGroup
        color="info"
        value={btnsClick.showTasksCategory}
        exclusive
        onChange={handleChange}
        style={{ marginBottom: "1rem" }}
        aria-label="Platform">
        <ToggleButton
          value="all"
          onClick={() => {
            setBtnsClick({ ...btnsClick, showTasksCategory: "all" });
          }}>
          All
        </ToggleButton>
        <ToggleButton
          value="not done"
          onClick={() => {
            setBtnsClick({ ...btnsClick, showTasksCategory: "not done" });
          }}>
          Not Done
        </ToggleButton>
        <ToggleButton
          value="done"
          onClick={() => {
            setBtnsClick({ ...btnsClick, showTasksCategory: "done" });
          }}>
          Done
        </ToggleButton>
      </ToggleButtonGroup>
      <Button
        id="add-list-btn"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => {
          setBtnsClick({
            ...btnsClick,
            isAddNewListBtnClicked: !btnsClick.isAddNewListBtnClicked,
          });
          setTaskData({ ...taskData, content: "" });
        }}>
        Add list
      </Button>
    </div>
  );
}
