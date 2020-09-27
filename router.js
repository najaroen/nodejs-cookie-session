const express = require('express');
const router = express.Router();
//https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

router.get('/', (req, res, next) => {
    res.send({
        message:'Welcome to api',
        status: 200
    })
})
router.get('/get-products', (req, res, next) => {
    // res.setHeader('Set-Cookie', 'isLogin=true; HttpOnly'); 
    // HttpOnly   attribute is inaccessible to the JavaScript Document.cookie API; it is sent only to the server. For example, cookies that persist server-side sessions don't need to be available to JavaScript, and should have the HttpOnly attribute
    // Max-Age=10   max-age—instead of having to specify a date, you can just say how long the cookie can live
    // Secure attribute is sent to the server only with an encrypted request over the HTTPS protocol

    req.session.isLogin = true;
    res.status(200).json({
        message:'ok',
        status:200,
        data:[
            { product_id: 1, product_name: 'egg'},
            { product_id: 2, product_name: 'putding'},
            { product_id: 3, product_name: 'melon'}
        ]
    })
})

router.get('/check-cookie', (req, res, next) => {
    console.log('=>', req.session)
    console.log(req.get('Cookie'))
    res.send({
        message:'ok',
        status: 200
    })
})
// Session is strore in server side
module.exports = router;