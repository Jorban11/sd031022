require('dotenv').config()

const {Client} = require('pg');

const express = require('express')
const app = express()
app.use(express.json())

//console.log(process.env)

const {
    USER_DB, 
    HOST_DB, 
    DATABASE_DB, 
    PASSWORD_DB,
    PORT_DB} = process.env//Pegar itens com o mesmo nome dentro de uma biblioteca

//ElephantSQL
//VARIAVEIS ARMAZENADAS NAS "CHAVES" ESTÃO NO ARQUIVO DOTENV
function obterCliente(){
    return new Client({
        user:       USER_DB,
        host:       HOST_DB,
        database:   DATABASE_DB,
        password:   PASSWORD_DB,
        port:       PORT_DB 
    });
}

app.get('/medicos', async (req, res) =>{
    let client = obterCliente()
    client.connect();
    const { rows } = await client.query('SELECT * FROM tb_medico');
    console.log(rows);
    await client.end();

    res.json(rows);
})  

app.get('/clientes', (req,res)=>{ //Faz a mesma coisa, porém escrito de uma maneira
                                  //diferente
    let client = obterCliente()
    client.connect();
    let status;
    let resultadoFinal;

    client.query('SELECT * FROM tb_paciente')
    .then(result =>{
        console.log(result);
        //res.send(result.rows)
        resultadoFinal = result.rows
        status = 200
    })
    .catch(err =>{ 
        console.log(err) 
        //res.status(500).end()
        status = 500
    })     
    .finally(()=>{
        client.end()
        .then(() => {res.status(status).send(resultadoFinal).end()})

    })   
})                           ;

app.post('/medicos',async (req,res)=>{
    let client = obterCliente()
    client.connect()
    //const crm = req.body.crm
    //const nome = req.body.nome 
    const {crm, nome} = req.body

    //Não concatenar string
    //const sql = `INSERT INTO tb_medico (crm, nome) VALUES(${crm}, '${nome}')`;
    const sql = "INSERT INTO tb_medico (crm, nome) VALUES( $1 , $2 )"

    const result = await client.query(sql, [crm,nome])
    console.log(result)

    await client.end() 
    res.end()  
})
 
app.listen(3000, () => console.log('Executando...'));
  