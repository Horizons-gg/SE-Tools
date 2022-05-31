//? Initialize the app

const Setup = require('./setup.json')

const fs = require('fs')
const xml2js = require('xml2js')
const Limit = require('./lib/limits')

const xmlParser = new xml2js.Parser()
const xmlBuilder = new xml2js.Builder()



//? Prepare XML

let Config = {
    BlockLimiterConfig: {
        $: { "xmlns:xsd": 'http://www.w3.org/2001/XMLSchema', "xmlns:xsi": 'http://www.w3.org/2001/XMLSchema-instance' }
    }
}

Config.BlockLimiterConfig = {
    LimitItems: [{
        LimitItem: []
    }],
    MaxBlocksSmallGrid: '0',
    MaxBlocksLargeGrid: '0',
    MaxBlockSizeShips: '0',
    MaxBlockSizeStations: '0',
    MaxBlockSizeProjections: '0',
    MaxSmallGrids: '0',
    MaxLargeGrids: '0',
    BlockType: 'None',
    EnableLimits: 'true',
    UseVanillaLimits: 'false',
    KillNoOwnerBlocks: 'true',
    ServerName: 'Server',
    LogFileName: 'BlockLimiter-${shortdate}.log',
    DenyMessage: 'Limit reached\n{BC} blocks denied\nBlockNames:\n{BL}',
    ProjectionDenyMessage: '{BC} blocks removed from Projection.\nBlockNames =\n{BL}',
    GeneralException: [],
    EnableGridSpawnBlocking: 'true',
    EnableConvertBlock: 'false',
    BlockOwnershipTransfer: 'true',
    MergerBlocking: 'true',
    Annoy: 'true',
    PunishInterval: '900',
    AnnoyMessage: "You're in violation of set limits.  Use [!blocklimit mylimit] to view which limits you've exceeded.",
    AnnoyInterval: '300',
    AnnoyDuration: '15000'
}


//!
//! Generate Limits
//!

//? Ship Class Limits
Setup.ClassLimits.forEach(Obj => {

    let Group = []

    if (Obj.A) Obj.A.forEach((x, index) => Group.push(new Limit.ShipClass(Obj, `A${index + 1}`)))
    if (Obj.B) Obj.B.forEach((x, index) => Group.push(new Limit.ShipClass(Obj, `B${index + 1}`)))
    if (Obj.C) Obj.C.forEach((x, index) => Group.push(new Limit.ShipClass(Obj, `C${index + 1}`)))
    if (Obj.D) Obj.D.forEach((x, index) => Group.push(new Limit.ShipClass(Obj, `D${index + 1}`)))

    Config.BlockLimiterConfig.LimitItems[0].LimitItem = Config.BlockLimiterConfig.LimitItems[0].LimitItem.concat(Group)

})


//? General Limits
Setup.GeneralLimits.forEach(Obj => {

    let Group = []

    if (Obj.player) Group.push(new Limit.Player(Obj))
    if (Obj.faction) Group.push(new Limit.Faction(Obj))

    Config.BlockLimiterConfig.LimitItems[0].LimitItem = Config.BlockLimiterConfig.LimitItems[0].LimitItem.concat(Group)

})






//? Output XML

fs.writeFileSync('./BlockLimiter.cfg', xmlBuilder.buildObject(Config))