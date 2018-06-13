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
                    obj.users.push({ "name": sampleFileName , "printTime" : dataTime , "printWeight" : dataWeight}); //add some data
                }
                var json = JSON.stringify(obj); //convert it back to json
                fs.writeFile('public/uploadFiles.json', json, 'utf8'); // write it back 
            }
        }
        res.render("new", {obj:obj});
    });
});    


app.post('/upload', (req, res) => {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    //console.log(req.files);
    let sampleFile = req.files.sampleFile;
    sampleFileName = req.files.sampleFile.name;
    // Use the mv() method to place the file somewhere on your server
    
    sampleFile.mv('uploads/'+ sampleFileName, function(err) {
    if (err)
      return res.status(500).send(err);
      
    stltoimg();
    
     let file = editJson("Cura/resources/machines/fdmprinter.json");
     file.get().categories.resolution.settings.layer_height.default = 0.2;
     file.get().categories.infill.settings.infill_sparse_density.children.infill_line_distance.default = 2.333;
     file.save();
     cmd.get(
         cmdURL
         ,function(err, data, stderr){
             if (!err) {
               //console.log('terminal runs');
                 res.redirect("/");
             } else {
               console.log('error', err);
             }
         }
    );
    });
});

app.post("/modify",function(req,res){
    // gfs.files.find().toArray((err, files) => {
     var layerHeight = req.body.height;
     var infill = req.body.infill;
     var cmdURL = commandURL();
     console.log(layerHeight + "  " + infill);
     
     let file = editJson("Cura/resources/machines/fdmprinter.json");
     file.get().categories.resolution.settings.layer_height.default = layerHeight;
     file.get().categories.infill.settings.infill_sparse_density.children.infill_line_distance.default = infill;
     file.save();
     cmd.get(
         cmdURL
         ,function(err, data, stderr){
             if (!err) {
               //console.log('terminal runs');
                 res.redirect("/");
             } else {
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
          var createStream = fs.createWriteStream(sampleFileName + ".jpg");
          createStream.end();
          fs.writeFileSync("public/"+ sampleFileName + ".jpg", buf);
        })
    });
}

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server is Up..!!"); 
});