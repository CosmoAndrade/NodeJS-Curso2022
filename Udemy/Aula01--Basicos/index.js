const express = require('express')
const app = express()
const port = 3000


// Query params = ?nome=NodeJS
// Route Params = /curso/2
// Request Body = { nome: 'Nodejs', tipo: 'Backend' }


app.get('/', (req, res) => {
  res.send('Hello World!')
})

const cursos = ['Python', 'Java','JavaScript','Node']


app.get('/curso/:index', (req, res) => {
  const index = req.params.index;
  return res.json(cursos[index]);
});



app.get('/nome/:id', (req, res) => {
  const id = req.params.id;

  return res.json({ curso: `Curso: ${id}`});
});

app.listen(port, () => {
  console.log(` http://localhost:${port}`)
})
