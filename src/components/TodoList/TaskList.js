import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Box,
  Grid,
  Grid2,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  markCompletedTask,
} from "../../services/apiService";
import { useNavigate, useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

const useStyles = makeStyles((theme) => ({
  marginTopButton: {
    marginTop: "10px",
  },
}));

const TaskList = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [currentTask, setCurrentTask] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [sortOrder, setSortOrder] = useState("Desc");
  const [sortBy, setSortBy] = useState("nameAsc");
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    const fetchTasks = async () => {
      const orderby = sortBy === "nameAsc" ? "Asc" : "Desc";
      try {
        const response = await getTasks(id, filterText, "name", orderby);
        setTasks(response);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchTasks();
  }, [filterText, sortBy, id]);

  // Handle both Create or Edit task
  const handleCreateOrEditTask = async () => {
    if (!newTask.trim()) return;

    try {
      if (currentTask) {
        const updatedTask = await updateTask(id, currentTask.id, newTask);
        const updatedTasks = tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
        setTasks(updatedTasks);
        setCurrentTask(null);
      } else {
        const task = await createTask(id, newTask);
        setTasks([...tasks, task]);
      }

      setNewTask("");
    } catch (error) {
      console.error("Error creating or editing task:", error);
    }
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setNewTask(task.title);
  };

  const handleCancelEdit = () => {
    setCurrentTask(null);
    setNewTask("");
  };

  const handleDelete = async (task) => {
    const previousTasks = tasks.filter((t) => t.id !== task.id);
    await deleteTask(id, task.id);
    setTasks(previousTasks);
  };

  const handleMarkCompleted = (task) => {
    const previousTasks = tasks.filter((t) => t.id !== task.id);
    const updatedTask = { ...task, status: 1 };
    const updatedTasks = [...previousTasks, updatedTask];
    setTasks(updatedTasks);
    markCompletedTask(id, task.id);
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4">Task List for List ID: {id}</Typography>
      <Grid2 container spacing={2} justifyContent={"space-between"}>
        <Grid2 columns={2}>
          <TextField
            label="Filter Lists"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
        </Grid2>
        <Grid2 columns={8}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
              }}
              label="Sort By"
            >
              <MenuItem value="nameAsc">Name Asc</MenuItem>
              <MenuItem value="nameDesc">Name Desc</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
      </Grid2>
      <List>
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <ListItem key={task.id}>
              <ListItemText primary={task.title} />
              <Grid2 container spacing={2} justifyContent={"space-between"}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(task)}
                >
                  <EditIcon />
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(task)}
                >
                  <DeleteIcon />
                </Button>
                <Button
                  variant="contained"
                  color={!task.status ? "warning" : "success"}
                  onClick={() => handleMarkCompleted(task)}
                >
                  <CheckIcon />
                </Button>
              </Grid2>
            </ListItem>
          ))
        ) : (
          <Typography variant="body1">No tasks found.</Typography>
        )}
      </List>

      <TextField
        label={currentTask ? "Edit Task" : "New Task"}
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        fullWidth
      />

      <Box className={classes.marginTopButton}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateOrEditTask}
        >
          {currentTask ? "Update Task" : "Create Task"}
        </Button>

        {currentTask && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancelEdit}
            style={{ marginLeft: "10px" }}
          >
            Cancel Edit
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default TaskList;
