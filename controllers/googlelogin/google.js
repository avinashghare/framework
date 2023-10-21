const express = require('express')
const router = express.Router()
const __constants = require('../../config/constants')
const validationOfAPI = require('../../middlewares/validation')
const passport = require('../../config/passport')
// const cache = require('../../middlewares/requestCacheMiddleware') // uncomment the statement whenever the redis cache is in use.

/**
 * @namespace -HEALTH-CHECK-MODULE-
 * @description API’s related to HEALTH CHECK module.
 */
/**
 * @memberof -HEALTH-CHECK-module-
 * @name getPing
 * @path {GET} /api/healthCheck/getPing
 * @description Bussiness Logic :- In getPing API, we are just returning the sucess response and data true.
 * @response {string} ContentType=application/json - Response content type.
 * @response {string} metadata.msg=Success  - Response got successfully.
 * @response {string} metadata.data - It will return the data.
 * @code {200} if the msg is success the api returns succcess message.
 * @author Vasim Gujrati, 14th December 2022
 * *** Last-Updated :- Vasim Gujrati, 20th March 2023 ***
 */
const validationSchema = {
}
const validation = (req, res, next) => {
  console.log('validation')
  return validationOfAPI(req, res, next, validationSchema, 'query')
}
const ping = async (req, res) => {
  try {
    res.sendJson({ type: __constants.RESPONSE_MESSAGES.SUCCESS, data: true })
  } catch (err) {
    return res.sendJson({ type: err.type || __constants.RESPONSE_MESSAGES.SERVER_ERROR, err: err.err || err })
  }
}
router.get('/getPing', validation, ping)

// http://localhost:3005/api/googlelogin/google
// Route to start the Google OAuth authentication process
router.get('/google', validation, passport.authenticate('google', { scope: ['profile', 'email'] }), (req) => {
  console.log('req.user', req.user)
})

// Callback route after Google authentication
router.get('/callback', validation, passport.authenticate('google', { failureRedirect: '/google' }), (req, res) => {
  // Successful authentication, redirect or respond as needed
  console.log('req.user', req.user)
  console.log('res', res.user)
  console.log('inside /callback')
  res.render('pages/success', req.user)
  // console.log("req",req)
  // console.log("req.body",req.body)
  // console.log("res",res)
  // res.redirect('/profile');
})

// router.get('/callback', validation, passport.authenticate('google', { failureRedirect: '/google' }), (req, res) => {
//   console.log("req.user",req.user)
// });
// router.get('/getPing', cache.route(100), validation, ping) // example for redis cache in routes
module.exports = router
