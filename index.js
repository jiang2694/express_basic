const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())

app.use(express.urlencoded({extended: true}))

const methodOverride = require('method-override');

app.use(methodOverride((req, res) => {
  if (req.body && req.body._method) {
    const method = req.body._method
    return method
  }
}))

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use((req,res, next) => {
  const username = req.cookies.username || '';
  res.locals.username = '';

  if(username){
    res.locals.username = username;
    console.log(`Signed in as ${username}`)
}
  next();
})



app.get('/', (req, res) => {
  res.render('home')
})

app.post('/sign_in', (req, res) =>{
  // res.send(req.body)   //-> this is available through urlencoded
  
  const username = req.body.username
  res.cookie('username', username)
  res.redirect('/')
})


app.post('/sign_out', (req, res) =>{
  res.clearCookie('username')
  res.redirect('/')
})

const todosRouter = require("./routes/todosRouter")
app.use("/todos", todosRouter)


const PORT = 4545
const HOST = 'localhost'
app.listen(PORT, HOST, () => {
  console.log(`The server is listening at ${HOST}:${PORT}`);
})

