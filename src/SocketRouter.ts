///<reference path="types/types.d.ts"/>

import SocketRoute = require('./SocketRoute');

class SocketRouter {

  private routes:SocketRoute[];

  constructor(public io:SocketManager) {
    this.io.sockets.on('connection', this.onConnection.bind(this));
  }

  public route(name:string, callback:(...args)=>any) : void {
    var route = new SocketRoute(name, callback);
    this.routes.push(route);
    this.io.sockets.clients().forEach((socket:Socket)
      => this.attachRouteToSocket(route, socket));
  }

  private onConnection(socket:Socket) : void {
    this.routes.forEach((route:SocketRoute)
      => this.attachRouteToSocket(route, socket));
  }

  private attachRouteToSocket(route:SocketRoute, socket:Socket) : void {
    socket.on(route.name, route.callback);
  }

}

export = SocketRouter;