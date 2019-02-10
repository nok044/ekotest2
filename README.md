# Eko Test

## Getting Started
Eko​ ​decide​ ​to​ ​introduce​ ​a​ ​new​ ​delivery​ ​services​ ​to​ ​the​ ​market​ ​in​ ​order​ ​to​ ​support​ ​growth​ ​of E-commerce​ ​business​ ​in​ ​Thailand.​ ​Due​ ​to​ ​innovative​ ​nature​ ​of​ ​the​ ​company,​ ​​ ​the​ ​ways​ ​to​ ​use​ ​their service​ ​is​ ​very​ ​innovative​ ​one.

To​ ​use​ ​Eko​ ​Delivery​ ​Service,​ ​their​ ​customers​ ​have​ ​to​ ​define​ ​the​ ​delivery​ ​route​ ​by​ ​themselves. They​ ​can​ ​construct​ ​it​ ​by​ ​choosing​ ​multiple​ ​routes​ ​between​ ​two​ ​towns​ ​that​ ​Eko​ ​provided.

The​ ​delivery​ ​cost​ ​is​ ​equal​ ​to​ ​the​ ​summation​ ​of​ ​these​ ​routes​ ​that​ ​they​ ​choosed.

Each​ ​routes​ ​in​ ​the​ ​list​ ​is​ ​only​ ​‘one-way’,​ ​That​ ​is,​ ​a​ ​route​ ​from​ ​town​ ​A​ ​to​ ​town​ ​B​ ​does​ ​not​ ​imply​ ​the existence​ ​of​ ​a​ ​route​ ​from​ ​town​ ​B​ ​to​ ​town​ ​A.​ ​Even​ ​if​ ​both​ ​of​ ​these​ ​routes​ ​do​ ​exist,​ ​they​ ​are​ ​distinct​ ​and are​ ​not​ ​necessarily​ ​have​ ​the​ ​same​ ​cost.

The​ ​purpose​ ​of​ ​this​ ​assignments​ ​is​ ​to​ ​help​ ​Eko​ ​building​ ​the​ ​system​ ​that​ ​provide​ ​their​ ​customers​ ​with information​ ​about​ ​delivery​ ​route.​ ​​ ​you​ ​will​ ​compute​ ​the​ ​delivery​ ​cost​ ​of​ ​a​ ​certain​ ​route,​ ​the​ ​number​ ​of possible​ ​delivery​ ​route​ ​between​ ​two​ ​towns,​ ​and​ ​the​ ​cost​ ​of​ ​cheapest​ ​delivery​ ​route​ ​between​ ​two towns.

This is a library to add the delivery path and their cost, find cost between path, find possible route between point and find cheapest path between point 

To run sample case

```shell
npm run start
```

```shell
the​ ​delivery​ ​cost​ ​for​ ​route​ ​A-B-E : 4
the​ ​delivery​ ​cost​ ​for​ ​route​ ​A-D : 10
the​ ​delivery​ ​cost​ ​for​ ​route​ ​​​E-A-C-F : 8
the​ ​delivery​ ​cost​ ​for​ ​route​ ​A-D-F : No​ ​Such​ ​Route
The​ ​number​ ​of​ ​possible​ ​delivery​ ​route​ ​from​ ​E​ ​to​ ​D​ ​with​ ​a​ ​maximum​ ​of​ ​4​ ​stop without​ ​using​ ​the​ ​same​ ​route​ ​twice​ ​in​ ​a​ ​delivery​ ​route : 4
The​ ​number​ ​of​ ​possible​ ​delivery​ ​route​ ​from​ ​E​ ​to​ ​E​ ​without​ ​using​ ​the​ ​same route​ ​twice​ ​in​ ​a​ ​delivery​ ​route : 5
Bonus​:​ ​the​ ​number​ ​of​ ​possible​ ​delivery​ ​route​ ​from​ ​E​ ​to​ ​E​ ​that​ ​delivery​ ​cost​ ​is less​ ​than​ ​20.​ ​Given​ ​that​ ​the​ ​same​ ​route​ ​can​ ​be​ ​used​ ​twice​ ​in​ ​a​ ​delivery​ ​route : 29
The​ ​cost​ ​of​ ​cheapest​ ​delivery​ ​route​ ​between​ ​E​ ​to​ ​D : 9
The​ ​cost​ ​of​ ​cheapest​ ​delivery​ ​route​ ​between​ ​E​ ​to​ ​E : 6
```

## Installation


```shell
npm install
```


## Usage

Basic example:

```js
const lib = require('./lib')
const Graph = lib.Graph

var graph = new Graph()

graph
    .addNode('A', 'B', 1)
    .addNode('B', 'C', 3)

graph.specifiedPaths(['A','B','C']) // => 4
graph.possiblePaths('A','C') // => [['A','B','C']]
graph.cheapestPaths('A','C') // => {path:['A','B','C'], cost: 4}

```

## API

### `Graph#addNode(name, edge, cost)`

Add a node to the nodes graph

#### Parameters

- `String name`: name of the node
- `String edge`: name of the edge
- `Integer cost`: number of the cost

#### Returns

Returns `this` allowing chained calls.

### `Graph#specifiedPaths(paths)`

Compute the cost path between the specified routes

#### Parameters

- `Array path`: Array of nodes name

#### Returns

Returns `int cost` between path.

### `Graph#possiblePaths(start, end, condition)`

Find possible path between specified point

#### Parameters

- `String start`: name of the start point
- `String end`: name of the end point
- `Object condition`: condition to find find
```js
{
    allowLoop: [boolean], //Allow find path with loop
    maxStop: [int], //Limit maximum route
    allowSameRoute: [boolean], //Allow find path with same route
    maxCost: [int]  //Limit maximum cost
}
```

#### Returns

Returns `array` of possible path.

### `Graph#cheapestPaths(start, end, condition)`

Find cheapest path between specified point

#### Parameters

- `String start`: name of the start point
- `String end`: name of the end point
- `Object condition`: condition to find find
```js
{
    allowLoop: [boolean], //Allow find path with loop
    maxStop: [int], //Limit maximum route
    allowSameRoute: [boolean], //Allow find path with same route
    maxCost: [int]  //Limit maximum cost
}
```


#### Returns

Returns `object` of cheapest path.

```js
{
    path: [array], //Cheapest path
    cost: [int] //Cheapest cost of this path
}
```


## Testing

```shell
npm test
```