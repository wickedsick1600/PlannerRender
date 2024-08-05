import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
const db = mysql.createConnection({
    host: process.env.REACT_APP_HOST,
    user: process.env.REACT_APP_USER,
    password: process.env.REACT_APP_PASSWORD,
    database: process.env.REACT_APP_DATABASE
})

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5174;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

    // For TODO Component

// Display all tasks in the todo table
app.get("/tasks", (req,res)=>{
    const q = "SELECT * FROM todo";
    db.query(q, (error, data) => {
        if(error) return res.json(error);
        return res.json(data);
    });
})
// Display all tasks in the Finished Tasks
app.get("/finished_tasks", (req,res)=>{
    const q = "SELECT * FROM finished_tasks_table";
    db.query(q, (error, data) => {
        if(error) return res.json(error);
        return res.json(data);
    });
})
// Insert task in the todo table
app.post("/insert", (req, res)=>{
    const q = "INSERT INTO todo (task_name) VALUES (?)"
    const values = [req.body.task_name];

    db.query(q,[values], (error, data)=>{
        if(error) return res.json(error);
        return res.json(data);
    })
});
// Insert task in the finished tasks table
app.post("/insert_finished_tasks", (req, res) => {
    const q = "INSERT INTO finished_tasks_table (`finished_tasks`, `time_finished`) VALUES (?)";
    const values = [req.body.finished_tasks, req.body.time_finished];

    db.query(q, [values], (error, data) => {
        if(error) return res.json(error);
        return res.json(data);
    })
})
// delete task in the todo table
app.delete("/delete/:id", (req, res)  => {
    const taskId = req.params.id;
    const q = "DELETE FROM todo WHERE id = (?)"

    db.query(q, [taskId], (error, data) =>{
        if(error) return res.json(error);
        return res.json(data);  
    })

})
// Delete task in the Finished Tasks Table
app.delete("/delete_finished_tasks/:id", (req, res) => {
    const taskId = req.params.id;
    const q = "DELETE FROM finished_tasks_table WHERE id = (?)"
    
    db.query(q, [taskId], (error, data) => {
        if(error) return res.json(error);
        return res.json(data);
    })
})

    // For Shopping List Component

// Display all items in the shopping cart
app.get("/cart", (req, res) => {
    const q = "SELECT * FROM cart";

    db.query(q, (error, data) => {
        if (error) return res.json(error);
        return res.json(data);
    })
})
// Add a product to the shopping list
app.post("/add_cart", (req, res) => {
    const q = "INSERT INTO cart (`product_name`, `quantity`, `unit`) VALUES (?)";
    const values = [req.body.product_name, req.body.quantity, req.body.unit];

    db.query(q, [values], (error, data) => {
        if (error) return res.json(error);
        return res.json(data);
    } )
})
// Delete a product in the shopping list
app.delete("/deleteProduct/:id", (req, res) =>{
    const q = "DELETE FROM cart WHERE id = ?"
    const id = req.params.id;
    const parsedId = parseInt(id)

    db.query(q, [parsedId], (error, data) =>{
        if (error) res.json(error)
        if (data) res.json(data)
    })
})
// Update Quantity of the product
app.patch("/updateCount/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const q = "UPDATE cart SET quantity = ? WHERE id = ?"
    const values = [req.body.quantity, productId]

    db.query(q, values, (error, data) => {
        if (error) return res.json(error)
        if (data) return res.json(data)
    })
})

    // for FeedTrap component

// Display all items in feed table
app.get("/feed", (req, res) => {
    const q = "SELECT * FROM feed"

    db.query(q, (error, data) =>{
        if (error) console.log(error)
        if (data) res.json(data)
    })
})
// Post a comment in feed table
app.post("/comment", (req, res) => {
    const q = "INSERT INTO feed (`username`, `comment`) VALUES (?)"
    const values = [req.body.username, req.body.comment];

    db.query(q, [values], (error, data) => {
        if (error) return res.json(error)
        return res.json(data)
    })

})
// Update like count
app.patch("/like/:id", (req, res) => {
    const commentId = req.params.id
    const newLikes = req.body.likes
    const q = "UPDATE feed SET likes = ? WHERE id = ?"
    const values = [newLikes, commentId]

    db.query(q, values, (error, data) => {
        if (error) return res.json(error);
        return res.json(data);
    })
})