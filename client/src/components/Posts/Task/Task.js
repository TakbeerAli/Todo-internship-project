import React from 'react'
import {Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import EditIcon from '@material-ui/icons/Edit';
// import EditIcon from '@mui/icons-material/Edit';
import moment from "moment";
import { useDispatch } from "react-redux";
import { green, blue, grey, red } from "@material-ui/core/colors";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";

import { deletePost } from "../../../reduxStore/actions/tasks";
import useStyles from "./style"


const Post = ({ post, setCurrentId }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

  

      //////////////
      function colorForStatus(status) {
        switch (status) {
          case "Todo":
            return red;
          case "in progress":
            return blue;
          case "completed":
            return green;
          default:
            return grey;
        }
      }
      
      function StatusChip({status }) {
        return (
          <Chip
            label={post.status}
         
            style={{ backgroundColor: colorForStatus(post.status)[300], color: "white" }}
          />
        );
      }
      


      //////////

    return (
        <div>
          <Card className={classes.card}>
              <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
              <div className={classes.overlay}>
                  <Typography varient="h6">{post.name}</Typography>
                  <Typography varient="body6">{moment(post.createdAt).fromNow()}</Typography>
              </div>
               
              {/* {(user?.result?.googleId == post?.creator || user?.result?._id == post?.creator ) && (
              <div className={classes.overlay2}>
              <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><EditIcon fontSize="default" /></Button>
              </div>
              )} */}

              <cardActions className={classes.cardActionsChip}>
              
              <StatusChip/>
              </cardActions>

              <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>

              <CardContent>
                  <Typography  variant="body2" color="textSecondary" component="p" >{post.discription}</Typography>
              </CardContent>
              

              

              <CardActions className={classes.cardActions}>
              

              {(user?.result?.googleId == post?.creator || user?.result?._id == post?.creator ) && (
                <Button  size="small" color="primary" onClick={() => setCurrentId(post._id)}>
                 <EditIcon fontSize="default" />
               edit
              </Button>
                   )}


                   {/* only who created task can delet only */}
                   {(user?.result?.googleId == post?.creator || user?.result?._id == post?.creator ) && (
                    <Button size="small" color="primary" onClick={()=> dispatch(deletePost(post._id))}>
                       <DeleteIcon fontSize="small"/>
                       Delete
                   </Button>  
                   )}
                   
              </CardActions>


          </Card>
            
        </div>
    )
}

export default Post;
