const jwt = require('jsonwebtoken')
const model = require('../models')

module.exports.signUp = async (req,res,next) => {
    try{
        let name  = req.body.name,
        email = req.body.email,
        password = req.body.password;

        let response = await model.User.subscribe(name,email,password)
        return res.status(200).send(response)
    }catch(e){
        return res.status(400).send(e)
    }
    

}

module.exports.signIn = async (req,res,next) => {
    try{

        let email = req.body.email,
        password = req.body.password;
        let response = await model.User.login(email,password)
        return res.status(200).send(response)

    }catch(e){
        return res.status(400).send(e)
    }
   
}