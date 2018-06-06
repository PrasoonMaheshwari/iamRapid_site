var fs = require("fs");
const editJson = require("edit-json-file");
let file = editJson("Cura/resources/machines/fdmprinter.json");
file.get().categories.resolution.settings.layer_height.default = 0.3;
file.get().categories.infill.settings.infill_sparse_density.default = 30;
file.save();