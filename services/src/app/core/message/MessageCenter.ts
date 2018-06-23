import { Observable, Subject } from "rxjs/Rx";
import {MESSAGE_TYPE} from '../message/MessageTypes';
import {Message} from '../message/Message';
import {Injectable} from '@angular/core';
import {CentralCoreException} from '../exception/CentralCoreException';

/**
 * MessagingCenter is responsible to hold all the messages
 * @example const messagingCenter: MessagingCenter = MessagingCenter.getInstance();
 *   let subscription: Subscription = messagingCenter.getMessages().subscribe((message) => {
 *       console.log("Subscriber",message.getTitle());
 *   });
 * 
 */
@Injectable()
export class MessagingCenter {
    private messages: Subject<Message> = new Subject<Message>();
    private static _instance:MessagingCenter = new MessagingCenter();
    constructor(){
        if(MessagingCenter._instance){
            throw new CentralCoreException("Error: Instantiation failed: Use MessagingCenter.getInstance() instead of new.");
        }
    }

    /**
     * Returns instance of MessagingCenter
     * @returns MessagingCenter
     */
    public static getInstance():MessagingCenter {
        return MessagingCenter._instance;
    }

    /**
     * Adds message to the Subject
     * @param message
     * @returns Observable<Message>
     */
    public addMessage(message: Message): void {
        this.messages.next(message);
    }

    /**
     * Returns messages of certain type
     * @param messageType
     * @returns Observable<Message>
     */
    public getMessagesOfType(messageType: MESSAGE_TYPE): Observable<Message> {
        return this.messages.filter((message: Message)=>{
            return message.getType() === messageType;
        });
    }

    /**
     * Returns all observable messages
     * @param messageId
     * @returns messages
     */
    public getMessagesById(messageId: string): Observable<Message> {
        return this.messages.filter((message: Message)=>{
            return message.getId() === messageId;
        });
    }

    /**
     * Returns all observable messages
     * @returns messages
     */
    public getMessages(): Observable<Message> {
        return this.messages;
    }
}

