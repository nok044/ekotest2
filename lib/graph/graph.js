const graph = class Graph {

    constructor() {
        this.graph = []
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
            throw new Error('Invalid param(s)');

        if(cost === 0)
            throw new Error('Cost must > 0');

        this._addNode(name, edge, cost)
        return this
    }

    _addNode(name, edge, cost){
        let foundNode = this._findNode(name)

        if(!foundNode){
            foundNode = {
                name: name,
                edge: []
            }

            this.graph.push(foundNode)
        }

        this._addEdge(foundNode, edge, cost)
    }

    _addEdge(node, edge, cost){
        let foundEdge = node.edge.filter(n => n.name === edge)

        if(foundEdge.length){
            foundEdge = foundEdge.pop()
            if(foundEdge.cost !== cost)
                throw new Error('Edge conflict found');
        }else{
            node.edge.push({
                name: edge,
                cost: cost
            })
        }
    }
}

module.exports = graph