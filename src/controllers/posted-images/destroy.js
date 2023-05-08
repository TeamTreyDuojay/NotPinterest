const PostedImages = require("../../db/models/posted-images");//imports from the model class
/*
const destroy= async (req, res) => {
    const {
      session,
      db: { PostedImages },//get the PostedImages from the db that was imported from the model
      body: { url },
    } = req;
    
    userId = session.userId//we are accessing user id from that session but to understand this better watch ben lecture cuz he stated from the fronted this time which is more clear
    //console.log(url,userId)//you can run the this look in the controllers i left a message so you can see where its comming from
    const img = await PostedImages.delete(url, userId);
    
  
    res.send(img);
  };
  
  module.exports = destroy;
  */

  // const destroy = async (req, res) => {
  //   const { PostedImages, params: { id } } = req;
  //   const result = await PostedImages.delete(id);
  //   console.log(result)
  //   res.send(result);
  // };
  
  // module.exports = destroy;


  // const destroy = async (req, res) => {
  //   const { PostedImages, params: { id } } = req;
  //   if (PostedImages && PostedImages.delete) {
  //     const result = await PostedImages.delete(Number(id));
  //     res.sendStatus(result ? 204 : 404);
  //   } else {
  //     res.sendStatus(404);
  //   }
  // };
  
  // module.exports = destroy;
  
  

  //const PostedImages = require("../../db/models/posted-images");//imports from the model class

// const desImg = async (req, res) => {
//     const {
//       session,
//       db: { PostedImages },//get the PostedImages from the db that was imported from the model
//       body: { url },
//     } = req;
//     userId = session.userId//we are accessing user id from that session but to understand this better watch ben lecture cuz he stated from the fronted this time which is more clear
//     //console.log(url,userId)//you can run the this look in the controllers i left a message so you can see where its comming from
//     const img = await PostedImages.delete(url);
//     console.log(img)
//     //const img = await PostedImages.create(url, userId);
    
  
//     res.send(img);
//   };
  
const deleteImage = async (id) => {
  // call the delete method of the PostedImages class and pass in the id
  const result = await PostedImages.delete(id);
  // return a boolean indicating if the deletion was successful or not
  return result ? true : false;
};

  module.exports = deleteImage;
  

  // const create = async (req, res) => {
  //   const { PostedImages, body: { title } } = req;
  //   const newTask = await PostedImages.create();
  //   newTask
  //     ? res.status(201).send(newTask)
  //     : res.status(500).send({ err: "Can't create" });
  // };
  
  // module.exports = create;
  
  