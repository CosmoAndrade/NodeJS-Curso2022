
const express = require('express');
const bodyParser = require('body-parser');

const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

connection
  .authenticate()
  .then(() => {
    console.log('conexão realizada com sucesso!')
  })
  .catch((erro) => {
    console.log(erro)
  });



const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.set('view engine', 'ejs'); // Adicionando o html
app.use(express.static('public')); // Adicionando o css & imagens

app.get('/', (req, res) => {
  Pergunta.findAll({raw:true , order: [
  ['id','DESC'] // ASC = Crescente , DESC = Decrescente
  ]}).then((perguntas) => {

    res.render('index',{
      perguntas: perguntas
    })
  })


  

});

app.get('/perguntar', (req, res) => {
    res.render('perguntar')
});

app.post('/salvarpergunta', (req, res) => {
    const titulo = req.body.titulo
    const descricao = req.body.descricao

    Pergunta.create({

      titulo: titulo,
      descricao: descricao

    }).then(() => {
      res.redirect('/')
    })

 
});


app.get('/pergunta/:id', (req, res) => {
     const id = req.params.id;

     Pergunta.findOne({
       where: {id:id}
      
     }).then((pergunta)=>{
        if(pergunta != undefined){


          Resposta.findAll({
            where: {perguntaId: pergunta.id},
            order: [
              ['id','DESC']
            ]
          
          }).then((respostas) => {

            res.render('pergunta',{
              pergunta:pergunta,
              respostas: respostas
            });

          });

            

        }else{
            res.redirect('/')
        }
     })


  });


app.post('/responder', (req, res) => {
    const corpo = req.body.corpo;
    const perguntaId = req.body.pergunta;

    Resposta.create({
      corpo: corpo,
      perguntaId: perguntaId
    }).then(() => {
      res.redirect('/pergunta/'+ perguntaId)
    })

});



app.listen(port, () => {
  console.log(` http://localhost:${port}`)
});
