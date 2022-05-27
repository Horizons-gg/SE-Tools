const fs = require('fs')
const xml2js = require('xml2js')
const xmlParser = new xml2js.Parser()
const xmlBuilder = new xml2js.Builder()

fs.readdirSync('./').forEach(file => {
    var ext = file.split('.')

    if (file === 'main.js' || file === 'node_modules' || file === 'start.bat') return
    if (ext[ext.length - 1] !== 'sbc') {
        if (ext[ext.length - 1].includes('sbc')) fs.unlinkSync(`./${file}`)
        return
    }
    ext.pop()

    xmlParser.parseString(fs.readFileSync(`./${file}`, 'utf8'), (err, result) => {
        if (err) return console.log(`${file} failed to parse!`)

        result.Definitions.Prefabs[0].Prefab[0].$['xsi:type'] = 'MyObjectBuilder_ShipBlueprintDefinition'
        result.Definitions.Prefabs[0].Prefab[0].Id[0].$['Type'] = 'MyObjectBuilder_ShipBlueprintDefinition'

        var Blueprint = {
            Definitions: {
                '$': {
                    'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                ShipBlueprints: [{ ShipBlueprint: [] }]
            }
        }
        Blueprint.Definitions.ShipBlueprints[0].ShipBlueprint = result.Definitions.Prefabs[0].Prefab
        if (!fs.existsSync(`MES - ${ext.join('.')}`)) fs.mkdirSync(`MES - ${ext.join('.')}`)
        fs.writeFileSync(`./MES - ${ext.join('.')}/bp.sbc`, xmlBuilder.buildObject(Blueprint))
        fs.unlinkSync(file)
    })
})