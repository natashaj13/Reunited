const Pool = require('pg').Pool
const pool = new Pool({
  user: 'natasha',
  host: 'localhost',
  database: 'api',
  password: 'anyone678',
  port: 5432,
})


const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}


const getUserByEmail = (request, response) => {
    const email = request.params.email
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

//this doesn't work because when you type users/1, it thinks 1 is a name
const getUserByID = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) { 
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getPassFromEmail = (request, response) => {
  const email = request.params.email
  pool.query('SELECT password FROM users WHERE email = $1', [email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//checks if email is already in db
const getEmailCount = (request, response) => {
  const email = request.params.email
  pool.query('SELECT COUNT(email) FROM users WHERE email = $1', [email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
} 


const createUser = (request, response) => {
  const { name, email, password, birthday, profilelink } = request.body
  pool.query('INSERT INTO users (name, email, password, birthday, profilelink) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, email, password, birthday, profilelink], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${response.id}`)
  })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email, password, birthday, profilelink } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2, password = $3, birthday = $4, profilelink = $5 WHERE id = $6',
      [name, email, password, birthday, profilelink, id],
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
    getUserByEmail,
    getUserByID, 
    getPassFromEmail, 
    getEmailCount,
    createUser,
    updateUser,
    deleteUser,
}
  