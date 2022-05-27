//? Initialize the app

import * as fs from 'fs'
import * as xml2js from 'xml2js'

const xmlParser = new xml2js.Parser()
const xmlBuilder = new xml2js.Builder({ rootName: 'Definitions' })



//? Preparation

if (fs.existsSync('./Blocks')) fs.rmdirSync('./Blocks', { recursive: true })
fs.mkdirSync('./Blocks')
fs.mkdirSync(`./Blocks/Large`)
fs.mkdirSync(`./Blocks/Small`)



//? Build Mod

xmlParser.parseStringPromise(fs.readFileSync('./blocks.sbc', 'utf8'))
    .then(Build)
    .catch(err => console.error(err))


function Build(xml) {
    xml = xml.Definitions.Definition

    let Large = {}
    let Small = {}

    xml.forEach(block => {

        if (block.CubeSize[0] === 'Large') {

            if (!Large[block.Id[0].TypeId[0]]) Large[block.Id[0].TypeId[0]] = []
            return Large[block.Id[0].TypeId[0]].push(block)

        } else {

            if (!Small[block.Id[0].TypeId[0]]) Small[block.Id[0].TypeId[0]] = []
            return Small[block.Id[0].TypeId[0]].push(block)

        }

    })


    for (const Type in Large) {
        fs.writeFileSync(`./Blocks/Large/${Type}.sbc`, xmlBuilder.buildObject({
            $: { 'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance' },
            CubeBlocks: {
                Definition: Large[Type]
            }
        }))
    }

    for (const Type in Small) {
        fs.writeFileSync(`./Blocks/Small/${Type}.sbc`, xmlBuilder.buildObject({
            $: { 'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance' },
            CubeBlocks: {
                Definition: Small[Type]
            }
        }))
    }

    //fs.writeFileSync(`./Blocks/${def}.sbc`, xmlBuilder.buildObject(xml[def][0]))

}