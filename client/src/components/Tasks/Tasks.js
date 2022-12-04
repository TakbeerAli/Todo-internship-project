import React from 'react'
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Task from "./Task/Task"
import useStyles from "./style"

const Tasks = ({ setCurrentId }) => {
    const Tasks = useSelector((state) => state.tasks);
    const classes = useStyles();
    
    console.log("getpost",Tasks);
    return (
           !Tasks.length ? <CircularProgress/> : ( 
               <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {Tasks.map((task) => (
                    <Grid key={task._id} item xs={12} sm={6}>
                        <Task task={task} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}

               </Grid>
           )
            
        
    );
}

export default Tasks
