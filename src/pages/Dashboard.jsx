import * as React from "react";
import Layout from "../Layout/Layout";
import {
  FormControl,
  FormLabel,
  Input,
  MenuItem,
  Button,
  Box,
  Select,
  Divider,
  ButtonGroup,
  Skeleton,
} from "@mui/joy";
import TaskPanel from "../components/TaskPanel/TaskPanel";
import { v4 as uuidv4 } from "uuid";
import taskService from "../services/taskService";
import { useAlert } from "../useContext/AlertContext";

export default function Dashboard() {
  const [state, setState] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { showAlert } = useAlert();

  const handleAddTask = async () => {
    setLoading(true);
    try {
      const res = await taskService.create({ title: "", description: "" });
      if (res && res.message) {
        showAlert("Success", res.message, "success", "check");
      }
    } catch (error) {
      showAlert(
        "Error",
        error.message || "An unexpected error occurred",
        "danger",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await taskService.getAll();
        setState(res);
      } catch (error) {
        showAlert("Error", error.message, "danger", "error");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <ButtonGroup sx={{ mb: 2 }} variant="solid" color="primary">
        <Button onClick={handleAddTask} loading={loading}>
          Add Task
        </Button>
        {/* <Button
          onClick={() => {
            setState([...state, []]);
          }}
        >
          Add another list
        </Button> */}
      </ButtonGroup>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alginItems: "center",
          boxShadow: "xs",
          p: 2,
          borderRadius: "md",
          border: "1px solid #e2e8f0",
        }}
      >
        <FormControl
          sx={{
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
            width: "100%",
          }}
        >
          <FormLabel
            sx={{
              alignSelf: "center",
              margin: 0,
            }}
          >
            Search:
          </FormLabel>
          <Input
            placeholder="Search..."
            sx={{
              width: "100%",
              maxWidth: 400,
            }}
          />
        </FormControl>
        <FormControl
          sx={{
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
          }}
        >
          <FormLabel
            sx={{
              alignSelf: "center",
              margin: 0,
            }}
          >
            Sort:
          </FormLabel>
          <Select>
            <MenuItem value="recent">Recent</MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Divider sx={{ my: 2 }} />

      {loading ? (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {[...Array(4)].map((_, index) => (
            <Skeleton variant="rectangular" height={300} width={300} />
          ))}
        </Box>
      ) : (
        <TaskPanel state={state} setState={setState} />
      )}
    </Layout>
  );
}
