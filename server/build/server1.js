"use strict";
//
// This file, hopefully, gradually transsfers from learning-support (for typescript) to
// somethink useful.
// Copyright(C), Kari Systä, 20222.
//
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var pposts = [
    {
        title: 'Lorem ipsum',
        content: 'Dolor sit amet'
    }
];
var MyServer = /** @class */ (function () {
    function MyServer() {
        var _this = this;
        this.port = 5000;
        this.posts = [
            {
                title: 'Lorem ipsum',
                content: 'Dolor sit amet'
            }
        ];
        var server = http_1.createServer(this.onRequest);
        server.on("error", function (error) {
            console.log("BOOM!: ");
            console.log(error);
        });
        server.listen(this.port, function () {
            console.log("Server listening on port " + _this.port);
            console.log("This.Class = " + _this.constructor.name);
        });
        console.log("This.Class = " + this.constructor.name);
    }
    MyServer.prototype.onRequest = function (request, response) {
        var _this = this;
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
                    request.on("data", function (chunk) {
                        console.log("This.Class = " + _this.constructor.name);
                        console.log("data=" + chunk);
                        input += chunk;
                    });
                    request.on("end", function () {
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
    };
    return MyServer;
}());
;
var myServer = new MyServer();
