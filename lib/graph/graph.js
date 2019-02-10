const graph = class Graph {

    constructor() {
        this.paths = []
    }

    /**
     * Adds a node to the graph
     *
     * @param {string} name - Name of the node
     * @param {string} edge - Name of the edge
     * @param {int} cost - Number of the cost
     * @return {this}
     */
    addNode(name, edge, cost){
        if(typeof name !== 'string' || typeof edge !== 'string' || !isFinite(cost))
            throw new Error('Invalid param(s)')

        if(cost === 0)
            throw new Error('Cost must > 0')

        this._addNode(name, edge, cost)

        return this
    }

    /**
     *
     * Compute the cost path between the specified routes
     * @param {array} paths - Array of nodes name
     * @return {int} cost path between
     */
    specifiedPaths(paths){
        if(paths.constructor.name !== 'Array')
            throw new Error('Invalid param(s)')

        if(paths.length < 2)
            throw new Error('Paths must​ ​choose​ ​at​ ​least​ ​2​ node')

        let startNode = this._findNode(paths[0])
        let end = paths[paths.length-1]

        if(!startNode)
            throw new Error('No​ ​Such​ ​Route')

        let cost = 0

        for(let c = 0;c<paths.length-1;c++){
            let foundRoute = this._findRoute(paths[c],paths[c+1])
            if(!foundRoute)
                throw new Error('No​ ​Such​ ​Route')

            cost += foundRoute.cost
        }

        return cost
    }

    /**
     *
     * Find possible path between specified point
     * @param {string} start - Start point
     * @param {string} end - End point
     * @param {object} condition - condition to find possible path
     * @return {array} possible path
     */
    possiblePaths(start, end, condition){
        if(typeof start !== 'string' || typeof end !== 'string' || (condition && typeof condition !== 'object'))
            throw new Error('Invalid param(s)')

        let startNode = this._findNode(start)

        if(!startNode)
            throw new Error('No​ ​Such​ ​Route')

        let possiblePaths = []

        this._possiblePaths(startNode, [startNode.name], possiblePaths, condition)

        possiblePaths = possiblePaths.filter(p => p[p.length-1] === end)

        if(!condition || !condition.allowSameRoute) {
            for(let c = 0;c<possiblePaths.length;c++){
                for(let d = 0;d<possiblePaths[c].length;d++){
                    let found  = false
                    for(let e = 0;e<possiblePaths.length;e++){
                        let tmp1 = possiblePaths[c]
                        let tmp2 = possiblePaths[e]
                        if(e !== c && tmp2.join(',') && tmp1.join(',').indexOf(tmp2.join(',')) === 0 && tmp1[tmp1.length-1] === end){
                            found = true
                            break
                        }
                    }
                    if(found){
                        possiblePaths[c] = []
                        break
                    }else{
                        let tmp = possiblePaths[c].shift()
                        possiblePaths[c].push(tmp)
                    }
                }
            }

            possiblePaths = possiblePaths.filter(p => p.length)
        }

        return possiblePaths
    }

    /**
     *
     * Find shortest path between specified point
     * @param {string} start - Start point
     * @param {string} end - End point
     * @param {object} condition - condition to find possible path
     * @return {object} shortest path and cost
     */
    shortestPaths(start, end, condition){
        if(typeof start !== 'string' || typeof end !== 'string' || (condition && typeof condition !== 'object'))
            throw new Error('Invalid param(s)')

        let possiblePaths = this.possiblePaths(start, end, condition)

        let shortestPath = []
        let minCost = Infinity
        possiblePaths.forEach(p => {
            let cost = this.specifiedPaths(p)

            if(cost < minCost){
                shortestPath = p
                minCost = cost
            }
        })

        return {
            path: shortestPath,
            cost: minCost
        }
    }

    _addNode(name, edge, cost){
        let foundNode = this._findNode(name)

        if(!foundNode){
            foundNode = {
                name: name,
                edge: []
            }

            this.paths.push(foundNode)
        }

        this._addEdge(foundNode, edge, cost)
    }

    _addEdge(node, edge, cost){
        let foundEdge = node.edge.filter(n => n.name === edge)

        if(foundEdge.length){
            foundEdge = foundEdge.pop()
            if(foundEdge.cost !== cost)
                throw new Error('Edge conflict found')
        }else{
            node.edge.push({
                name: edge,
                cost: cost
            })
        }
    }

    _findNode(name){
        return this.paths.filter(n => n.name === name).pop()
    }

    _findRoute(name, edge){
        let node = this._findNode(name)
        if(!node)
            return undefined

        return this._findNode(name).edge.filter(n => n.name === edge).pop()
    }

    _possiblePaths(node, paths, possiblePaths, condition){
        node.edge.forEach(n => {
            if(!condition || !condition.allowSameRoute) {
                let path = paths.join(',')
                if (path.indexOf(node.name+','+n.name) !== -1)
                    return
            }

            let currentPath = paths.slice(0)
            currentPath.push(n.name)

            if(condition && condition.maxCost) {
                let cost = this.specifiedPaths(currentPath)
                if(cost > condition.maxCost)
                    return
            }

            possiblePaths.push(currentPath)

            if(!condition || !condition.allowLoop) {
                let foundExistPath = paths.filter(e => e === n.name)
                if (foundExistPath.length)
                    return
            }


            if(condition && condition.maxStop) {
                if(currentPath.length-1 === condition.maxStop)
                    return
            }

            let currentNode = this._findNode(n.name)
            if(currentNode)
                this._possiblePaths(currentNode, currentPath, possiblePaths, condition)
        })
    }
}

module.exports = graph