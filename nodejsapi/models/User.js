const bcrypt = require('bcryptjs')
const jwt    = require('jsonwebtoken')
module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('user', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password : DataTypes.STRING,
      },{underscored: true}
    );


  User.login = (email,password) => {
      return new Promise((resolve,reject) => {
          return User.findOne({where : { email : email}})
              .then(user => {
                  if(!user) return reject({message : 'Wrong email or password'})

                  return bcrypt.compare(password,user.toJSON().password)
                      .then(status =>{

                          if(!status) return reject({message : 'Wrong email or password'}) 

                          let token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_ENCRYPTION, { expiresIn: process.env.JWT_EXPIRATION });
                          return resolve({ user: user, access_token: token })

                      })
              })
              .catch(err => {
                   return reject({message : 'Wrong email or password'}) 
              })
      });
  };

  User.subscribe = (name,email,password) => {
        return new Promise(async (resolve,reject) => {
              try{
                  let user = await User.findOne({ where: { email: email } })
                  if (user) { return reject({message : 'email already taken'}) }
                  const encryptedPass = await bcrypt.hash(password, parseInt(process.env.JWT_SALT))
                  user = await User.create({ email: email, 
                                              name: name, 
                                          password: encryptedPass,
                                          })
                  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_ENCRYPTION, { expiresIn: process.env.JWT_EXPIRATION });
                  return resolve({ user: user, access_token: token })

              }catch(error){
                  return reject(error)
              }
              
        })
  }

  return User
}
