// const jsonServer = require('json-server')
// const server = jsonServer.create()
// const path = require('path')
// const router = jsonServer.router(path.join(__dirname, 'db.json'))
// const middlewares = jsonServer.defaults()

// server.use(middlewares)
// server.use(router)
// server.listen(3000, () => {
//   console.log('JSON Server is running')
// })


const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/', (req, res) => {
  console.log(req);
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }

  if (req.method === 'GET') {
    console.log(Date.now());
  }
  // Continue to JSON Server router
  next()
})

// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
  }))

// In this example, returned resources will be wrapped in a body property
router.render = (req, res) => {
    console.log("AA:",res);
    res.jsonp({
      body: res.locals.data
    })
  }

// // In this example we simulate a server side error response
// router.render = (req, res) => {
//     res.status(404).jsonp({
//       error: "error message here"
//     })
//   }

// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})