const PostedImages = require("../../db/models/posted-images");//imports from the model class

const listImg = async (req, res) => {
    const {
      session,
      db: { PostedImages },//get the PostedImages from the db that was imported from the model
      body: { url },
    } = req;
    userId = session.userId//we are accessing user id from that session but to understand this better watch ben lecture cuz he stated from the fronted this time which is more clear
    //console.log(url,userId)//you can run the this look in the controllers i left a message so you can see where its comming from
    const img = await PostedImages.list(url,userId);
    //console.log(img.img_url)
    //const img = await PostedImages.create(url, userId);
    
  
    res.send(img);
  };
  
  module.exports = listImg;
  

  // const create = async (req, res) => {
  //   const { PostedImages, body: { title } } = req;
  //   const newTask = await PostedImages.create();
  //   newTask
  //     ? res.status(201).send(newTask)
  //     : res.status(500).send({ err: "Can't create" });
  // };
  
  // module.exports = create;
  
  