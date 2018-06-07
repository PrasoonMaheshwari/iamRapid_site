var express =require("express");
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");
const editJson = require("edit-json-file");



app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req, res) {
    var data = fs.readFileSync("output.txt", "utf8");
    res.render("index",{data : data});
});

app.get("/cura",function(req,res){
   res.render("new"); 
});

app.post("/",function(req,res){
    var layerHeight = req.body.height;
    var infill = req.body.infill;
    console.log(layerHeight + "  " + infill);
    let file = editJson("Cura/resources/machines/fdmprinter.json");
    file.get().categories.resolution.settings.layer_height.default = layerHeight;
    file.get().categories.infill.settings.infill_sparse_density.default = infill;
    file.save();
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server is Up..!!"); 
});