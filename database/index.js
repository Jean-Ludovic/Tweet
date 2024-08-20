const mongoose=require("mongoose");

mongoose
.connect("mongodb://admin:admin@127.0.0.1:27017/Projet?readPreference=primary&ssl=false&directConnection=true"
).then(()=>{
    console.log("Connected to the database projet");
}).
catch((err)=>console.log(err));
 