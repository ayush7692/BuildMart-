const multer = require('multer')

const storage = multer.diskStorage({

    destination :(req,file,cb)=>{
        cb(null,"upload" )
    },

    filename:(req,file,cb)=>{
        
        const filename =  Date.now()+ "."+ file.originalname.split(".")[1]
        cb(null,filename)
    }

})

const upload = multer({storage})

module.exports = upload