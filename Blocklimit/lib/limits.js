const Classes = {
    A: ['SupportedStationsOnly', 1000, 3000, 8000, 8000],
    B: ['StationsOnly', 750, 2500, 7500, 7500],
    C: ['LargeGridsOnly', 750, 2500, 7500, 7500],
    D: ['SmallGridsOnly', 250, 500, 1000, 1000]
}



class ShipClass {

    constructor(Obj, Class) {

        let ClassType = Class.charAt(1) === '4' ? '>' : '<'

        this.Name = `${Obj.name} | ${Class} Class [${ClassType}${Classes[Class.charAt(0)][Class.charAt(1)]} Blocks]`
        this.BlockList = { string: Obj.blocks.map(block => block) }
        this.Exceptions = { string: Obj.exceptions.map(exception => exception) }
        this.LimitFaction = 'false'
        this.LimitGrids = 'true'
        this.LimitPlayers = 'false'
        this.Punishment = Obj.dangerous ? 'ShutOffBlock' : 'DeleteBlock'
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

    constructor(Obj, Class) {

        let ClassType = Class.charAt(1) === '4' ? '>' : '<'

        this.Name = `${Obj.name} | ${Class} Class [${ClassType}${Classes[Class.charAt(0)][Class.charAt(1)]} Blocks]`
        this.BlockList = { string: Obj.blocks.map(block => block) }
        this.Exceptions = { string: Obj.exceptions.map(exception => exception) }
        this.LimitFaction = 'false'
        this.LimitGrids = 'true'
        this.LimitPlayers = 'false'
        this.Punishment = Obj.dangerous ? 'ShutOffBlock' : 'DeleteBlock'
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



module.exports = {
    ShipClass,
    Player
}