
import { Subscription } from "rxjs/Rx";
import { SocketFactory } from "../sockets/SocketFactory";
import  * as Events  from "../sockets/EventsEnum";
import { Message } from "../message/Message";

describe('SocketFactory', () => {
    let factory: SocketFactory = SocketFactory.getInstance();
    let messages: Message[];
    it('Service Factory initialize service', () => {
        factory.initSocket("http://localhost:9876");
        factory.onEvent(Events.Event.CONNECT) .subscribe(() => {
            console.log('connected');
            factory.onMessage().subscribe((message: Message) => {
                messages.push(message);
            });
            let m: Message = new Message();
            m.setTitle("test");
            m.setDescription("This is test");
            factory.send(m);
            console.log(messages);    
        });
        
    });
    it('Service Factory throws error if service not found', () => {
        
    });
})