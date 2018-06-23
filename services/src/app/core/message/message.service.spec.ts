import {Message} from '../message/Message';
import {MESSAGE_TYPE} from '../message/MessageTypes';
import {MessagingCenter} from '../message/MessageCenter';
import { Subscription } from "rxjs/Rx";
describe('MessagesService', () => {
    it('Should test', () => {
        const message: Message = new Message("1", MESSAGE_TYPE.ERROR,"test", "This is test description");
        const message1: Message = new Message("1", MESSAGE_TYPE.ERROR,"test1", "This is test description1");
        const messagingCenter: MessagingCenter = MessagingCenter.getInstance();
        let subscriber1_message_types: Array<string> = [];
        let subscriber2_message_types: Array<string> = [];
        let subscription: Subscription = messagingCenter.getMessages().subscribe((message) => {
            console.log("First Subscriber",message.getTitle());
            subscriber1_message_types.push(message.getTitle());
            expect(message.getId()).toBe("1");
        });
        let subscription1: Subscription = messagingCenter.getMessages().subscribe((message) => {
            console.log("Second Subscriber",message.getTitle());
            subscriber2_message_types.push(message.getTitle());
        });
        messagingCenter.getMessagesOfType(MESSAGE_TYPE.ERROR).subscribe((message) => {
            console.log("Second Subscriber",message.getType());
            expect(message.getType()).toBe(MESSAGE_TYPE.ERROR);
        });
        messagingCenter.addMessage(message);
        expect(subscriber1_message_types.length).toBe(1);
        expect(subscriber2_message_types.length).toBe(1);
        subscription.unsubscribe();
        messagingCenter.addMessage(message1);
        expect(subscriber1_message_types.length).toBe(1);
        expect(subscriber2_message_types.length).toBe(2);
        
    });
})