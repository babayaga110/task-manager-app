import { signInWithEmailAndPassword } from "firebase/auth";
import requests from "./httpService";
import { auth } from "../firebase/config";

const authService = {
    register: async (data) => {
        return requests.post("/auth/register", data);
    },
    firebaseLogin: async (data) => {
        return signInWithEmailAndPassword(auth, data.email, data.password);
    },
    login: async (data) => {
        return requests.post("/auth/login", data);
    },
    googleLogin: async (data) => {
        return requests.post("/auth/google-login", data);
    },
};

export default authService;