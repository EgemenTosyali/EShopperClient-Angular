import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  constructor() { }

  private _connection: HubConnection
  get connection(): HubConnection {
    return this._connection;
  }

  start(hubUrl: string) {
    const builder: HubConnectionBuilder = new HubConnectionBuilder();
    const hubConnection: HubConnection = builder.withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();
    hubConnection.start()
      .then(() => { console.log("Connected to Hub") })
      .catch(error => { setTimeout(() => this.start(hubUrl), 2000) });

    this._connection = hubConnection;

    this._connection.onreconnected(connectionId => console.log("Reconnected"));
    this._connection.onreconnecting(error => console.log("reconnecting"));
    this._connection.onclose(error => console.log("Close reconnection"));
  }

  invoke(procedureName: string, message: any, succesCallBack?: (value) => void, errorCallBack?: (error) => void) {
    this.connection.invoke(procedureName, message)
      .then(succesCallBack)
      .catch(errorCallBack);
  }

  on(procedureName: string, callBack: (...message: any) => void) {
    this.connection.on(procedureName, callBack);
  }
}
