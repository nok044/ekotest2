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

            let node = graph.graph.filter(n => n.name === 'A').pop()

            assert.equal(node.name,'A')
            assert.equal(node.edge.length,1)
            assert.equal(node.edge[0].name,'B')
            assert.equal(node.edge[0].cost,1)
        })

        it('adds a duplicate node', () => {
            const graph = new Graph()

            graph.addNode('A', 'B', 1)

            let node = graph.graph.filter(n => n.name === 'A').pop()

            assert.equal(node.name,'A')
            assert.equal(node.edge.length,1)
            assert.equal(node.edge[0].name,'B')
            assert.equal(node.edge[0].cost,1)

            expect(() => graph.addNode('A', 'B', 2)).toThrow('Edge conflict found')
        })

        it('adds 2 new node', () => {
            const graph = new Graph()

            graph.addNode('A', 'B', 1)

            let node = graph.graph.filter(n => n.name === 'A').pop()

            assert.equal(node.name,'A')
            assert.equal(node.edge.length,1)
            assert.equal(node.edge[0].name,'B')
            assert.equal(node.edge[0].cost,1)

            graph.addNode('B', 'C', 2)

            node = graph.graph.filter(n => n.name === 'B').pop()

            assert.equal(node.name,'B')
            assert.equal(node.edge.length,1)
            assert.equal(node.edge[0].name,'C')
            assert.equal(node.edge[0].cost,2)
        })

        it('adds a new node with 2 edge', () => {
            const graph = new Graph()

            graph.addNode('A', 'B', 1)

            let node = graph.graph.filter(n => n.name === 'A').pop()

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
})