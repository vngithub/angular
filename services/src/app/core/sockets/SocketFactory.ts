import { Injectable } from "@angular/core";
import * as socketIo from 'socket.io-client';
import { Message } from "../message/Message";
import { Observable, Subject } from "rxjs/Rx";
import { CentralCoreException } from "../exception/CentralCoreException";
import * as Events from './EventsEnum';
@Injectable()
export class SocketFactory {
    private socket;
    private static _instance:SocketFactory = new SocketFactory();
    constructor(){
        if(SocketFactory._instance){
            throw new CentralCoreException("Error: Instantiation failed: Use MessagingCenter.getInstance() instead of new.");
        }
    }

    /**
     * Returns instance of SocketFactory
     * @returns SocketFactory
     */
    public static getInstance():SocketFactory {
        return SocketFactory._instance;
    }

    /**
     * Establishes a socket connect with the provided service url
     * @param serverURL 
     */
    public initSocket(serverURL: string): void {
        this.socket = socketIo(serverURL);
    }

    /**
     * Sends message to server 
     * @param message 
     */
    public send(message: Message): void {
        this.socket.emit('message', message);
    }

    /**
     * Subscribes for message
     * @returns observable
     */
    public onMessage(): Observable<Message> {
        return new Observable<Message>(observer => {
            this.socket.on('message', (data: Message) => {
                observer.next(data)
            });
        });
    }

    /**
     * Subscribes for events
     * @param event 
     */
    public onEvent(event: Events.Event): Observable<any> {
        return new Observable<Events.Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}