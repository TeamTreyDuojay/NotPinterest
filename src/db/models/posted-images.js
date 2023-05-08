
// const knex = require('../knex');
// const authUtils = require('../../utils/auth-utils');

// class PostedImages {
//   #passwordHash = null;

  // This constructor is used ONLY by the model
  // to provide the controller with instances that
  // have access to the instance methods isValidPassword
  // and update.
//   constructor({ id, username, password_hash }) {
//     this.id = id;
//     this.username = username;
//     this.#passwordHash = password_hash;
//   }

//   static async list() {
//     try {
//       const query = 'SELECT * FROM users';
//       const { rows } = await knex.raw(query);
//       return rows.map((user) => new User(user));
//     } catch (err) {
//       console.error(err);
//       return null;
//     }
//   }

//   static async find(id) {
//     try {
//       const query = 'SELECT * FROM users WHERE id = ?';
//       const { rows: [user] } = await knex.raw(query, [id]);
//       return user ? new User(user) : null;
//     } catch (err) {
//       console.error(err);
//       return null;
//     }
//   }

//   static async findByUsername(username) {
//     try {
//       const query = 'SELECT * FROM users WHERE username = ?';
//       const { rows: [user] } = await knex.raw(query, [username]);
//       return user ? new User(user) : null;
//     } catch (err) {
//       console.error(err);
//       return null;
//     }
//   }

//   static async create(username, password) {
//     try {
//       const passwordHash = await authUtils.hashPassword(password);
//       console.log(passwordHash)
//       const query = `INSERT INTO users (username, password_hash)
//         VALUES (?, ?) RETURNING *`;
//       const { rows: [user] } = await knex.raw(query, [username, passwordHash]);
//       return new User(user);
//     } catch (err) {
//       console.error(err);
//       return null;
//     }
//   }

//   static async deleteAll() {
//     try {
//       return knex.raw('TRUNCATE users;');
//     } catch (err) {
//       console.error(err);
//       return null;
//     }
//   }
//}

// module.exports = User;

//testing express
// const app = require('express')
// const app = express()
// console.log(app)
// app.get('/create.html',async(req,res) => {
//   console.log(req)
// })

// require('dotenv').config();
// const path = require('path');
// const server = require('express');
// //const app = require('../..server/app');
// const app = server()
//  //console.log(app)
// // console.log(server)

// const port = process.env.PORT || 3000;
// const host = process.env.HOST || '127.0.0.1';
// server.listen(port, host, () => {
//   console.log(`yo running at http://${host}:${port}/`);
// });

// app.get('/api/me', (req, res) => {
//   console.log("1"); // Send back plain text
// });

// app.get('/create.html', (req, res) => {
//   console.log("2"); // Send back HTML
// })

// app.get('/health', (req, res) => {
//   // res.send({ status: 'OK', name: 'Ben' }); // Send back JSON
//   console.log("3");
// });


//FETCHING 
//const url = 'http://127.0.0.1:3000/api/me/create.html'
// fetch('http://127.0.0.1:3000/api/me').
// .then(response => {
//   response.json()
// })

// .then(data => {
//   res.send({ status: 'OK', name: 'Ben' })
// })

// const ex = require('express')
// const a = ex()

// const express = require('../../sexpress');
// const app = express();
// const port = process.env.PORT || 3000;
// const host = process.env.HOST || '127.0.0.1';
// const ap = require('../../server')
// console.log(ap)
// Define routes and middleware
// app.get('/', (req, res) => {
//   res.send('Hi'); // Send back plain text
// });

// app.get('/about', (req, res) => {
//   res.send('<h1>About Page</h1>') // Send back HTML
// })

// app.get('/health', (req, res) => {
//   res.send({ status: 'OK', name: 'Ben' }); // Send back JSON
// });

// // Start the server
// app.listen(port, host, () => {
//   console.log(`Server is now running on http://${host}:${port}`);
// });
// app.get('/api/me/create.html', (req, res) => {
//   //console.log("1"); // Send back plain text
// res.send('fd')
// });


require('dotenv').config();
const knex = require('../knex');
const authUtils = require('../../utils/auth-utils');
let yo = 0;
class PostedImages {


  // This constructor is used ONLY by the model
  // to provide the controller with instances that

  // and update.
  constructor({url,id}) {
    this.url = url;
    this.id = id;
  }


//   static async create(url,id) {//takes in the user_id and image url then places it into the table
//     try {
// //console.log(id)
//       const query = `INSERT INTO posted_images(img_url,user_id)
//         VALUES (?, ?) RETURNING *`;
//       const { rows: [img] } = await knex.raw(query, [url,id]);
//      // console.log(img.id)//I place this here so you can console.log to see what its returning
//      yo = img.id 
//       return img;
//     } catch (err) {
//       console.error(err);
//       return null;
//     }
//   }
  


static async create(url,id) {//takes in the user_id and image url then places it into the table
    try {
//console.log(id)
      const query = `INSERT INTO posted_images(img_url,user_id)
        VALUES (?, ?) RETURNING *`;
      const { rows: [img] } = await knex.raw(query, [url,id]);
     // console.log(img.id)//I place this here so you can console.log to see what its returning
  console.log("it wrk")
      return img;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async list() {
    try {
      const query = 'SELECT * FROM posted_images';
      const { rows } = await knex.raw(query);
      //return rows
      console.log("list")
     return rows
     //.map((post) => new PostedImages(post));
    } catch (err) {
      console.error(err);
      return null;
    }
  }


  static async delete(id) {
    try {
      //console.log(title)
      //tit = yo
      console.log("deleted")
      console.log(id)
      const result = await knex.raw(`
        DELETE FROM posted_images
        WHERE id=?
        RETURNING *
      `, [id]);
     // yo = result.rows[0].id
//console.log(yo)
      return result.rows[0];

    } catch (err) {
      console.error(err);
      return null;
    }
  }

  // static async delete(yo) {
  //   try {
  //     const result = await knex.raw(`
  //       DELETE FROM posted_images
  //       WHERE id=?
  //       RETURNING *
  //     `, [yo]);
  //     return result.rows[0];
  //   } catch (err) {
  //     console.error(err);
  //     return null;
  //   }
  // }

  // static async delete(url,id) {
  //   try {
  //     const result = await knex.raw(`
  //       DELETE FROM posted_images
  //       WHERE id=?
  //       RETURNING *
  //     `, [url,id]);
  //     return result.rows[0];
  //   } catch (err) {
  //     console.error(err);
  //     return null;
  //   }
  // }

  // static async delete(id) {
  //   try {
  //     id = yo
  //     console.log(id)
  //     const result = await knex.raw(`
  //       DELETE FROM posted_images
  //       WHERE id = ?
  //       RETURNING *
  //     `, [id]);
  //     return result.rows[0];
  //   } catch (err) {
  //     console.error(err);
  //     return null;
  //   }
  // }
  


}

//YOU CAN RUN THIS AND PASS THINGS INTO IT TEST WHATS GONNA BE DISPLAYED IN THE TERMINAL AND IN YOUR TABLEPLUS
// const test = async () => {
//   const postObj = await PostedImages.delete(34)
//   console.log(postObj)
// }
// test()

module.exports = PostedImages;
