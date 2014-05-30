var fs = require('fs');
var g = [];
var file = 'kargerMinCut.txt';
fs.readFile('test.txt', 'utf-8', function(err, data) {
	if (err) throw err;
	g = data.split('\r\n').map(splitT);
	while (g.length > 2) {
		g = cut(g, Math.floor(Math.random() * g.length));
	}
	console.log(g);
});

function splitT(a) {
	return sliceLast(a.split('\t'));
}

function sliceLast(a) {
	var b = a.pop();
	return [a.shift(), a];
}

var cut = function(g, k) {
	var ak = g[k][0],
		line = [],
		unicLine = [],
		result = [],
		bl = g[k][1][Math.floor(Math.random() * g[k][1].length)];
	var bi;

	for (var i = 0; i < g.length; i++) {
		if (g[i][0] === bl) {
			bi = i;
			break;
		}
	}

	for (var i = 0; i < g.length; i++) {
		if (i !== k && i !== bi) {
			line = g[i][1];
			for (var j = 0; j < line.length; j++) {
				if (line[j] === bl) line[j] = ak;
			}
			result.push([g[i][0], line]);
		}
	}

	line = g[k][1].concat(g[bi][1]);
	for (var j = 0; j < line.length; j++) {
		if (line[j] === bl) line[j] = ak;
	}

	result.push([g[k][0], line]);

	return result;
}