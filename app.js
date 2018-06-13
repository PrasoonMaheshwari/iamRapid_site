var express =require("express");
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");
var cmd=require('node-cmd');
var StlThumbnailer = require('node-stl-thumbnailer');
var fileUpload = require("express-fileupload");
const methodOverride = require('method-override');
const editJson = require("edit-json-file");

app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(fileUpload());
app.use(express.static("public"));

var sampleFileName;

app.get("/",function(req, res) {
     var data = fs.readFileSync("output.txt", "utf8");
     //stltoimg();
     res.render("new",{data : data});
});    


app.post('/upload', (req, res) => {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    console.log(req.files);
    let sampleFile = req.files.sampleFile;
    sampleFileName = req.files.sampleFile.name;
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('uploads/'+ sampleFileName, function(err) {
    if (err)
      return res.status(500).send(err);
    res.redirect('/');
    });
});

app.post("/modify",function(req,res){
    // gfs.files.find().toArray((err, files) => {
     var layerHeight = req.body.height;
     var infill = req.body.infill;
     var cmdURL = commandURL();
     console.log(layerHeight + "  " + infill);
     stltoimg();
    
     let file = editJson("Cura/resources/machines/fdmprinter.json");
     file.get().categories.resolution.settings.layer_height.default = layerHeight;
     file.get().categories.infill.settings.infill_sparse_density.children.infill_line_distance.default = infill;
     file.save();
     cmd.get(
         cmdURL
         ,function(err, data, stderr){
             if (!err) {
               console.log('terminal runs');
                 res.redirect("/");
             }else {
               console.log('error', err);
             }
         }
    );
    
});

function commandURL(){
    return 'cd CuraEngine-2.1.3 && \ ./build/CuraEngine slice -v -j ../Cura/resources/machines/dual_extrusion_printer.json -o "output/test.gcode" -e1 -s infill_line_distance=0 -e0 -l "../uploads/' + sampleFileName + '"';
};
    

function stltoimg(){
    var thumbnailer = new StlThumbnailer({
        //url: req.query.url,           // url OR filePath must be supplied, but not both
        filePath: "uploads/" + sampleFileName,            // load file from filesystem
        requestThumbnails: [
            {
                width: 200,
                height: 200,
            }
        ]   
    })
    .then(function(thumbnails){
          // thumbnails is an array (in matching order to your requests) of Canvas objects
          // you can write them to disk, return them to web users, etc
          thumbnails[0].toBuffer(function(err, buf){      
          //res.contentType('image/png');
          //console.log(typeof buf);
          fs.writeFileSync("public/output.jpg", buf);
         // res.send(buf);
        })
    });
    // .catch(function(err){
    //     res.status(500);
    //     res.send("Error thumbnailing: "+err);
    // });
}

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server is Up..!!"); 
});