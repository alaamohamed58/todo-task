import React, { useState } from "react";
import {
  Typography,
  Button,
  Grid,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useAppDispatch } from "../../hooks";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import FilterListIcon from "@mui/icons-material/FilterList";
import { getFilteredTodosAsync, getTodosAsync } from "../../store/todosSlice";

interface Prop {
  handleOpen: () => void;
  catagories: any[];
}

function PageHeader({ handleOpen, catagories }: Prop) {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const getAllTodos = () => dispatch(getTodosAsync());

  const fetchFilteredTodos = (id: number) => {
    dispatch(getFilteredTodosAsync(id));
    handleMenuClose()
  };



  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Todos
        </Typography>
      </Grid>
      <Grid item>
        <IconButton onClick={handleMenuOpen}>
          <FilterListIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={getAllTodos}>All</MenuItem>
          {catagories &&
            catagories.map((category) => {
              return (
                <MenuItem
                  key={category.category_id}
                  onClick={() => fetchFilteredTodos(category.category_id)}
                >
                  {category.categoryNameEn}
                </MenuItem>
              );
            })}
        </Menu>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleOpen}
        >
          Create Todo
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
