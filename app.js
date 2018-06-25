var express =require("express");
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");
var cmd=require('node-cmd');
var StlThumbnailer = require('node-stl-thumbnailer');
var fileUpload = require("express-fileupload");
var unzip = require("unzip-stream");
const methodOverride = require('method-override');
const editJson = require("edit-json-file");
// const path = require("path");
// const crypto = require('crypto');
const mongoose = require('mongoose');
// const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');


app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(fileUpload());
app.use(express.static("public"));

// const mongoURI = "mongodb://iamrapid:rapid123@ds255930.mlab.com:55930/iamrapid"
// const conn = mongoose.createConnection(mongoURI);
mongoose.connect("mongodb://localhost/rapid");
// // Init gfs
// let gfs;

// conn.once('open', () => {
//   // Init stream
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('rapids');
// });

var rapidSchema = new mongoose.Schema({
   name: String,
   printTime: Number,
   weight: Number
//   price: Number
//   possibilities : [
//         Layer: String,
//         Infill:String, 
//         Price : String 
//   ]
});

var cartSchema = new mongoose.Schema({
   name: String,
   price: Number,
   quantity: Number,
});

var Rapid = mongoose.model("Rapid", rapidSchema);
var Cart = mongoose.model("Cart", cartSchema);

var sampleFileName;


app.get("/",function(req, res) {
    var cartItems;
    Cart.find({}, function(err, obj){
       if(err){
           console.log(err);
       } else {
            cartItems = obj.length;
            Rapid.find({}, function(err, obj){
                if(err){
                   console.log(err);
                } else {
                  res.render("new",{obj:obj,cartItems:cartItems});
                }
            });
        }
    });   
});

app.get("/mycart",function(req, res) {
    Cart.find({}, function(err, obj){
        if(err){
            console.log(err);
        } else {
            res.render("cart",{obj:obj});
        }
    });
});

var fileNameArray=[];

app.post('/upload', (req, res) => {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
     
    let sampleFile = req.files.sampleFile;
    sampleFileName = req.files.sampleFile.name;
    
    sampleFile.mv('public/uploads/'+ sampleFileName, function(err) {
        if (err)
          return res.status(500).send(err);
        if(sampleFile.mimetype ==='application/octet-stream')
        {
            stltoimg();
            var cmdURL = commandURL();
            let file = editJson("Cura/resources/machines/fdmprinter.json");
            file.get().categories.resolution.settings.layer_height.default = 0.2;
            file.get().categories.infill.settings.infill_sparse_density.children.infill_line_distance.default = 2.333;
            file.save();
            cmd.get(cmdURL, function (){
                var dataTime = fs.readFileSync("outputTime.txt", "utf8");
                var dataWeight = fs.readFileSync("outputWeight.txt", "utf8");
                var newRapid = {name: sampleFileName, printTime: Number(dataTime), weight: Number(dataWeight)};
                Rapid.create(newRapid, function(err, newlyCreated){
                    if(err){
                        console.log(err);
                    }
                    else {
                    }
                });
                res.redirect("/");
            });
 
        }
        else if(sampleFile.mimetype ==='application/x-zip-compressed')
        {
            //unzipping
            fs.createReadStream("public/uploads/"+sampleFileName)
            .pipe(unzip.Parse())
            .on('entry', (entry)=> {
                 var filePath = entry.path;
                 var fileType = filePath.slice(-4);
                 var fileName = filePath.slice(6,filePath.length);
                 var type = entry.type; // 'Directory' or 'File'
                 var size = entry.size; // might be undefined in some archives
                 if (fileType === ".stl" || fileType === ".STL") {
                        //console.log("Choco");
                        sampleFileName=fileName;
                        //console.log(sampleFileName);
                        fileNameArray.push(sampleFileName);
                        entry.pipe(fs.createWriteStream("public/uploads/"+fileName));
                  } 
                  else {
                        entry.autodrain();
                  }
            });
            res.redirect("/upload/zip");
        }
        else{
            console.log("Enter .stl file");
            sampleFileName = '';
            res.redirect("/");
        }
    });
});

app.get("/upload/zip",function(req, res) {
    //console.log(fileNameArray);
    //console.log(fileNameArray.length);
    if(fileNameArray.length===0)
        res.redirect("/");    
    else
    {
        sampleFileName=fileNameArray.pop();
        stltoimg();
        //console.log("Cura Start");
        var cmdURL = commandURL();
        let file = editJson("Cura/resources/machines/fdmprinter.json");
        file.get().categories.resolution.settings.layer_height.default = 0.2;
        file.get().categories.infill.settings.infill_sparse_density.children.infill_line_distance.default = 2.333;
        file.save();
        cmd.get(cmdURL, function(err){
        if (!err) {
            //console.log("Cura End");
            var dataTime = fs.readFileSync("outputTime.txt", "utf8");
            var dataWeight = fs.readFileSync("outputWeight.txt", "utf8");
            //console.log(dataTime);
            //console.log(dataWeight);
            var newRapid = {name: sampleFileName, printTime: Number(dataTime), weight: Number(dataWeight)};
            Rapid.create(newRapid, function(err, newlyCreated){
                if(err){
                    console.log(err);
                }
                else {
                    res.redirect("/upload/zip");
                }
            });
        } else {
            console.log('error', err);
            }
        });
    }
});


app.post("/modify/:id",function(req,res){
    // gfs.files.find().toArray((err, files) => {
     var layerHeight = req.body.height;
     var infill = req.body.infill;
     var name = req.body.fileName[0];
     console.log(name);
     //sampleFileName=req.body.fileName[0];
     var cmdURL = modifyCommandURL(name);
     //console.log(sampleFileName[0]);
    //  var createStream = fs.createWriteStream( "findingFanny.txt");
    //       createStream.end();
    //       fs.writeFileSync("findingFanny.txt", req);
     console.log(layerHeight + "  " + infill);
     
     let file = editJson("Cura/resources/machines/fdmprinter.json");
     file.get().categories.resolution.settings.layer_height.default = layerHeight;
     file.get().categories.infill.settings.infill_sparse_density.children.infill_line_distance.default = infill;
     file.save();
     cmd.get(cmdURL, function (){
                var dataTime = fs.readFileSync("outputTime.txt", "utf8");
                var dataWeight = fs.readFileSync("outputWeight.txt", "utf8");
                console.log(dataTime);
                console.log(dataWeight);
                Rapid.findByIdAndUpdate(req.params.id, {
                    name: name,
                    printTime: Number(dataTime),
                    weight: Number(dataWeight)
                }, function(err, updatedRapid){
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log(updatedRapid);
                            res.redirect("/");
                        }
                })
    
                //var newRapid = {name: sampleFileName, printTime: dataTime, weight: dataWeight};
    
            });
    
});

app.post("/AddToCart/:id",function(req,res){
    // gfs.files.find().toArray((err, files) => {
    var Price = Number(req.body.Price);
    var name = req.body.fileName;
    var qnt = Number(req.body.quantity);
    console.log(req.body);
    var newCart = {name: name, price: Price, quantity: qnt};
    Cart.create(newCart, function(err, newlyCreated){
                     if(err){
                        console.log(err);
                     }
                     else {
                        Rapid.findByIdAndRemove(req.params.id, function (err){
                            res.redirect("/");
                        });
                     }
                 });
});
// delete route
app.get("/delete/:id",function(req, res) {
    Rapid.findByIdAndRemove(req.params.id, function (err){
        res.redirect("/");
    });
});

app.get("/deletecart/:id",function(req, res) {
    Cart.findByIdAndRemove(req.params.id, function (err){
        res.redirect("/mycart");
    });
});


// function to run command in terminal
function commandURL(){
    return 'cd CuraEngine-2.1.3 && \ ./build/CuraEngine slice -v -j ../Cura/resources/machines/dual_extrusion_printer.json -o "output/test.gcode" -e1 -s infill_line_distance=0 -e0 -l "../public/uploads/' + sampleFileName + '"';
};
function modifyCommandURL(name){
    return 'cd CuraEngine-2.1.3 && \ ./build/CuraEngine slice -v -j ../Cura/resources/machines/dual_extrusion_printer.json -o "output/test.gcode" -e1 -s infill_line_distance=0 -e0 -l "../public/uploads/' + name + '"';
};


// function to create new data of a new stl file
function uploadtodb(newd){
    Rapid.create(newd, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
    });
}



// function to modify existing data of a stl file



// function to upload a JSON file
function uploadJSON(){
    
    var dataTime = fs.readFileSync("outputTime.txt", "utf8");
    var dataWeight = fs.readFileSync("outputWeight.txt", "utf8");    
    fs.readFile('public/uploadFiles.json', 'utf8', function readFileCallback(err, data){
        var obj = JSON.parse(data); //now it an object
        if(sampleFileName)
        {
            if (err){
                console.log(err);
            } else {
                var flag =0;
                obj.users.forEach(function(temp){
                    if(temp.name === sampleFileName)
                    {
                        temp.printTime=dataTime;
                        temp.printWeight=dataWeight;
                        flag=1;
                    }
                });
                if(flag===0)
                {
                    obj.users.push({ "name": sampleFileName , "printTime" : Number(dataTime) , "printWeight" : Number(dataWeight)}); //add some data
                }
                var json = JSON.stringify(obj); //convert it back to json
                fs.writeFile('public/uploadFiles.json', json, 'utf8'); // write it back 
            }
        }
    }); 
    
}    



// function to get image of stl file
function stltoimg(){
    var thumbnailer = new StlThumbnailer({
        //url: req.query.url,           // url OR filePath must be supplied, but not both
        filePath: "public/uploads/" + sampleFileName,            // load file from filesystem
        requestThumbnails: [
            {
                width: 350,
                height: 350,
            }
        ]   
    })
    .then(function(thumbnails){
          // thumbnails is an array (in matching order to your requests) of Canvas objects
          // you can write them to disk, return them to web users, etc
          thumbnails[0].toBuffer(function(err, buf){      
          //res.contentType('image/png');
          //console.log(typeof buf);
          var createStream = fs.createWriteStream("public/" + sampleFileName + ".jpg");
          createStream.end();
          fs.writeFileSync("public/"+ sampleFileName + ".jpg", buf);
        })
    });
}

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server is Up..!!"); 
});
