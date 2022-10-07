// Makes a message class to manipulate the message shown in th gamebox.
export default class Message{
    constructor(){
        this.Message='';
        this.level=document.createElement('div');
    }
    update(){
        this.level.classList.add('level');
        this.level.innerHTML=this.Message;
    }
}