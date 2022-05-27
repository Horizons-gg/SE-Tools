"use strict";
//? Initialize the app
exports.__esModule = true;
var fs = require("fs");
var xml2js = require("xml2js");
var xmlParser = new xml2js.Parser();
var xmlBuilder = new xml2js.Builder({ rootName: 'Definitions' });
//? Preparation
if (fs.existsSync('./Blocks'))
    fs.rmdirSync('./Blocks', { recursive: true });
fs.mkdirSync('./Blocks');
fs.mkdirSync("./Blocks/Large");
fs.mkdirSync("./Blocks/Small");
//? Build Mod
xmlParser.parseStringPromise(fs.readFileSync('./blocks.sbc', 'utf8'))
    .then(Build)["catch"](function (err) { return console.error(err); });
function Build(xml) {
    xml = xml.Definitions.Definition;
    var Large = {};
    var Small = {};
    xml.forEach(function (block) {
        if (block.CubeSize[0] === 'Large') {
            if (!Large[block.Id[0].TypeId[0]])
                Large[block.Id[0].TypeId[0]] = [];
            return Large[block.Id[0].TypeId[0]].push(block);
        }
        else {
            if (!Small[block.Id[0].TypeId[0]])
                Small[block.Id[0].TypeId[0]] = [];
            return Small[block.Id[0].TypeId[0]].push(block);
        }
    });
    for (var Type in Large) {
        fs.writeFileSync("./Blocks/Large/".concat(Type, ".sbc"), xmlBuilder.buildObject({
            $: { 'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance' },
            CubeBlocks: {
                Definition: Large[Type]
            }
        }));
    }
    for (var Type in Small) {
        fs.writeFileSync("./Blocks/Small/".concat(Type, ".sbc"), xmlBuilder.buildObject({
            $: { 'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance' },
            CubeBlocks: {
                Definition: Small[Type]
            }
        }));
    }
    //fs.writeFileSync(`./Blocks/${def}.sbc`, xmlBuilder.buildObject(xml[def][0]))
}
//# sourceMappingURL=app.js.map