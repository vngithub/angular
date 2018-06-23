import {MESSAGE_TYPE} from '../message/MessageTypes';
/**
 * Message holds different kinds of message
 */
export class Message  {
    private id: string;
    private title: string;
    private description: string
    private type: MESSAGE_TYPE;
    /**
     * Sets message property
     * @param id
     * @param type 
     * @param title 
     * @param description 
     */
    constructor(id?: string, type?: MESSAGE_TYPE, title?: string, description?: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.type = type;
    }
    /**
     * Returns id
     * @returns id
     */
    public getId(): string  {
        return this.id;
    }
    /**
     * Sets id
     * @param id
     */
    public setId(id: string)  {
        this.id = id;
    }
    /**
     * Returns type
     * @returns type
     */
    public getType(): MESSAGE_TYPE  {
        return this.type;
    }
    /**
     * Sets type
     * @param type
     */
    public setType(type: MESSAGE_TYPE)  {
        this.type = type;
    }
    /**
     * Returns title
     * @returns title
     */
    public getTitle(): string  {
        return this.title;
    }
    /**
     * Sets title
     * @param title
     */
    public setTitle(title: string)  {
        this.title = title
    }

    /**
     * Returns description
     * @returns description
     */
    public getDescription(): string  {
        return this.description;
    }
    /**
     * Sets description
     * @param description
     */
    public setDescription(description: string)  {
        this.description = description;
    }
}


