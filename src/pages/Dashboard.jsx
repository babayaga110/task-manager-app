import * as React from "react";
import Layout from "../Layout/Layout";
import {
  FormControl,
  FormLabel,
  Input,
  Option,
  Button,
  Box,
  Select,
  Divider,
  ButtonGroup,
  Skeleton,
} from "@mui/joy";
import TaskPanel from "../components/TaskPanel/TaskPanel";
import taskService from "../services/taskService";
import { useAlert } from "../useContext/AlertContext";
import dayjs from "dayjs";

export default function Dashboard() {
  const [state, setState] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const { showAlert, alert } = useAlert();
  const [sort, setSort] = React.useState("");

  const handleAddTask = async () => {
    setButtonLoading(true);
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
      setButtonLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await taskService.getAll();
      setState(res);
    } catch (error) {
      showAlert("Error", error.message, "danger", "error");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (alert.color === "success") {
      fetchData();
    }
  }, [alert.visible]);

  React.useEffect(() => {
    fetchData();
  }, []);


  const handleSearch = (e) => {
    let value = e.target.value.toLowerCase();
    if (!value) {
      fetchData();
      return;
    }
    let filtered = state.filter((item) => {
      return item?.tasks?.some((task) => task.title.toLowerCase().includes(value));
    });
    setState(filtered);
  };
  const handleSort = (event, newValue) => {
    setSort(newValue);
    if (newValue === "recent") {
      let sortedState = state.map(list => {
        let sortedItems = [...list.tasks].sort((a, b) => {
          return new Date(dayjs.unix(b?.createdAt?._seconds).format('MMMM D, YYYY h:mm A')) - new Date(dayjs.unix(a?.createdAt?._seconds).format('MMMM D, YYYY h:mm A'));
        });
        return { ...list, tasks: sortedItems };
      });
      console.log(sortedState);
      setState(sortedState);
    }
  };
  return (
    <Layout>
      <ButtonGroup sx={{ mb: 2 }} variant="solid" color="primary">
        <Button onClick={handleAddTask} loading={buttonLoading}>
          Add Task
        </Button>
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
            onChange={handleSearch}
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
          <Select onChange={handleSort} value={sort} placeholder="Sort by">
            <Option value="recent">Recent</Option>
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
