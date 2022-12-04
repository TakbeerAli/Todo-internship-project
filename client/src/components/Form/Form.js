import React,{useEffect, useState} from 'react'
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch ,useSelector} from "react-redux";
import { createTask, updateTask } from "../../reduxStore/actions/tasks";

import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import StatusChip from "../Chip/StatusChip"


import useStyles from "./style"

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [taskData, setTaskData] = useState({  title:'', discription:'',status:'Todo',  selectedFile:''});


    //if updated post is equal to post in database then set in form 
    const task = useSelector((state)=> currentId ? state.tasks.find((p) => p._id === currentId): null);

     // setting update data in form 
    useEffect(() => {
        if(task) setTaskData(task);
    },[task])

    const handleSubmit = (e) =>{
        e.preventDefault();


        //  gerting name of current logged in user and then sending to backend for post or any action 
        if(currentId){
            dispatch(updateTask(currentId, {...taskData, name: user?.result?.name}));
        }else{
            dispatch(createTask({...taskData, name: user?.result?.name}));
        }
        clear();
    };


    if(!user?.result?.name){
        return(
            <Paper className={classes.paper}>
               <Typography variant="h6" align="center">
                 Please Sign In to create your Task and Update it
               </Typography>
            </Paper>
        )
    }


    const clear = () =>{
        setCurrentId(null);
        setTaskData({  title:'', discription:'',status:'Todo', selectedFile:''});

    };

    ///function for task status selection
    function ChipSelect() {
        return (
          <Select
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            value={taskData.status}
            onChange={({ target: { value } }) => {  
              setTaskData({ ...taskData, status:value })  
            }}
            input={<Input />}
            renderValue={(selected) => <StatusChip status={selected} />}
          >
            {["Todo","in progress", "completed"].map(
              (statusLabel) => (
                <MenuItem key={statusLabel} value={statusLabel}>
                  <StatusChip status={statusLabel} />
                </MenuItem>
              )
            )}
          </Select>
        );
      }
      


    

    return (
       <Paper className={classes.paper}>
          <form autoComplete="off" noValidate className={ `${classes.form} ${classes.root} ` } onSubmit={handleSubmit}>
               <Typography varient="h6"> {currentId ? `Upating`:`Creating`} Task</Typography>  
               <TextField name="title" variant="outlined"  label="Title" fullWidth value={taskData.title} onChange={(e) => setTaskData({ ...taskData, title:e.target.value })}/>
               <TextField name="discription" variant="outlined" label="discription" fullWidth value={taskData.discription} onChange={(e) => setTaskData({ ...taskData, discription:e.target.value })}/>
  
                <div className={classes.fileInput}>
                  <ChipSelect/>
                </div>

                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setTaskData({ ...taskData, selectedFile: base64 })} /></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>
                <Button  variant="contained" color="secondary" size="small" onClicl={clear} fullWidth >Clear</Button>
          </form>

       </Paper>
    )
}

export default Form
