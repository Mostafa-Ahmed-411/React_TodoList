//todo List
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
/* ------------------------------------------------------------------------ */
import Header from "../components/header/Header.jsx";
import CardList from "../components/cardList/CardList.jsx";
import AddNewList from "../components/cardList/AddNewList.jsx";
import TodoContext from "../contexts/TodoContext.jsx";
import { useContext, useState, useEffect } from "react";
function TodoList() {
  console.log("***** TodoList Renderd ****");

  const [allTasks, setAllTasks] = useState(() => {
    const saved = localStorage.getItem("allTasks");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
  }, [allTasks]);

  const [btnsClick, setBtnsClick] = useState({
    isAddNewListBtnClicked: false,
    showTasksCategory: "",
  });
  const [taskData, setTaskData] = useState({
    id: 1,
    content: "",
    isCompleted: false,
    isEditingNow: false,
  });

  let tasksToDisplay = allTasks;
  if (btnsClick.showTasksCategory === "done") {
    tasksToDisplay = allTasks.filter((task) => task.isCompleted);
  } else if (btnsClick.showTasksCategory === "not done") {
    tasksToDisplay = allTasks.filter((task) => !task.isCompleted);
  }

  return (
    <Container>
      <TodoContext.Provider
        value={{
          btnsClick: btnsClick,
          setBtnsClick: setBtnsClick,
          taskData: taskData,
          setTaskData: setTaskData,
          allTasks: allTasks,
          setAllTasks: setAllTasks,
        }}>
        <Card className="main-card">
          {!btnsClick.isAddNewListBtnClicked && <Header />}
          {btnsClick.isAddNewListBtnClicked && <AddNewList />}

          {!btnsClick.isAddNewListBtnClicked && (
            <div id="toEditScrollBar">
              <CardList tasksToDisplay={tasksToDisplay} />
            </div>
          )}
        </Card>
      </TodoContext.Provider>
    </Container>
  );
}
export default TodoList;
