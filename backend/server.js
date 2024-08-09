const express = require('express');
const mysql = require('mysql');
var cors = require('cors')
const app = express();
const port = 5000 ;
const connection = require('./database');
app.use(express.json());
app.use(cors());
app.post('/create_new_account',(req,res)=>{
  const create_new_account = 'insert into account(username,passsword,fullname,role) values(?,?,?,1)' ; 
  const {username,passsword,fullname} = req.body ; 
  if(!username||!passsword||!fullname)
    return res.status(400).json({ message: "Missing required fields" });
  connection.query(create_new_account,[username,passsword,fullname],(err,result)=>{
    if(err) throw err
      res.send(result)

  });

})
app.post('/api_account', (req, res) => {
    let sql_account = 'SELECT * FROM account where username = ? and passsword = ? ' ; 
    const {username,passsword} = req.body ;
    if(!username || !passsword) {
      return res.status(400).json({ message: "Username/Password required " });
    }
    connection.query(sql_account,[username,passsword] ,(err,result)=> {
        if(err) throw err 
        if(result.length > 0){
            return res.json(result);
        }
        else 
        return res.json("No record") ;
    }) ;
    // res.send('Helloo This is an api !')
  })
  app.get('/api_questions', (req, res) => {
    let sql = 'SELECT * FROM questions ORDER BY RAND() LIMIT 10' ; 
    connection.query(sql, (err,result)=> {
        if(err) throw err 
        res.send(result);
    }) ;
    // res.send('Helloo This is an api !')
  })
  app.get('/api_user', (req, res) => {
    const get_user = 'SELECT * FROM account ' ; 
    connection.query(get_user, (err,result)=> {
        if(err) throw err 
        res.send(result);
    }) ;
    // res.send('Helloo This is an api !')
  })
  app.post('/get_one_user', (req, res) => {
    const get_one_user = 'SELECT username,passsword,fullname,role FROM account where id_user = ? ' ; 
    const id = req.body.id_user ;
    connection.query(get_one_user, [id],  (err,result)=> {
        if(err) throw err 
        res.send(result);
    }) ;
  })

  app.post('/create_user',(req,res)=> {
  const create_user_sql = 'insert into account(`username`,`passsword`,`fullname`,`role`) values (?)';
  const data = [req.body.username,req.body.passsword,req.body.fullname,req.body.role]
  if (!username || !passsword || !fullname || !role) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  connection.query(create_user_sql,[data] ,(err,result)=> {
    if(err) throw err 
    else 
    return (res.json(result)) ;
  
  }) ;
  })
  app.delete('/delete_user/:id',(req,res)=> {
    const delete_user_sql = 'delete  from account where id_user = ? ';
    const id = req.params.id ;
    
    connection.query(delete_user_sql,[id],(err,result)=> {
      if(err) return res.json({message : ' Err Server '})
      else 
      return res.json(result);
    }) ;
    })
    app.put('/update_user/:id',(req,res)=> {
      const update_user_sql = 'update  account set username = ?, passsword = ? , fullname = ? , role = ?  where  id_user = ? ';
      const id = req.params.id ; 
      const { username, passsword, fullname, role } = req.body;
      if (!username || !passsword || !fullname || !role) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      connection.query(update_user_sql,[username, passsword, fullname, role, id] ,(err,result)=> {
        if(err) return res.json({Messeage : " Err server"})
        else 
        return res.json(result);
      }) ;
      })
// Question ------------------------------
app.get('/get_questions', (req, res) => {
  const get_questions = 'SELECT * FROM questions ' ; 
  connection.query(get_questions, (err,result)=> {
      if(err) throw err 
      res.send(result);
  }) ;
})
app.post('/get_one_question', (req, res) => {
  const get_one_question = 'SELECT * FROM questions where id_question = ? ' ; 
  const id = req.body.id ;  
  connection.query(get_one_question, [id],  (err,result)=> {
      if(err) throw err 
      res.send(result);
  }) ;
})

app.post('/create_question',(req,res)=> {
const create_question_sql = 'insert into questions(`title`,`answerA`,`answerB`,`answerC`,`answerD`,`answer`) values (?)';
const data = [req.body.title,req.body.answerA,req.body.answerB,req.body.answerC,req.body.answerD,req.body.answer]
if (!req.body.title || !req.body.answerA || !req.body.answerB ||!req.body.answerC||!req.body.answerD|| !req.body.answer) {
  return res.status(400).json({ message: "Missing required fields" });
}
connection.query(create_question_sql,[data] ,(err,result)=> {
  if(err) throw err 
  else 
  return (res.json(result)) ;

}) ;
})
app.delete('/delete_question/:id',(req,res)=> {
  const delete_question_sql = 'delete  from questions where id_question = ? ';
  const id = req.params.id ;
  connection.query(delete_question_sql,[id],(err,result)=> {
    if(err) return res.json({message : ' Err Server '})
    else 
    return res.json(result);
  }) ;
  })
  app.put('/update_question/:id',(req,res)=> {
    const update_user_sql = 'update  questions set title = ?, answerA = ? , answerB = ? , answerC = ?,answerD = ?  ,answer = ?    where  id_question = ? ';
    const id = req.params.id ; 
    const { title, answerA, answerB, answerC,answerD,answer } = req.body;
    if (!title || !answerA || !answerB ||!answerC||!answerD|| !answer) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    connection.query(update_user_sql,[title, answerA, answerB, answerC,answerD,answer, id] ,(err,result)=> {
      if(err) return res.json({Messeage : " Err server"})
      else 
      return res.json(result);
    }) ;
    })
  //Get result from one user 
  app.post('/get_info_user', (req, res) => {
    const get_info_user = `SELECT acc.fullname, rs.score, rs.numberOfTest, rs.dateOfTest
                            FROM account acc
                            JOIN result rs ON acc.username = rs.username
                            WHERE rs.username = ? `; 
    const user = req.body.username ;
    connection.query(get_info_user, [user],  (err,result)=> {
        if(err) throw err 
        res.send(result);
    }) ;
  })
  app.post('/push_result', (req, res) => {
    const sql_insert_result = `insert into result(username,score,dateOfTest) values(?)`; 
    const data = [req.body.username,req.body.score,req.body.dateOfTest] ;
    connection.query(sql_insert_result, [data],  (err,result)=> {
        if(err) throw err 
        res.send(result);
    }) ;
  })


  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    connection.connect((err=> {
        if(err) throw err ;
        console.log('Connect Succeed !');
    }))
  })