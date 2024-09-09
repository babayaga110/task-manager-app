import requests from "./httpService";

const taskService = {
    getAll: async () => {
        return requests.get("/tasks");
    },
    create: async (data) => {
        return requests.post("/tasks/addTask", data);
    },
    update: async (data) => {
        return requests.put(`/tasks/${data?.id}`, data);
    },
    reorder: async (data) => {
        return requests.post("/tasks/reorder", data);
    },
    delete: async (listId, id) => {
        return requests.delete(`/tasks?listId=${listId}&id=${id}`);
    },
};

export default taskService;