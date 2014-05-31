var fs = require('fs');
var g = [];
var vertices = {};
var file = 'kargerMinCut.txt';
fs.readFile('test.txt', 'utf-8', function(err, data) {
	if (err) throw err;
	g = data.split('\n');
	for (var i = 1; i <= g.length; i++) {
		vertices[i] = {
			v: i
		};
	}
	console.log(vertices);
	g = g.map(linked);

	while (g.length > 2) {
		g = cut(g);
	}
	for (var i = 0; i< g.length; i++) {
		console.log(g[i].head,g[i].tail);
	}
});

function linked(a) {
	var m = a.split('\t');
	var result = {
		head: vertices[m[0]],
		tail: []
	};
	for (var i = 1; i < m.length - 1; i++) {
		result.tail.push(vertices[m[i]]);
	}
	return result;
}

var cut = function(arr) {
	var i = Math.random() * arr.length << 0;
	var j = Math.random() * arr[i].tail.length << 0;
	var a = vertices[arr[i].head.v];
	var b = vertices[arr[i].tail[j].v];
	var bi = null;
	var result = [];
	for (var k = 0; k < arr.length; k++) {
		if (arr[k].head === b) {
			bi = k;
			break;
		}
	}

	console.log(i, j, a, b, bi);
	var temp = [];
	for(var k = 0; k < arr[i].tail.length; k++) {
		if (arr[i].tail[k] !== b) temp.push(arr[i].tail[k]);
	}
	arr[i].tail = temp;

	temp = [];
	for(var k = 0; k < arr[bi].tail.length; k++) {
		if (arr[bi].tail[k] !== a) temp.push(arr[bi].tail[k]);
	}
	arr[bi].tail = temp;

	arr[i].tail.concat(arr[bi].tail);

	for (var k = 0; k < arr.length; k++) {
		if (k !== bi) result.push(arr[k]);
	}

	vertices[b.v].v = vertices[a.v].v;	
	return result;
}