const assert = require('assert');
const expect = require('expect');

const Graph = require('../../lib/graph');

describe('Graph', () => {
    describe('#addNode()', () => {
        it('Invalid name', () => {
            const graph = new Graph()

            expect(() => graph.addNode(0, 'B', 1)).toThrow('Invalid param(s)')
        })

        it('Invalid edge', () => {
            const graph = new Graph()

            expect(() => graph.addNode('A', 0, 1)).toThrow('Invalid param(s)')
        })

        it('Invalid cost', () => {
            const graph = new Graph()

            expect(() => graph.addNode('A', 'B', 'C')).toThrow('Invalid param(s)')
        })

        it('Zero cost', () => {
            const graph = new Graph()

            expect(() => graph.addNode('A', 'B', 0)).toThrow('Cost must > 0')
        })

        it('adds a new node', () => {
            const graph = new Graph()

            graph.addNode('A', 'B', 1)

            let node = graph.paths.filter(n => n.name === 'A').pop()

            assert.equal(node.name,'A')
            assert.equal(node.edge.length,1)
            assert.equal(node.edge[0].name,'B')
            assert.equal(node.edge[0].cost,1)
        })

        it('adds a duplicate node', () => {
            const graph = new Graph()

            graph.addNode('A', 'B', 1)

            let node = graph.paths.filter(n => n.name === 'A').pop()

            assert.equal(node.name,'A')
            assert.equal(node.edge.length,1)
            assert.equal(node.edge[0].name,'B')
            assert.equal(node.edge[0].cost,1)

            expect(() => graph.addNode('A', 'B', 2)).toThrow('Edge conflict found')
        })

        it('adds 2 new node', () => {
            const graph = new Graph()

            graph.addNode('A', 'B', 1)

            let node = graph.paths.filter(n => n.name === 'A').pop()

            assert.equal(node.name,'A')
            assert.equal(node.edge.length,1)
            assert.equal(node.edge[0].name,'B')
            assert.equal(node.edge[0].cost,1)

            graph.addNode('B', 'C', 2)

            node = graph.paths.filter(n => n.name === 'B').pop()

            assert.equal(node.name,'B')
            assert.equal(node.edge.length,1)
            assert.equal(node.edge[0].name,'C')
            assert.equal(node.edge[0].cost,2)
        })

        it('adds a new node with 2 edge', () => {
            const graph = new Graph()

            graph.addNode('A', 'B', 1)

            let node = graph.paths.filter(n => n.name === 'A').pop()

            assert.equal(node.name,'A')
            assert.equal(node.edge.length,1)
            assert.equal(node.edge[0].name,'B')
            assert.equal(node.edge[0].cost,1)

            graph.addNode('A', 'C', 2)

            assert.equal(node.name,'A')
            assert.equal(node.edge.length,2)
            let filter = node.edge.filter(n => n.name === 'C');
            assert.equal(filter.length,1)
            assert.equal(filter[0].cost,2)
        })
    })

    describe('#specifiedPaths()', () => {
        it('Invalid paths type', () => {
            const graph = new Graph()
            expect(() => graph.specifiedPaths('A')).toThrow('Invalid param(s)')
        })

        it('Invalid paths size', () => {
            const graph = new Graph()

            expect(() => graph.specifiedPaths(['A'])).toThrow('Paths must​ ​choose​ ​at​ ​least​ ​2​ node')
        })

        it('Invalid paths', () => {
            const graph = new Graph()

            expect(() => graph.specifiedPaths(['A','B'])).toThrow('No​ ​Such​ ​Route')
        })

        it('Find cost of 2 nodes', () => {
            const graph = new Graph()

            graph.addNode('A', 'B', 1)

            let cost = graph.specifiedPaths(['A','B'])
            assert.equal(cost, 1)
        })

        it('Find cost of 3 nodes', () => {
            const graph = new Graph()

            graph
                .addNode('A', 'B', 1)
                .addNode('B', 'C', 2)

            let cost = graph.specifiedPaths(['A','B','C'])
            assert.equal(cost, 3)
        })

        it('Invalid paths with data', () => {
            const graph = new Graph()

            graph
                .addNode('A', 'B', 1)
                .addNode('B', 'C', 2)

            expect(() => graph.specifiedPaths(['A','C'])).toThrow('No​ ​Such​ ​Route')
        })
    })

    describe('#possiblePaths()', () => {
        it('Invalid start type', () => {
            const graph = new Graph()
            expect(() => graph.possiblePaths(1,'B',{})).toThrow('Invalid param(s)')
        })

        it('Invalid end type', () => {
            const graph = new Graph()
            expect(() => graph.possiblePaths('A',1,{})).toThrow('Invalid param(s)')
        })

        it('Invalid condition type', () => {
            const graph = new Graph()
            expect(() => graph.possiblePaths('A','B',1)).toThrow('Invalid param(s)')
        })

        it('Invalid paths', () => {
            const graph = new Graph()

            expect(() => graph.possiblePaths('A','B')).toThrow('No​ ​Such​ ​Route')
        })

        it('Find possible path of 2 nodes', () => {
            const graph = new Graph()

            graph.addNode('A', 'B', 1)

            let paths = graph.possiblePaths('A','B')
            assert.equal(paths.length, 1)
            assert.equal(paths[0][0], 'A')
            assert.equal(paths[0][1], 'B')
        })

        it('Find possible path of 3 nodes', () => {
            const graph = new Graph()

            graph.addNode('A', 'B', 1)
                .addNode('B', 'C', 2)

            let paths = graph.possiblePaths('A','C')
            assert.equal(paths.length, 1)
            assert.equal(paths[0][0], 'A')
            assert.equal(paths[0][1], 'B')
            assert.equal(paths[0][2], 'C')
        })

        it('Find possible path of 3 nodes with multiple path', () => {
            const graph = new Graph()

            graph.addNode('A', 'B', 1)
                .addNode('B', 'C', 2)
                .addNode('A', 'C', 2)

            let paths = graph.possiblePaths('A','C')
            assert.equal(paths.length, 2)
        })

        it('Find possible path of 3 nodes with allowLoop', () => {
            const graph = new Graph()

            graph.addNode('A', 'B', 1)
                .addNode('B', 'C', 2)
                .addNode('A', 'C', 2)

            let paths = graph.possiblePaths('A','C', {
                allowLoop: true
            })
            assert.equal(paths.length, 2)
        })

        it('Find possible path of 3 nodes with maxStop', () => {
            const graph = new Graph()

            graph.addNode('A', 'B', 1)
                .addNode('B', 'C', 2)
                .addNode('A', 'C', 2)

            let paths = graph.possiblePaths('A','C', {
                maxStop: 1
            })
            assert.equal(paths.length, 1)
        })

        it('Find possible path of 3 nodes with allowSameRoute', () => {
            const graph = new Graph()

            graph.addNode('A', 'B', 1)
                .addNode('B', 'C', 2)
                .addNode('A', 'C', 2)

            let paths = graph.possiblePaths('A','C', {
                allowSameRoute: true
            })
            assert.equal(paths.length, 2)
        })

        it('Find possible path of 3 nodes with maxCost', () => {
            const graph = new Graph()

            graph.addNode('A', 'B', 1)
                .addNode('B', 'C', 2)
                .addNode('A', 'C', 2)

            let paths = graph.possiblePaths('A','C', {
                maxCost: 2
            })
            assert.equal(paths.length, 1)
        })
    })

    describe('#shortestPaths()', () => {
        it('Invalid start type', () => {
            const graph = new Graph()
            expect(() => graph.shortestPaths(1,'B',{})).toThrow('Invalid param(s)')
        })

        it('Invalid end type', () => {
            const graph = new Graph()
            expect(() => graph.shortestPaths('A',1,{})).toThrow('Invalid param(s)')
        })

        it('Invalid condition type', () => {
            const graph = new Graph()
            expect(() => graph.shortestPaths('A','B',1)).toThrow('Invalid param(s)')
        })

        it('Invalid paths', () => {
            const graph = new Graph()

            expect(() => graph.shortestPaths('A','B')).toThrow('No​ ​Such​ ​Route')
        })

        it('Find shortest path of 2 nodes', () => {
            const graph = new Graph()

            graph.addNode('A', 'B', 1)

            let paths = graph.shortestPaths('A','B')
            assert.equal(paths.cost, 1)
            assert.equal(paths.path[0], 'A')
            assert.equal(paths.path[1], 'B')
        })

        it('Find shortest path of 3 nodes', () => {
            const graph = new Graph()

            graph.addNode('A', 'B', 1)
                .addNode('B', 'C', 2)

            let paths = graph.shortestPaths('A','C')
            assert.equal(paths.cost, 3)
            assert.equal(paths.path[0], 'A')
            assert.equal(paths.path[1], 'B')
            assert.equal(paths.path[2], 'C')
        })

        it('Find shortest path of 3 nodes with multiple path', () => {
            const graph = new Graph()

            graph.addNode('A', 'B', 1)
                .addNode('B', 'C', 2)
                .addNode('A', 'C', 2)

            let paths = graph.shortestPaths('A','C')
            assert.equal(paths.cost, 2)
            assert.equal(paths.path[0], 'A')
            assert.equal(paths.path[1], 'C')
        })
    })
})