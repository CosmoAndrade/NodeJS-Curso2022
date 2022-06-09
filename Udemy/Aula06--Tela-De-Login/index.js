const express = require('express')
const porta = 3000
const app = express()
const connection = require('./database/database')
const Cadastro = require('./database/Cadastro')

connection
  .authenticate()
  .then(() => {
    console.log('conexão realizada com sucesso!')
  })
  .catch((erro) => {
    console.log(erro)
  });

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.set('view engine' , 'ejs')
app.set('views', './views');
app.use(express.static('public'))




app.get('/', (req, res) => {
    Cadastro.findAll({raw: true}).then((cadastros) => {
        res.render('index' , {
            cadastros:cadastros
        })
    })
  
});


app.get('/cadastrar', (req, res) => {
    res.render('cadastrar')
});


app.post('/salvarcadastro', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha

    Cadastro.create({
        nome:nome,
        email:email,
        senha:senha
    }).then(() => {
        res.redirect('/')
    })
    


    // res.send(`${nome} - ${email} - ${senha}`)
});



app.listen(porta, () => {
    console.log(`http://localhost:${porta}`)
  })