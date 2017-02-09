var http=require('http');
var fs=require('fs');
var url = require('url');
var generateMaze = require('generate-maze-by-clustering');

var size=fs.readFileSync('mazesize.json');
var jsonstring=JSON.parse(size);
var server=http.createServer(function(require,response){
  response.writeHead(200, {"Content-Type": "text/plain"});
  var queryData = url.parse(require.url, true).query;
  if(queryData.alto&&queryData.ancho){
    var maze = generateMaze([queryData.alto, queryData.ancho]);
    console.log(maze.toText());
    response.write(maze.toText());
    response.end();
  }else{
    var maze = generateMaze([jsonstring.x, jsonstring.y]);
    console.log(maze.toText());
    response.write(maze.toText());
    response.end();
  }
});
server.listen(process.env.PORT||5000);
