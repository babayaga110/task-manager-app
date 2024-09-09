import { Box, Typography } from "@mui/joy";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "../TaskCard/TaskCard";
import InfoModal from "../Modals/InfoModal";
import { useInfoModal } from "../../useContext/InfoModalContext";
import { useAlert } from "../../useContext/AlertContext";
import { useAlertModal } from "../../useContext/AlertModalContext";
import EditForm from "../Form/EditForm";
import ViewForm from "../Form/ViewForm";
import taskService from "../../services/taskService";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  p: 0,
  my: 1,
  ":last-child": {
    mb: 0,
  },
  ":first-child": {
    mt: 0,
  },
  backgroundColor: "primary.100",
  borderRadius: "md",
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  backgroundColor: "#fff",
  p: 1,
  width: "100%",
  maxWidth: 300,
  borderRadius: "md",
  boxShadow: "sm",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: isDraggingOver ? "primary.500" : "#e2e8f0",
});

function TaskPanel({ state, setState }) {
  const { showInfoModal, hideInfoModal } = useInfoModal();
  const { showAlert } = useAlert();
  const { showAlertModal, hideAlertModal } = useAlertModal();
  const [selectModal, setSelectModal] = useState({
    type: "View",
    data: {},
  });

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);

      const task = state[sInd][source.index];  // Extract task only once
  
  
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter((group) => group.length));
      console.log(obj);
    }
  }

  const handleUpdate = (data) => {
    setSelectModal({
      type: "Edit",
      data,
    });
    showInfoModal({
      title: "Edit Task",
    });
  };
  const handleView = (data) => {
    setSelectModal({
      type: "View",
      data,
    });
    showInfoModal({
      title: "Task Details",
    });
  };
  const handleDelete = async (data) => {
    try {
      const res = await taskService.delete(data.listId, data.id);
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
      hideAlertModal();
    } finally {
      hideAlertModal();
    }
  };
  const handleConfirm = (data) =>
    showAlertModal({
      title: "Delete Task",
      desc: "Are you sure you want to delete this Task?",
      buttonTitle: "Delete",
      type: "warning",
      handleConfirm: () => handleDelete(data),
    });

  return (
    <div>
      <Box sx={{ display: "flex", gap: 1 }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <Box
                  ref={provided.innerRef}
                  sx={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  <Typography
                    level="title-lg"
                    gutterBottom
                    sx={{
                      backgroundColor: "primary.300",
                      color: "white",
                      p: 1,
                      textTransform: "uppercase",
                    }}
                  >
                    {el?.title}
                  </Typography>
                  {el?.tasks.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <TaskCard
                            task={item}
                            handleUpdate={handleUpdate}
                            handleView={handleView}
                            handleDelete={() => handleConfirm(item)}
                          />
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </Box>
      <InfoModal title="Task Details">
        {selectModal.type === "Edit" ? (
          <EditForm task={selectModal?.data} />
        ) : (
          <ViewForm task={selectModal?.data} />
        )}
      </InfoModal>
    </div>
  );
}

export default TaskPanel;
