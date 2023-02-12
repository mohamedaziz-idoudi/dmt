const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
require("dotenv").config();
const multer = require('multer')
const app = express()
const mysql = require('mysql')
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');



const db= mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "dmt"
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./images"))
app.use((req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
    });

    next();
});
app.use(express.static(
    path.join(__dirname, "../client/build", 'index.html')));


app.get("/api/login", (req, res) => {
    const sql = "select * FROM users WHERE login = ?";
    const password = req.query.pass;
    db.query(sql,[req.query.user], (err, response) => {
        console.log(response[0].password);
        bcrypt.compare(password, response[0].password).then(function (result) {
            res.send(result);
        });

    })
})

app.get('/api/get_cus', (req, res) => {
    db.query("SELECT * FROM customer_messages ORDER BY id DESC", (err, response) => {
        if (err) {
            console.log(err);
        }
        res.send(response);
    })
});
app.get('/api/get_bus', (req, res) => {
    db.query("SELECT * FROM business_messages", (err, response) => {
        if (err) {
            console.log(err);
        }
        res.send(response);
    })
})

app.get('/api/getbusfields', (req, res) => {
    db.query("SHOW columns FROM business_messages", (err, response) => {
        if (err) {
            console.log(err)
        }
        res.send(response);
    })
})
app.get('/api/getcusfields', (req, res) => {
    db.query('SHOW columns FROM customer_messages', (err, response) => {
        if (err) {
            console.log(err)
        }
        res.send(response);
    })
})

app.post("/api/insert_customer", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;
    const lodgingType = req.body.lodgingType;
    const nb_stars = req.body.nb_stars;
    const resort = req.body.resort;
    const nb_rooms = req.body.nb_rooms;
    const nb_persons = req.body.nb_persons;
    const sqlInsert = "INSERT INTO customer_messages (name,email,phone,type_lodging, nb_stars, resort, nb_rooms, nb_persons, message) VALUES (?,?,?,?,?,?,?,?,?)"
    db.query(sqlInsert, [name, email, phone, lodgingType, nb_stars, resort, nb_rooms, nb_persons, message], (err, result) => {
        console.log(result);
    })
})

app.post("/api/insert_business", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const bname = req.body.bname;
    const bemail = req.body.bemail;
    const bphone = req.body.bphone;
    const work = req.body.work;
    const message = req.body.message;
    const sqlInsert = "INSERT INTO business_messages (personal_name, personal_email, personal_phone, business_name, business_email, business_phone, business_desc, message) VALUES (?,?,?,?,?,?,?,?)";
    db.query(sqlInsert, [name, email, phone, bname, bemail, bphone, work, message], (err, response) => {
        console.log(response);
    })

})

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, '../client/public/uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))

    }
})

const upload = multer({
    storage: storage
});


//@type   POST
//route for post data
app.post("/api/upload", upload.single('file'), (req, res) => {
    const file = req.file;
    res.send(file.filename);
});
app.post("/api/post", (req, res) => {
    const title = req.body.title;
    const paragraph = req.body.paragraph;
    const image = req.body.image;
    const video = req.body.video;
    const q = "INSERT INTO blogs (title,paragraph,image,video,date) VALUES (?,?,?,?,now())";
    db.query(q, [title, paragraph, image, video], (err, response) => {
        console.log(response);
    })
})
app.get("/api/getposts", (req, res) => {
    const q = "SELECT * from blogs ORDER BY id DESC";
    db.query(q, (err, result) => {
        res.send(result);
    })
})
app.get("/api/getPost/:id", (req, res) => {
    let id = req.params.id;
    db.query("SELECT * FROM blogs WHERE id=?", id, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result);
    })
});
app.get("/api/getops", (req, res) => {
    db.query("SELECT * FROM esthetique", (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    })
})
app.get("/api/sum_ops", (req, res) => {
    let operations = req.query.operations;
    let query = "SELECT SUM(prix) sum from esthetique WHERE id IN (?)";
    db.query(query, [operations], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    })
})
app.get("/api/gettrainers",(req,res)=> {
    const query = "SELECT * FROM instructors"
    db.query(query,((err,data)=> {
        res.send(data);
    }))
})
app.post("/api/addinstructor",(req,res)=> {
    const name = req.body.name;
    const stat = req.body.stat;
    const photo = req.body.photo;
    const q = "INSERT INTO instructors (nom,stat,photo) VALUES (?,?,?)";
    db.query(q, [name, stat, photo], (err, response) => {
        if(err)
        {
            console.log(err);
        }
        console.log(response);
    })
})
app.post("/api/get_instructor",(req,res)=> {
    const id= req.body.id;
    db.query("SELECT * FROM instructors WHERE id=?",[id],(err,result)=> {
        if(err) {
            console.log(err)
        }
        res.send(result);
    })
})
app.post("/api/deleteinstructor",(req,res)=> {
    const id = req.body.id;
    db.query("delete from instructors where id=?",[id],(err,response)=> {
        if(err)
        {
            console.log(err);
        }
        console.log(response);
    })
})
app.post("/api/editphoto",(req,res)=> {
    const id =req.body.id;
    const photo = req.body.photo;
    const query = 'update instructors set photo= ? WHERE id= ?';
    db.query(query,[photo,id],(err,result)=> {
        if(err) {
            console.log(err)
        }
        res.send(result);
    })
})
app.post("/api/editphotoTR",(req,res)=> {
    const id =req.body.id;
    const photo = req.body.photo;
    const query = 'update trainings set photo= ? WHERE id= ?';
    db.query(query,[photo,id],(err,result)=> {
        if(err) {
            console.log(err)
        }
        res.send(result);
    })
})
app.post("/api/changename",(req,res)=> {
    const id= req.body.id;
    const name = req.body.name;
    db.query('update instructors set nom= ? WHERE id= ?', [name,id],(err,result)=> {
        if(err) {
            console.log(err);
        }
        console.log(result);
    })
})
app.post("/api/changestat", (req,res)=> {
    const id= req.body.id;
    const stats = req.body.stat;
    db.query("update instructors set stat= ? WHERE id= ?", [stats,id], (err,result)=> {
        if(err) {
            console.log(err);
        }
    })
})
app.get("/api/getcats",(req,res)=> {
    db.query("SELECT * FROM categories",(err,result)=> {
        if(err) {
            console.log(err);
        }
        res.send(result);
    })
})
app.post("/api/get_cat", (req,res)=> {
    const id=req.body.id;
    const query = "SELECT * FROM categories WHERE id=?";
    db.query(query,[id],(err,result)=> {
        if(err) {
            console.log(err);
        }
        res.send(result);
    })
})
app.post("/api/get_tr",(req,res)=> {
    const id=req.body.id;
    const query= "select * from trainings where id=?"
    db.query(query,[id],(err,result)=> {
        if(err){
            console.log(err);
        }
        res.send(result)
    })
})
app.post("/api/addcat", (req,res)=> {
    const name= req.body.name;
    db.query("INSERT INTO categories (cat_name) VALUES (?)",[name],(err,result)=> {
        if(err) {
            console.log(err);
        }
    })
})
app.post("/api/delete_cat",(req,res)=> {
    const id = req.body.id;
    db.query("DELETE FROM trainings WHERE cat=?", [id], (err,result)=> {
        if(err) {
            console.log(err);
        }
        
    })
    db.query("DELETE FROM categories WHERE id=?", [id], (err,result)=> {
        if(err) {
            console.log(err);
        }
        res.send(result)
    })
})
app.post("/api/delete_train",(req,res)=> {
    const id = req.body.id;
    db.query("DELETE FROM trainings WHERE id=?", [id], (err,result)=> {
        if(err) {
            console.log(err);
        }
        res.send(result)
    })

})
app.post("/api/updatecat",(req,res)=> {
    const id=req.body.id;
    const name=req.body.name;
    db.query("UPDATE categories SET cat_name= ? WHERE id =?",[name,id],(err,result)=> {
        if(err) {
            console.log(err);
        }
        res.send(result)
    });
})
app.post("/api/updatetraining",(req,res)=> {
    const id=req.body.id;
    const title=req.body.title;
    const query="UPDATE trainings SET title=? WHERE id=?"
    db.query(query,[title,id],(err,response)=>{
        if(err){
            console.log(err);
        }
        res.send(response);
    })
})
app.post("/api/updatecont",(req,res)=> {
    const id=req.body.id;
    const content=req.body.cont;
    const query="UPDATE trainings SET content=? WHERE id=?"
    db.query(query,[content,id],(err,response)=>{
        if(err){
            console.log(err);
        }
        res.send(response);
    })
})
app.post("/api/updatedes",(req,res)=> {
    const id=req.body.id;
    const descr=req.body.descr;
    const query="UPDATE trainings SET descr=? WHERE id=?"
    db.query(query,[descr,id],(err,response)=>{
        if(err){
            console.log(err);
        }
        res.send(response);
    })
})
app.post("/api/updateprice",(req,res)=> {
    const id=req.body.id;
    const price=req.body.price;
    const query="UPDATE trainings SET price=? WHERE id=?"
    db.query(query,[price,id],(err,response)=>{
        if(err){
            console.log(err);
        }
        res.send(response);
    })
})
app.post("/api/updatedur",(req,res)=> {
    const id=req.body.id;
    const duration=req.body.duration;
    const query="UPDATE trainings SET duration=? WHERE id=?"
    db.query(query,[duration,id],(err,response)=>{
        if(err){
            console.log(err);
        }
        res.send(response);
    })
})
app.post("/api/post_training", (req,res)=> {
    const photo = req.body.photo;
    const title = req.body.title;
    const desc = req.body.desc;
    const content = req.body.content;
    const price = req.body.price;
    const duration = req.body.duration;
    const cat = req.body.cat;
    const query = "INSERT INTO trainings (title,photo,content,descr,cat,price,duration) VALUES (?,?,?,?,?,?,?)"
    db.query(query,[title,photo,content,desc,cat,price,duration],(err,result)=> {
        if(err) {
            console.log(err);
        }
        res.send(result)
    })
})
app.post("/api/gettrainings",(req,res)=> {
    const id=req.body.id
    db.query("SELECT * FROM Trainings WHERE cat=? ",[id],(err,result)=> {
        if(err) {
            console.log(err);
        }
        res.send(result);
    })
})
app.get("/api/getseltrain/:trainingID",(req,res)=> {
    const id = req.params.trainingID;
    db.query("SELECT * FROM trainings WHERE id= ?",[id],(err,result)=> {
        if(err) {
            console.log(err)
        }
        res.send(result);
    })
})
app.listen(process.env.PORT || 3001, () => {
    console.log("Running on server!");
});
