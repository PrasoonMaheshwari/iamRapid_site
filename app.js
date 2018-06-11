var express =require("express");
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");
var cmd=require('node-cmd');

// var NodeStl = require("node-stl"); 
const editJson = require("edit-json-file");


// // jQuery should exist in the global scope.
// import 'spectrum-colorpicker';
// import 'spectrum-colorpicer/spectrum.css';
// import ThreeSTLViewer from 'three-stl-viewer';


// let viewer = new ThreeSTLViewer({
//     selector: '#pikachu.stl-viewer',
//     urlToSTL: '/stl/pikachu.stl',
// });

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req, res) {
    var data = fs.readFileSync("output.txt", "utf8");
    res.render("new",{data : data});
    //console.log("get");
   //res.redirect("/");
});    

app.post("/",function(req,res){
    var layerHeight = req.body.height;
    var infill = req.body.infill;
    console.log(layerHeight + "  " + infill);
    let file = editJson("Cura/resources/machines/fdmprinter.json");
    file.get().categories.resolution.settings.layer_height.default = layerHeight;
    file.get().categories.infill.settings.infill_sparse_density.children.infill_line_distance.default = infill;
    file.save();
    
    cmd.get(
        'cd CuraEngine-2.1.3 && \ ./build/CuraEngine slice -v -j ../Cura/resources/machines/dual_extrusion_printer.json -o "output/test.gcode" -e1 -s infill_line_distance=0 -e0 -l "tests/test_cube.stl";',
        function(err, data, stderr){
            if (!err) {
               console.log('terminal runs');
                res.redirect("/");
            }else {
               console.log('error', err)
            }
        }
    );
    console.log("Post");
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server is Up..!!"); 
});