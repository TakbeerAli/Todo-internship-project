import mongoose  from 'mongoose';
import PostTasks from '../models/postTasks.js';

export const getTasks = async (req, res) => {
    try {
        const postMessages = await PostTasks.find();

        console.log(postMessages);
        
        res.status(200).json(postMessages);
        
    } catch (error) {

        res.status(404).json({ message: error.message }); 
         
    }
}

export const createTask = async (req, res) => {
    
    const post = req.body;
    const newPost = new PostTasks({ ...post, creator:req.userId, createdAt: new Date().toISOString()});
    console.log(newPost);
    try {

        await newPost.save();
        res.status(201).json(newPost);
        
    } catch (error) {

        res.status(409).json({ message: error.message });
        
    }
}

export const updateTask = async ( req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostTasks.findByIdAndUpdate(_id, {...post, _id } , { new: true });

    res.json(updatedPost);
}


export const deletTask = async ( req, res) => {
    const { id } = req.params;
     if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that Id');

     await PostTasks.findByIdAndRemove(id);

     res.json({ message: 'Post deleted successfully' });
}

