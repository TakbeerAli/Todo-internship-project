import axios from "axios";

const API= axios.create({ baseURL: 'http://localhost:5000'});
// const url =  "https://memorieesapp.herokuapp.com/posts";


// if user is already logined then send the user ID with req to backend in headers 
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });
  

// export const fetchPosts = () => axios.get(url); 

export const fetchTasks = () => API.get('/tasks');
export const createTask = (newTask) => API.post('/tasks', newTask);
export const updateTask = (id, updateTask) => API.patch(`/tasks/${id}`, updateTask);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);




export const signIn = (FormData) => API.post('/users/signin', FormData);
export const signUp = (FormData) => API.post('/users/signup', FormData);

