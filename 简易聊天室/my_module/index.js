 const events = require('events');
 const net = require('net');
 const channel = new events.EventEmitter();
 channel.clients = {};
 channel.subscriptions ={};

 channel.on('join',function(id,client){
     this.clients[id] = client;
     this.subscriptions[id]=(senderId,message)=>{
          if(id != senderId){
              this.clients[id].write(message);
          }
     }
     const welcome = `welcome guestonlin:${this.listeners('broadcast').length}`
    client.write(`${welcome}\n`);
     this.on('broadcast',this.subscriptions[id]);
 });

 channel.on('leave',function(id){
     channel.removeAllListeners(
         'broadcast',this.subscriptions[id]
     )
     channel.emit('broadcast',id,`${id}has left the chatroom`);
 });

 channel.on('shutdown',function(){ 
    channel.emit('broadcast','',`the server has shut down`);
    channel.removeAllListeners('broadcast')
});





 const server = net.createServer(client =>{
     const id= `${client.remoteAddress}：${client.remotePort}`;
     channel.emit('join',id,client);
     client.on('data',data=>{
         data = data.toString();
         if(data == 'shutdown'){
            channel.emit('shutdown');
        } 
         channel.emit("broadcast",id,data);
        
     });

     client.on('close',()=>{
         channel.emit('leave',id);
     }); 
 });

 
 server.listen(8888)