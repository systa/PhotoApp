//
// This file, hopefully, gradually transsfers from learning-support (for typescript) to
// somethink useful.
// Copyright(C), Kari Systä, 20222.
//



import { createServer, IncomingMessage, ServerResponse } from 'http';


const    pposts = [
	{
	    title: 'Lorem ipsum',
    	    content: 'Dolor sit amet'
	}
    ];

class MyServer {

    port = 5000;

    posts = [
	{
	    title: 'Lorem ipsum',
    	    content: 'Dolor sit amet'
	}
    ];

    constructor () {
	const server = createServer(this.onRequest);
	server.on( "error", (error) => {
  	    console.log("BOOM!: ");
	    console.log(error);
	});
	server.listen(this.port, () => {
	    console.log(`Server listening on port ${this.port}`);
	    console.log("This.Class = " + this.constructor.name);

	});
	console.log("This.Class = " + this.constructor.name);
    }
    
    private onRequest(request: IncomingMessage, response: ServerResponse)  {
    	console.log("this=" + this + ":" + this.port);
	switch (request.url) {
	case '/posts': {
	    if (request.method === 'GET') {
		response.write("POSTS:");
		response.write(JSON.stringify(pposts));
		response.end();
	    }
	    break;
	}
	case "/query": {
	    console.log("This.Class = " + this.constructor.name);
	    if (request.method === 'POST') {
		var input = "";
		request.on("data", (chunk) => {
		    console.log("This.Class = " + this.constructor.name);
		    console.log("data=" + chunk);
		    input += chunk;
		});
		request.on("end", () => {
		    console.log("Input=" + input);
		    response.write("THANKS received " + input.length + " characters");
		    response.end();
		});
	    }
	    break;
	}
	default: {
	    response.write("Not here");
	    response.statusCode = 404;
	    response.end();
	}
	}
    }
} ;

var myServer = new MyServer();
