import React from 'react'
import {Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from "moment";
import { useDispatch } from "react-redux";
import { green, blue, grey, red } from "@material-ui/core/colors";
import Chip from "@material-ui/core/Chip";

import StatusChip from '../../Chip/StatusChip';
import { deleteTask } from "../../../reduxStore/actions/tasks";
import useStyles from "./style"


const Task = ({ task, setCurrentId }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));


    return (
        <div>
          <Card className={classes.card}>
              <CardMedia className={classes.media} image={task.selectedFile} title={task.title} />
              <div className={classes.overlay}>
                  <Typography varient="h6">{task.name}</Typography>
                  <Typography varient="body6">{moment(task.createdAt).fromNow()}</Typography>
              </div>
               

              <cardActions className={classes.cardActionsChip}>
                  <StatusChip status={task.status}/>
              </cardActions>

              <Typography className={classes.title} variant="h5" gutterBottom>{task.title}</Typography>

              <CardContent>
                  <Typography  variant="body2" color="textSecondary" component="p" >{task.discription}</Typography>
              </CardContent>
            
              <CardActions className={classes.cardActions}>
                {(user?.result?.googleId == task?.creator || user?.result?._id == task?.creator ) && (
                  <Button  size="small" color="primary" onClick={() => setCurrentId(task._id)}>
                     <EditIcon fontSize="default" />
                       edit
                   </Button>
                   )}


                   {/* only who created task can delet only */}
                   {(user?.result?.googleId == task?.creator || user?.result?._id == task?.creator ) && (
                    <Button size="small" color="primary" onClick={()=> dispatch(deleteTask(task._id))}>
                       <DeleteIcon fontSize="small"/>
                       Delete
                   </Button>  
                   )}
                   
              </CardActions>
          </Card> 
        </div>
    )
}

export default Task;
