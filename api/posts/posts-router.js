const express = require('express');

const Posts = require('./posts-model.js');
const { validatePost,validatePostId } = require('../middleware/middleware')
const router = express.Router();

router.get('/',   (req, res,next) => {
  // Get the posts db
  Posts.get('/', validatePost,(req,res,next))
    .then(posts => {
      console.log('samplier get req ',posts[0].text)
      res.status(200).json(posts);
    })
    .catch(er =>{
      next(er);
    })
});

router.get('/:id', (req, res,next) => {
  // do your magic!
  // this needs a middleware to verify post id
  Posts.getById(req.params.id,validatePostId,(req,res,next))
    .then(p =>{
      console.log('gettingid',p,req.params.id)
      try{
        if(p !== undefined){

          res.status(200).json(p)
          }else{
            res.status(404).json({message:'post not found 404 as undefined'})
          }
      }catch(e){
        res.status(500).json({message: '500 error /:id posts-router.js possible Disconection',errormsg:e })
      }
      
    })
    .catch( er =>{
      next(er)
    })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
});

router.put('/:id', (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
});


router.use((error, req, res, next) => {
  res.status(500).json({
    info: 'something horrible happened inside the hubs router',
    message: error.message,
    stack: error.stack,
  })
})



// do not forget to export the router
module.exports = router;