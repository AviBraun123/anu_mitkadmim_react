import $ from "jquery";

export var token = "";
export async function getContacts(){
    var d;
    await $.ajax({
        url:"http://localhost:6132/api/contacts",
        type:'GET',
        beforeSend: async function (xhr) {
            await xhr.setRequestHeader('Authorization', 'Bearer '+token)
        },
        data:{},
        success:function(data) {
            d = data;
        }, 
        error: function(){ d = []; },
    });
    return d;
}

export async function loginnn(username, password){
    await $.ajax({
        url:"http://localhost:6132/api/Users?username="+username,
        type:'POST',
        contentType:"application/json",
        //data: JSON.stringify({username: username, password: password}),
        success:function(data) {
            token=data;
        }, 
        error: function(){},
    });
}
export async function gettt(){
    var d;
    await $.ajax({
        url:"http://localhost:6132/api/contacts",
        type:'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+token)
        },
        data:{},
        success:function(data) {
            d = data.json;
        }, 
        error: function(){ d = []; },
    });
    return d;
}
export async function getContact(id){
    var d;
    await $.ajax({
        url:"http://localhost:6132/api/contacts/"+id,
        type:'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+token)
        },
        data:{},
        success:function(data) {
            d = data;
            console.log("the data:" + data);
        }, 
        error: function(){ d = [];  console.log("in ERRORRRRRRRRR");},
    });
    console.log("the d:" + d);
    return d;
}
export async function getChat(id){
    var d;
    await $.ajax({
        url:"http://localhost:6132/api/contacts/"+id+'/messages',
        type:'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+token)
        },
        data:{},
        success:function(data) {
            d = data;
        }, 
        error: function(){ d = []; },
    });
    return d;
}
export async function getMessage(id, id2){
    var d;
    await $.ajax({
        url:"http://localhost:6132/api/contacts/"+id+'/messages'+id2,
        type:'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+token)
        },
        data:{},
        success:function(data) {
            d = data.json;
        }, 
        error: function(){ d = []; },
    });
    return d;
}
export async function getUser(user){
    var d;
    await $.ajax({
        url:"http://localhost:6132/api/Users/"+user,
        type:'GET',
        data:{},
        success:function(data) {
            d = data.json;
        },
        error: function(){ d = []; },
    });
    return d;
}
export async function allUsers(){
    var d;
    await $.ajax({
        url:"http://localhost:6132/api/Users/",
        type:'GET',
        data:{},
        success:function(data) {
            d = data;
        }, 
        error: function(){ d = []; },
    });
    return d;
}
export async function addChat(id, name, server){


    await $.ajax({
        url:"http://localhost:6132/api/contacts",
        type:'POST',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+token)
        },
        contentType:"application/json",
        success:function() {}, 
        error: function(){},
        data: JSON.stringify({id: id, name: name, server: server}),
    });
}
export async function changeContact(id, name, server){
    await $.ajax({
        url:"http://localhost:6132/api/contacts?id="+id+"&name="+name+"&server="+server,
        type:'PUT',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+token)
        },
        contentType:"application/json",
        success:function() {}, 
        error: function(){},
        //data: JSON.stringify({id: id, name: name, server: server}),
    });
}
export async function deleteChat(id){
    await $.ajax({
        url:"http://localhost:6132/api/contacts/"+id,
        type:'DELETE',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+token)
        },
        success:function() {}, 
        error: function(){},
    });
}
export async function addMessage(id, content){
    await $.ajax({
        url:"http://localhost:6132/api/contacts/"+id+"/messages?content="+content,
        type:'POST',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+token)
        },
        contentType:"application/json",
        success:function() {}, 
        error: function(){},
        //data: JSON.stringify({id: id, content: content})
    });
}
export async function changeMessage(id, id2, content){
    await $.ajax({
        url:"http://localhost:6132/api/contacts/"+id+"/messages"+id2+"?content="+content,
        type:'PUT',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+token)
        },
        contentType:"application/json",
        success:function() {}, 
        error: function(){},
        //data: JSON.stringify({content: content}),
    });
}
export async function deleteMessage(id, id2){
    await $.ajax({
        url:"http://localhost:6132/api/contacts/"+id+"/messages"+id2,
        type:'DELETE',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+token)
        },
        success:function() {}, 
        error: function(){},
    });
}
export async function invite(from, to, server){
    await $.ajax({
        url:"http://localhost:6132/api/invitations",
        type:'POST',
        // beforeSend: function (xhr) {
        //     xhr.setRequestHeader('Authorization', 'Bearer '+token)
        // },
        contentType:"application/json",
        success:function() {}, 
        error: function(){},
        data: JSON.stringify({from: from, to: to, server: server})
    });
}
export async function sendMessage(from, to, content){
    await $.ajax({
        url:"http://localhost:6132/api/transfer",
        type:'POST',
        // beforeSend: function (xhr) {
        //     xhr.setRequestHeader('Authorization', 'Bearer '+token)
        // },
        contentType:"application/json",
        success:function() {}, 
        error: function(){},
       data: JSON.stringify({From: from, to: to, content: content})
    });
}
export async function addUser(username, nickname, password){
    await $.ajax({
        url:"http://localhost:6132/api/Users/reg?id="+username+"&nickname="+nickname+"&password="+password+"&profpic=null",
        type:'POST',
        contentType:"application/json",
        //data: JSON.stringify({id: username, nickname: nickname, password: password, profpic :null}),
        success:function(data) {
            token=data;
        }, 
        error: function(){},
    });
}
