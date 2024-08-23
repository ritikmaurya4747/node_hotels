// //Sets up Passport with a local authentication strategy, using a Person model for use
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');


passport.use(new LocalStrategy(async (username,password, done)=>{
    // console.log('Received credentials',username,password);
    try { 
        const user = await Person.findOne({ username });

        console.log("Username: ", username);
        if(!user)
            return done(null,false, {message:'Incorrect username'});
        
        const isPasswordMatch = await user.comparePassword(password);
        if(isPasswordMatch)
            return done(null,user);
        else
            return done(null, false, {message:'Incorrect password'});
        
    } catch (err) {
        return done(err);
    }
}));

module.exports = passport;




// // *************password kaise hash hota hain****************** 
// // ritik ---- jnsjksjkjnkjnksljnkk   // ritik yaha real password
// // Login ---- maurya    //
// // jnsjksjkjnkjnksljnkk   ---- extract salt  // ishme se sahi password nikalega

// // salt + maurya  --- hash ---- fbjhfsjhufuifuiyuj  // salt+maurya ko hash me convert kiya ab line 33 wala hash me mila ke check karega agar dono sahi raha to password correct ho jayega 





