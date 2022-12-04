import { CREATE, UPDATE, DELETE, FETCH_ALL,LIKE } from "../contants/actionTypes"
export default (tasks = [], action) => {
    switch(action.type){
        case DELETE:
            return tasks.filter((task) => task._id !== action.payload); 
        case UPDATE:
            return tasks.map((task) => task._id === action.payload._id ? action.payload : task);
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...tasks, action.payload];
        default:
            return tasks;
    }
}