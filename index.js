const lib = require('./lib')
const Graph = lib.Graph

var graph = new Graph()

graph
    .addNode('A', 'B', 1)
    .addNode('A', 'C', 4)
    .addNode('A', 'D', 10)
    .addNode('B', 'E', 3)
    .addNode('C', 'D', 4)
    .addNode('C', 'F', 2)
    .addNode('D', 'E', 1)
    .addNode('E', 'B', 3)
    .addNode('E', 'A', 2)
    .addNode('F', 'D', 1)

console.log('the​ ​delivery​ ​cost​ ​for​ ​route​ ​A-B-E : %s', (() => {
    try{
        return graph.specifiedPaths(['A','B','E'])
    }catch (e) {
        return e.message
    }
})())
console.log('the​ ​delivery​ ​cost​ ​for​ ​route​ ​A-D : %s', (() => {
    try{
        return graph.specifiedPaths(['A','D'])
    }catch (e) {
        return e.message
    }
})())
console.log('the​ ​delivery​ ​cost​ ​for​ ​route​ ​​​E-A-C-F : %s', (() => {
    try{
        return graph.specifiedPaths(['E','A','C','F'])
    }catch (e) {
        return e.message
    }
})())
console.log('the​ ​delivery​ ​cost​ ​for​ ​route​ ​A-D-F : %s', (() => {
    try{
        return graph.specifiedPaths(['A','D','F'])
    }catch (e) {
        return e.message
    }
})())

console.log('The​ ​number​ ​of​ ​possible​ ​delivery​ ​route​ ​from​ ​E​ ​to​ ​D​ ​with​ ​a​ ​maximum​ ​of​ ​4​ ​stop without​ ​using​ ​the​ ​same​ ​route​ ​twice​ ​in​ ​a​ ​delivery​ ​route : %s', (() => {
    try{
        return graph.possiblePaths('E','D', {
            allowLoop: true,
            maxStop: 4
        }).length
    }catch (e) {
        return e.message
    }
})())

console.log('The​ ​number​ ​of​ ​possible​ ​delivery​ ​route​ ​from​ ​E​ ​to​ ​E​ ​without​ ​using​ ​the​ ​same route​ ​twice​ ​in​ ​a​ ​delivery​ ​route : %s', (() => {
    try{
        return graph.possiblePaths('E','E', {
            allowLoop: true
        }).length
    }catch (e) {
        return e.message
    }
})())

console.log('Bonus​:​ ​the​ ​number​ ​of​ ​possible​ ​delivery​ ​route​ ​from​ ​E​ ​to​ ​E​ ​that​ ​delivery​ ​cost​ ​is less​ ​than​ ​20.​ ​Given​ ​that​ ​the​ ​same​ ​route​ ​can​ ​be​ ​used​ ​twice​ ​in​ ​a​ ​delivery​ ​route : %s', (() => {
    try{
        return graph.possiblePaths('E','E', {
            allowLoop: true,
            allowSameRoute: true,
            maxCost: 19
        }).length
    }catch (e) {
        return e.message
    }
})())

console.log('The​ ​cost​ ​of​ ​cheapest​ ​delivery​ ​route​ ​between​ ​E​ ​to​ ​D : %s', (() => {
    try{
        return graph.shortestPaths('E','D').cost
    }catch (e) {
        return e.message
    }
})())

console.log('The​ ​cost​ ​of​ ​cheapest​ ​delivery​ ​route​ ​between​ ​E​ ​to​ ​E : %s', (() => {
    try{
        return graph.shortestPaths('E','E').cost
    }catch (e) {
        return e.message
    }
})())