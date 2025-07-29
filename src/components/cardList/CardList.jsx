// cardList
import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
/* -------------------------------------------------------------------------- */
import { useContext } from "react";
import TodoContext from "../../contexts/TodoContext";
import "../../App.css";
/* -------------------------------------------------------------------------- */

export default function CardList({ tasksToDisplay }) {
  console.log("***** carlList Renderd ****");
  const { allTasks, setAllTasks } = useContext(TodoContext);
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    const editedTaks = allTasks.map((t) =>
      t.isEditingNow === true ? { ...t, isEditingNow: !t.isEditingNow } : t
    );
    setAllTasks(editedTaks);
    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    const editedTaks = allTasks.map((t) =>
      t.isEditingNow === true
        ? { ...t, content: email, isEditingNow: !t.isEditingNow }
        : t
    );
    setAllTasks(editedTaks);
    setOpen(false);
  };
  /* -------------------------------------------------------------------------- */
  /*                                    logic                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <>
      <React.Fragment>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Need to update this task</DialogTitle>
          <DialogContent sx={{ paddingBottom: 0 }}>
            {/* <DialogContentText>
             
            </DialogContentText> */}
            <form onSubmit={handleSubmit}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="email"
                label="your New task"
                type="text"
                fullWidth
                variant="standard"
              />
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">SAVE</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </React.Fragment>
      {/* ------------------------------------------------------------------------------------ */}
      {tasksToDisplay.map((task, index) => (
        <Card key={task.id} className="card-list">
          <CardContent>
            <Grid container direction={{ xs: "column", md: "row" }}>
              <Grid id="left" size={8}>
                <Typography
                  variant="h5"
                  color="success"
                  component="div"
                  style={{
                    textDecoration: task.isCompleted ? "line-through" : "none",
                  }}>
                  Task -<span id="task-id">{index + 1}</span>
                </Typography>
                <Typography
                  variant="body1"
                  color="info"
                  component="div"
                  style={{
                    textDecoration: task.isCompleted ? "line-through" : "none",
                  }}>
                  {task.content}
                </Typography>
              </Grid>

              <Grid
                id="btns"
                size={4}
                display={"flex"}
                justifyContent={"space-around"}
                alignItems={"center"}
                style={{
                  margin: "auto",
                }}>
                <Stack direction="row" spacing={1} style={{}}>
                  <IconButton
                    className="icon-btn"
                    color="success"
                    style={{
                      color: task.isCompleted ? "white" : "green",
                      backgroundColor: task.isCompleted ? "green" : "white",
                    }}
                    /* --------------------------------- checked -------------------------------- */
                    onClick={() => {
                      const checkedTaks = allTasks.map((t) =>
                        t.id === task.id
                          ? { ...t, isCompleted: !t.isCompleted }
                          : t
                      );
                      setAllTasks(checkedTaks);
                    }}>
                    <CheckIcon />
                  </IconButton>

                  <IconButton
                    className="icon-btn"
                    color="primary"
                    style={{
                      color: "darkgreen",
                      backgroundColor: "white",
                    }}
                    /* ---------------------------------- edit ---------------------------------- */
                    onClick={() => {
                      const editedTasks = allTasks.map((t) =>
                        t.id === task.id
                          ? { ...t, isEditingNow: !t.isEditingNow }
                          : t
                      );
                      setAllTasks(editedTasks);
                      handleClickOpen();
                    }}>
                    <ModeEditIcon />
                  </IconButton>
                  <IconButton
                    className="icon-btn"
                    color="secondary"
                    style={{
                      color: "red",
                      backgroundColor: "white",
                    }}
                    /* --------------------------------- Delete --------------------------------- */
                    onClick={() => {
                      const confirmDelete = window.confirm(
                        "Are you sure you want to delete this task?"
                      );
                      if (confirmDelete) {
                        const updatedTasks = allTasks.filter(
                          (t) => t.id !== task.id
                        );
                        setAllTasks(updatedTasks);
                      }
                    }}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>

            {/* ---------- */}
          </CardContent>
        </Card>
      ))}
    </>
  );
}
