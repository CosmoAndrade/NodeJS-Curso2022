
const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});


const cursos = ['Python', 'Java','JavaScript','Node']

app.get('/cursos', (req, res) => {
      return res.json(cursos)
});



app.get('/cursos/:index', (req, res) => {
  const index = req.params.index;
  return res.json(cursos[index]);
});

// Criando
app.post('/cursos', (req, res) => {
    const {name} = req.body;
    cursos.push(name)
    return res.json(cursos)
});

//Atualizando um curso
app.put('/cursos/:index', (req, res)=>{
  const { index } = req.params;
  const { name } = req.body;

  cursos[index] = name;

  return res.json(cursos);

});


//Excluindo algum curso
app.delete('/cursos/:index', (req, res)=>{
  const { index } = req.params;

  cursos.splice(index, 1);
  return res.send();
})

app.listen(port, () => {
  console.log(` http://localhost:${port}`)
});


