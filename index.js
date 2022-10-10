require('dotenv').config()

const {
    Client
      } = require('pg');

const express = require('express')
const app = express()
app.use(express.json())

//console.log(process.env)

const {
    USER_DB, 
    HOST_DB, 
    DATABASE_DB, 
    PASSWORD_DB,
    PORT_DB} = process.env

//ElephantSQL
//VARIAVEIS ARMAZENADAS NAS "CHAVES" ESTÃO NO ARQUIVO DOTENV
const client = new Client({
    user:       USER_DB,
    host:       HOST_DB,
    database:   DATABASE_DB,
    password:   PASSWORD_DB,
    port:       PORT_DB
});

app.get('/medicos', async (req, res) =>{
    client.connect()
    const { rows } = await client.query('SELECT * FROM tb_medico')
    console.log(rows)
    res.json(rows)
})

app.listen(3000, () => console.log('Executando...'))
  