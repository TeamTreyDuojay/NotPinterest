const express = require('express');
const userController = require('./controllers/user');
const postedimages = require('./controllers/posted-images');
const addModels = require('./middleware/add-models');
const checkAuthentication = require('./middleware/check-authentication');
const PostedImages = require('./db/models/posted-images');

const Router = express.Router();
Router.use(addModels);

Router.get('/cookieCounter', (req, res) => {
  const { session } = req;
  console.log(session);
  session.viewCount = (session.viewCount || 0) + 1;
  console.log(session.viewCount);
  res.status(200).send({ count: session.viewCount });
});

// Create
Router.post('/users', userController.create);
Router.post('/users/login', userController.login);

//test my new route
Router.post('/posted-images', postedimages.create);//This handles incoming request from my page
Router.get('/h', postedimages.list);//
Router.delete('/:id', postedimages.destroy);



// Read
Router.get('/users', userController.list);
Router.get('/users/:id', userController.show);
Router.get('/me', userController.showMe);
// checkAuthentication middleware is applied to only to this route (and /logged-in-secret)
//Didnt neeed to do this but I wanted to test an idea 
Router.get('/logged-in-secret', checkAuthentication, (req, res) => {
 // res.send({ msg: 'The secret is: there is no secret.' });
 const accessKey = 'i7Jn4SkydZNS5zzkFxSdoi1r7VovkEBA5TuOYj_gN2M'
 const query = 'landscape'; // example query
  //const page = 2; // example page
  const perPage = 3; // example per page

  fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=${perPage}&client_id=${accessKey}`)
    .then(response => response.json())
    .then(data => {
      const images = data.results.slice().map(result => result.urls.regular);
      res.send({ msg: 'Here are the images:', images });
    })
    .catch(error => {
      console.error('Error fetching images from Unsplash API:', error);
      res.status(500).send({ error: 'Error fetching images from Unsplash API' });
    });
});

// Router.get('/logged-in-secret', checkAuthentication, (req, res) => {
//   res.send("hi");
// });

// Update
Router.patch('/users/:id', checkAuthentication, userController.update);

// Delete
Router.delete('/users/logout', userController.logout);

//Router.delete('/posted-images/:id', postedimages.delete)


/*Router.get('/posted-images/:id', async (req, res) => {
  const { id } = req.params;

  // Call the deleteImage method from the model to delete the image
  const deletedImage = await PostedImages.delete(id);

  // Send a response back to the client
  if (deletedImage) {
    res.send(`Image with ID ${id} has been deleted`);
  } else {
    res.status(404).send(`Image with ID ${id} not found`);
  }
});

*/

// const wrk = async(req, res) => {
// //  const {
// //   db: {PostedImages}
// //   body{}
// //  }
//   const plz = await PostedImages.list()
//   console.log(plz)
//   res.send(plz)
// }
// Router.get('/y', (req, res) => {
//   const data = {
//     name: 'John',
//     age: 30,
//     occupation: 'Developer'
//   };
//   res.send(data);
// })


module.exports = Router;
