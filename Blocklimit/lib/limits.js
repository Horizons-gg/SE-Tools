const Classes = {
    A: ['SupportedStationsOnly', 1000, 3000, 5000, 8000, 8000],
    B: ['StationsOnly', 750, 2500, 5000, 7500, 7500],
    C: ['LargeGridsOnly', 750, 2500, 5000, 7500, 7500],
    D: ['SmallGridsOnly', 250, 500, 1000, 1000]
}



class ShipClass {

    constructor(Obj, Class) {
        let ClassType
        if (['A', 'B', 'C'].includes(Class.charAt(0))) {
            ClassType = Class.charAt(1) === '5' ? '>' : '<'
        } else ClassType = Class.charAt(1) === '4' ? '>' : '<'

        this.Name = `${Obj.name} | ${Class} Class [${ClassType}${Classes[Class.charAt(0)][Class.charAt(1)]} Blocks]`
        this.BlockList = { string: Obj.blocks.map(block => block) }
        this.Exceptions = { string: Obj.exceptions.map(exception => exception) }
        this.LimitFaction = 'false'
        this.LimitGrids = 'true'
        this.LimitPlayers = 'false'
        this.Punishment = Obj.dangerous ? 'DeleteBlock' : 'ShutOffBlock'
        this.IgnoreNpcs = 'true'
        this.RestrictProjection = Obj.dangerous
        this.LimitFilterType = 'GridBlockCount'

        this.GridTypeBlock = Classes[Class.charAt(0)][0]
        this.FilterValue = Classes[Class.charAt(0)][Class.charAt(1)]
        this.Limit = Obj[Class.charAt(0)][Class.charAt(1) - 1]

        if (Class.charAt(1) === '4') this.LimitFilterOperator = 'GreaterThan'
        else this.LimitFilterOperator = 'LessThan'
    }

}


class Player {
    constructor(Obj) {
        this.Name = `${Obj.name} [Player Limit]`
        this.BlockList = { string: Obj.blocks.map(block => block) }
        this.Exceptions = { string: Obj.exceptions.map(exception => exception) }
        this.LimitFaction = 'false'
        this.LimitGrids = 'false'
        this.LimitPlayers = 'true'
        this.Punishment = Obj.dangerous ? 'DeleteBlock' : 'ShutOffBlock'
        this.IgnoreNpcs = 'true'
        this.RestrictProjection = Obj.dangerous
        this.LimitFilterType = 'None'
        this.GridTypeBlock = 'AllGrids'
        this.FilterValue = '0'
        this.Limit = Obj.player
        this.LimitFilterOperator = 'LessThan'
    }
}


class Faction {
    constructor(Obj) {
        this.Name = `${Obj.name} [Faction Limit]`
        this.BlockList = { string: Obj.blocks.map(block => block) }
        this.Exceptions = { string: Obj.exceptions.map(exception => exception) }
        this.LimitFaction = 'true'
        this.LimitGrids = 'false'
        this.LimitPlayers = 'false'
        this.Punishment = Obj.dangerous ? 'DeleteBlock' : 'ShutOffBlock'
        this.IgnoreNpcs = 'true'
        this.RestrictProjection = Obj.dangerous
        this.LimitFilterType = 'None'
        this.GridTypeBlock = 'AllGrids'
        this.FilterValue = '0'
        this.Limit = Obj.faction
        this.LimitFilterOperator = 'LessThan'
    }
}


class Grid {
    constructor(Obj) {
        this.Name = `${Obj.name} [Grid Limit]`
        this.BlockList = { string: Obj.blocks.map(block => block) }
        this.Exceptions = { string: Obj.exceptions.map(exception => exception) }
        this.LimitFaction = 'false'
        this.LimitGrids = 'true'
        this.LimitPlayers = 'false'
        this.Punishment = Obj.dangerous ? 'DeleteBlock' : 'ShutOffBlock'
        this.IgnoreNpcs = 'true'
        this.RestrictProjection = Obj.dangerous
        this.LimitFilterType = 'None'
        this.GridTypeBlock = 'AllGrids'
        this.FilterValue = '0'
        this.Limit = Obj.grid
        this.LimitFilterOperator = 'LessThan'
    }
}


class Blacklist {
    constructor(Blocks) {
        this.Name = `Blacklisted`
        this.BlockList = { string: Blocks }
        this.Exceptions = { string: [] }
        this.LimitFaction = 'true'
        this.LimitGrids = 'true'
        this.LimitPlayers = 'true'
        this.Punishment = 'DeleteBlock'
        this.IgnoreNpcs = 'false'
        this.RestrictProjection = 'true'
        this.LimitFilterType = 'None'
        this.GridTypeBlock = 'AllGrids'
        this.FilterValue = '0'
        this.Limit = '0'
        this.LimitFilterOperator = 'LessThan'
    }
}



module.exports = {
    ShipClass,
    Player,
    Faction,
    Grid,
    Blacklist
}