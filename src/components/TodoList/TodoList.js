import React, { useState, useEffect } from "react";
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
  getTodoLists,
  createTodoList,
  updateTodoList,
  deleteTodoList,
  getAuthToken,
} from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const useStyles = makeStyles((theme) => ({
  marginTopButton: {
    marginTop: "10px",
  },
}));

const TodoList = () => {
  const [todoLists, setTodoLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [editingListId, setEditingListId] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [sortOrder, setSortOrder] = useState("Desc");
  const [sortBy, setSortBy] = useState("nameAsc");
  const navigate = useNavigate();
  const classes = useStyles();

  const token = getAuthToken();
  useEffect(() => {
    const fetchTodoLists = async () => {
      const orderby = sortBy === "nameAsc" ? "Asc" : "Desc";
      const lists = await getTodoLists(filterText, "name", orderby);
      setTodoLists(lists);
    };

    if (token) fetchTodoLists();
  }, [filterText, sortBy, token]);

  const handleCreateOrUpdateList = async () => {
    if (editingListId) {
      const updatedList = await updateTodoList(editingListId, newListName);
      if (updatedList) {
        setTodoLists(
          todoLists.map((list) =>
            list.id === editingListId ? updatedList : list
          )
        );
      }
      setEditingListId(null);
    } else {
      const response = await createTodoList(newListName);
      if (response) {
        setTodoLists([...todoLists, response]);
      }
    }
    setNewListName("");
  };

  const handleEditTodoList = (list) => {
    setEditingListId(list.id);
    setNewListName(list.name);
  };

  const handleDeleteTodoList = async (list) => {
    await deleteTodoList(list.id);
    setTodoLists(todoLists.filter((l) => l.id !== list.id));
  };

  return (
    <Container maxWidth="xs" minWidth="xs">
      <Typography variant="h4">Your To-Do Lists</Typography>
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
        {todoLists.map((list) => (
          <ListItem
            button
            key={list.id}
            onClick={() => navigate(`/todo-list/${list.id}`)}
          >
            <ListItemText primary={list.name} />
            <Grid2 container spacing={2} justifyContent={"space-between"}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEditTodoList(list)}
              >
                <EditIcon />
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteTodoList(list)}
              >
                <DeleteIcon />
              </Button>
            </Grid2>
          </ListItem>
        ))}
      </List>

      <TextField
        label={editingListId ? "Edit List Name" : "New List Name"}
        value={newListName}
        onChange={(e) => setNewListName(e.target.value)}
        fullWidth
      />
      <Box className={classes.marginTopButton}>
        <Button
          onClick={handleCreateOrUpdateList}
          variant="contained"
          color="primary"
        >
          {editingListId ? "Update List" : "Create List"}
        </Button>
      </Box>
    </Container>
  );
};

export default TodoList;
