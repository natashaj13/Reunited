//wrong queries.js, use the one in api

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'natasha',
  host: 'localhost',
  database: 'api',
  password: 'anyone678',
  port: 5432,
})


const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getUserByName = (request, response) => {
    const name = request.params.name
    pool.query('SELECT * FROM users WHERE name = $1', [name], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { name, email } = request.body
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${id}`)
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
}


module.exports = {
    getUsers,
    getUserByName,
    //getEmailCount,
    createUser,
    updateUser,
    deleteUser,
}
   