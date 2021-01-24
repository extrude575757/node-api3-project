const express = require('express');

const Posts = require('./posts-model.js');
const { validatePost,validatePostId, validateBody } = require('../middleware/middleware')
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

router.delete('/:id', (req, res,next) => {
  // do your magic!
  // this needs a middleware to verify post id

  Posts.remove(req.params.id,validatePostId,(req,res,next))
  .then(p =>{
    console.log('getting remove id',p,req.params.id)
    try{
      if(p !== undefined && p === 1){

        res.status(200).json({message: `${req.params.id} has been removed`})
        }else{
          res.status(404).json({message:'delete not found 404 as undefined'})
        }
    }catch(e){
      
      res.status(500).json({message: '500 error /:id posts-router.js possible Disconection',errormsg:e })
    }
    
  })
  .catch( er =>{
    next(er)
  })
});

router.put('/:id', (req, res,next) => {
  // do your magic!
  // this needs a middleware to verify post id
  console.log('withinput',req)
  Posts.update(req.params.id, req.query,validatePostId, (req, res,next) )
    .then(up =>{
      console.log('updatehere',up);
      res.status(200).json(req.query);
    })
    .catch( er =>{
      res.status(500).json({
        message: 'error happened 500 put /:id'
      })
    })
});


router.use((error, req, res, next) => {
  res.status(500).json({
    info: 'something horrible happened inside the posts router',
    message: error.message,
    stack: error.stack,
  })
})



// do not forget to export the router
module.exports = router;