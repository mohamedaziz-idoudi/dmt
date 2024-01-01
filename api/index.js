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

const db = mysql.createPool({
    host: '185.77.96.207',
    user: 'dmt_admin',
    database: 'u951730070_digimytch',
    password: 'password123',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

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
    db.query(sql, [req.query.user], (err, response) => {
        bcrypt.compare(password, response[0].password).then(function (result) {
            res.send(result);
        });

    })
})

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
app.get("/api/gettrainers", (req, res) => {
    const query = "SELECT * FROM instructors"
    db.query(query, ((err, data) => {
        res.send(data);
    }))
})
app.post("/api/addinstructor", (req, res) => {
    const name = req.body.name;
    const stat = req.body.stat;
    const photo = req.body.photo;
    const q = "INSERT INTO instructors (nom,stat,photo) VALUES (?,?,?)";
    db.query(q, [name, stat, photo], (err, response) => {
        if (err) {
            console.log(err);
        }
        console.log(response);
    })
})
app.post("/api/get_instructor", (req, res) => {
    const id = req.body.id;
    db.query("SELECT * FROM instructors WHERE id=?", [id], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result);
    })
})
app.post("/api/deleteinstructor", (req, res) => {
    const id = req.body.id;
    db.query("delete from instructors where id=?", [id], (err, response) => {
        if (err) {
            console.log(err);
        }
        console.log(response);
    })
})
app.post("/api/editphoto", (req, res) => {
    const id = req.body.id;
    const photo = req.body.photo;
    const query = 'update instructors set photo= ? WHERE id= ?';
    db.query(query, [photo, id], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result);
    })
})
app.post("/api/editphotoTR", (req, res) => {
    const id = req.body.id;
    const photo = req.body.photo;
    const query = 'update trainings set photo= ? WHERE id= ?';
    db.query(query, [photo, id], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result);
    })
})
app.post("/api/changename", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    db.query('update instructors set nom= ? WHERE id= ?', [name, id], (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
    })
})
app.post("/api/changestat", (req, res) => {
    const id = req.body.id;
    const stats = req.body.stat;
    db.query("update instructors set stat= ? WHERE id= ?", [stats, id], (err, result) => {
        if (err) {
            console.log(err);
        }
    })
})
app.get("/api/getcats", (req, res) => {
    db.query("SELECT * FROM categories", (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    })
})
app.post("/api/get_cat", (req, res) => {
    const id = req.body.id;
    const query = "SELECT * FROM categories WHERE id=?";
    db.query(query, [id], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    })
})
app.get("/api/get_trainings", (req, res) => {
    db.query("SELECT * FROM trainings ORDER BY id DESC", (err, result) => {
        res.send(result);
    })
})
app.post("/api/partners", (req, res) => {
    try {
        console.log('entered here')
        const links = req.body.images
        for (const link of links) {
            db.query('INSERT INTO images (link) VALUES (?)', [link], (err, result) => {
                if (err) {
                    console.log(err)
                }
            })
        }
        res.send({ success: true })
    } catch (error) {
        console.log(error)
        res.send({ success: false })
    }
})
app.get('/api/getpartners',(req,res)=> {
    db.query('SELECT * FROM images;',(err,result)=> {
        if (err) {
            console.log(err);
        }
        res.send(result);
    })
})
app.post("/api/get_tr", (req, res) => {
    const id = req.body.id;
    const query = "select * from trainings where id=?"
    db.query(query, [id], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result)
    })
})
app.post('/api/testimonial',(req,res)=> {
    const name = req.body.name
    const occ = req.body.occ
    const desc = req.body.desc
    db.query('INSERT INTO testimonials (name,occupation,testimonial) VALUES (?,?,?)',[name,occ,desc],(err,result)=> {
        if (err) {
            console.log(err);
        }
        res.send({success: true})
    })
})
app.get('/api/gettestimonials',(req,res)=> {
    db.query('SELECT * FROM testimonials;',(err,result)=> {
        if (err) {
            console.log(err);
        }
        res.send(result);
    })
})
app.post("/api/get_s", (req, res) => {
    const id = req.body.id;
    const query = "select * from signs where id=?"
    db.query(query, [id], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    })
})
app.get("/api/getblog/:id", (req, res) => {
    let id = req.params.id;
    db.query("SELECT * FROM blogs WHERE id=?", id, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result);
    })
});
app.get("/api/getsigns", (req, res) => {
    db.query("SELECT * FROM signs order by id desc", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result);
    })
})
app.post("/api/addcat", (req, res) => {
    const name = req.body.name;
    db.query("INSERT INTO categories (cat_name) VALUES (?)", [name], (err, result) => {
        if (err) {
            console.log(err);
        }
    })
})
app.post("/api/delete_cat", (req, res) => {
    const id = req.body.id;
    db.query("DELETE FROM trainings WHERE cat=?", [id], (err, result) => {
        if (err) {
            console.log(err);
        }

    })
    db.query("DELETE FROM categories WHERE id=?", [id], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result)
    })
})
app.post("/api/delete_train", (req, res) => {
    const id = req.body.id;
    db.query("DELETE FROM trainings WHERE id=?", [id], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result)
    })

})
app.post("/api/updatecat", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    db.query("UPDATE categories SET cat_name= ? WHERE id =?", [name, id], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result)
    });
})
app.post("/api/updatetraining", (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const query = "UPDATE trainings SET title=? WHERE id=?"
    db.query(query, [title, id], (err, response) => {
        if (err) {
            console.log(err);
        }
        res.send(response);
    })
})
app.post("/api/updatecont", (req, res) => {
    const id = req.body.id;
    const content = req.body.cont;
    const query = "UPDATE trainings SET content=? WHERE id=?"
    db.query(query, [content, id], (err, response) => {
        if (err) {
            console.log(err);
        }
        res.send(response);
    })
})
app.post("/api/updatedes", (req, res) => {
    const id = req.body.id;
    const descr = req.body.descr;
    const query = "UPDATE trainings SET descr=? WHERE id=?"
    db.query(query, [descr, id], (err, response) => {
        if (err) {
            console.log(err);
        }
        res.send(response);
    })
})
app.post("/api/updateprice", (req, res) => {
    const id = req.body.id;
    const price = req.body.price;
    const query = "UPDATE trainings SET price=? WHERE id=?"
    db.query(query, [price, id], (err, response) => {
        if (err) {
            console.log(err);
        }
        res.send(response);
    })
})
app.post("/api/updatedur", (req, res) => {
    const id = req.body.id;
    const duration = req.body.duration;
    const query = "UPDATE trainings SET duration=? WHERE id=?"
    db.query(query, [duration, id], (err, response) => {
        if (err) {
            console.log(err);
        }
        res.send(response);
    })
})
app.post("/api/post_training", (req, res) => {
    const photo = req.body.photo;
    const title = req.body.title;
    const desc = req.body.desc;
    const content = req.body.content;
    const price = req.body.price;
    const duration = req.body.duration;
    const cat = req.body.cat;
    const query = "INSERT INTO trainings (title,photo,content,descr,cat,price,duration) VALUES (?,?,?,?,?,?,?)"
    db.query(query, [title, photo, content, desc, cat, price, duration], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result)
    })
})
app.post("/api/gettrainings", (req, res) => {
    const id = req.body.id
    db.query("SELECT * FROM trainings WHERE cat=? ", [id], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    })
})
app.get("/api/getseltrain/:trainingID", (req, res) => {
    const id = req.params.trainingID;
    db.query("SELECT * FROM trainings WHERE id= ?", [id], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result);
    })
})
app.post("/api/signup", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const training = req.body.training;
    const level = req.body.level;
    const gender = req.body.gender;
    const message = req.body.message;
    const query = "INSERT INTO signs (nom,email,phone,lvl,gender,training,message) VALUES (?,?,?,?,?,?,?)"
    db.query(query, [name, email, phone, level, gender, training, message], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    })
})
app.listen(process.env.PORT || 3001, () => {
    console.log("Running on server!");
});
