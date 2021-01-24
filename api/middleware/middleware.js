const Posts = require('../posts/posts-model.js')

/*
- `logger()`

  - `logger` logs to the console the following information about each request: request method, request url, and a timestamp
  - this middleware runs on every request made to the API

- `validateUserId()`

  - this middleware will be used for all user endpoints that include an `id` parameter in the url (ex: `/api/users/:id` and it should check the database to make sure there is a user with that id.

  - if the `id` parameter is valid, store the user object as `req.user` and allow the request to continue
  - if the `id` parameter does not match any user id in the database, respond with status `404` and `{ message: "user not found" }`

- `validateUser()`

  - `validateUser` validates the `body` on a request to create or update a user
  - if the request `body` is missing, respond with status `400` and `{ message: "missing user data" }`
  - if the request `body` lacks the required `name` field, respond with status `400` and `{ message: "missing required name field" }`



*/


function logger(req, res, next) {
  // do your magic!
}

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!

}


/*
- `validatePostId()`

  - this middleware will be used for all post endpoints that include an `id` parameter in the url (ex: `/api/posts/:id` and it should check the database to make sure there is a post with that id.

  - if the `id` parameter is valid, store the post
   object as `req.post` and allow the request to 
   continue
  - if the `id` parameter does not match any post 
  id in the database, respond with status `404` and 
  `{ message: "post not found" }`

*/

 function validatePostId(req, res, next) {
  // do your magic!
  res.set('X-Validating-Header','si');
  console.log('now after validatePostId')
  const id =   Posts.getById(req.params.id)
  try{
    if (id !== undefined ) {
      req.posts = id;
      console.log(req.posts);
      next();
    }else{
      res.status(404).json({message: `Post notfound validatePostId with ${req.params.id} not found`})
    }
  }
  catch(er){
    res.status(500).json('validatePostId 500 errord',er)
  }
}

/*
- `validatePost()`

  - `validatePost` validates the `body` on a request to create a new post
  - if the request `body` is missing, respond with status `400` and `{ message: "missing post data" }`
  - if the request `body` lacks the required `text` field, respond with status `400` and `{ message: "missing required text field" }`

*/

function validatePost(req, res, next) {
  // do your magic!
  const { text } = req.body;
  try{
    console.log(req.body)

    if (text){
      next();
    } else{
      res.status(400).json({
        message: "ValidatePost 400 missing required text field"
      })
    }
  } catch(er){
    res.status(400).json({ message: "missing post data" })
  }
}

// do not forget to expose these functions to other modules
module.exports = { validatePost, validatePostId }