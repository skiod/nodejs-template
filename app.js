// const http = require('http');

// const server = http.createServer((req,res) => {
//      if(req.url === '/'){
//           res.write('hello world');
//           res.end();
//      }
//      if(req.url === '/api/courses'){
//           res.write('courses');
//           res.end();
//      }
// });

// server.listen(3030);
// console.log("Listening on port 3000 ...");

const _ = require('underscore');

var check = _.contains([1,2,3,4],5);

console.log(check);