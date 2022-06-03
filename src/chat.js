import Search from './Search';
import React, { useEffect, useState, useRef } from 'react';
import ChatListResults from './ChatListResults';
import "./chat.css";
import Addcontact from './Addcontact';
import ContactResults from './ContactResults';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ConveCricket from './ConveCricket';
import ChatDialog from './ChatDialog';
import * as aj from './Ajax';
import $ from "jquery";
import { HubConnectionBuilder } from '@microsoft/signalr';

export default function Chat() {
  // async function allContacts(){
  //   return await aj.getContacts();
  // }
    let flag = true;
    let params = new URLSearchParams(document.location.search);
    const myUser = params.get("username");
    var i;
    //var connected = aj.getUser(myUser);
    // var chatim = allContacts();
    // console.log(chatim);
    
    // aj.getContacts();
    var chatim = [];
    const [listOfChats, setSearchQuery] = useState(chatim);
    const [list, setchat] = useState(chatim);
    const chatR = React.useRef(list)
    const _setChatim = data => {
      chatR.current = data;
      setchat(data);
    } 
    useEffect(()=>{
      async function get(){
        var data = await aj.getContacts()
        _setChatim(data);
      }
      get();
    },[]);

    useEffect(() => {
      const connection = new HubConnectionBuilder()
          .withUrl('http://localhost:6132/Class')
          .withAutomaticReconnect()
          .build();
          connection.start()
          .then(result => {
                connection.on("recive_contact: " + myUser, message => {
                  var newMessage = {name: message.contact_id, server: message.server, last: null, lastdate: null, userid: message.userid}
                  const curr = chatR.current;
                  curr.push(newMessage);
                  _setChatim(...curr);
              });
          })

          .catch(e => console.log('Connection failed: ', e));
  }, []);
    var myUserIdx;
    var chats;
    var users=[];
    // for (i in info) {
    //     if (info[i].username === myUser) {
    //         chats = info[i].chats;
    //         myUserIdx = i;
    //     } else {
    //         users.push(info[i].username);
    //     }
    // }
     
    // const remove = function() {
    //     for (i in chats) {
    //         var index = users.indexOf(chats[i].user);
    //         if (index !== -1) {
    //             users.splice(index, 1);
    //         }
    //     }
    // }
    
    // remove();
    
    
    
    const doSearch = function (s) {
        setSearchQuery(list.filter((chat) => {
          return(chat.name.includes(s))}));
        }

    const [contact, setUser] = useState("");
        
    // const [listOfContacts, setContactQuery] = useState([]);

    const [error, setError] = useState("pick contact to add");

    // const contactSearch = function (s) {
    //   setClicked(false);
    //     if (s === "") {
    //         setContactQuery([]);
    //     } else {
    //     setContactQuery(users.filter((user) => user.startsWith(s)));
    //     }
    // }

    // const closeRef = useRef(null);

    const addToChat = async function() {
      await aj.invite(myUser, document.getElementById("usernameAdd").value, document.getElementById("serverAdd").value);
      await aj.addChat(document.getElementById("usernameAdd").value, document.getElementById("nicknameAdd").value, document.getElementById("serverAdd").value);
      //info[myUserIdx].chats.unshift({user: contact, msgArr:[]});
      //chats = info[myUserIdx].chats;
      chatim = await aj.getContacts();
      _setChatim(chatim);
      // console.log(chatim);
      doSearch("");
      setUser("");
      // contactSearch("");
      // remove();
      flag = false;
      document.getElementById("inputForContacts").value = "";
        // chatClicked.current = false;
    }

    // const chatClicked = useRef(false);

    const [chatClicked, setClicked] = useState(false);
    
    const [theChosenOne, setChosenOne] = useState("");

    // useEffect(
    //   () => {
    //     setClicked(true);
        
    //     console.log(theChosenOne);
    //   },
    //   [theChosenOne, chatClicked],
    // );

    //const [divList, setList] = useState("");
    
    return (
      <div className="container">
        <div className="row justify-content-start">
          <div className=" col-4" id="contactbox">
            <div id="search_add">
              <div className=" fs-1 plusoneinner">
                <span className="userPicBase">
                  {" "}
                  <img
                    className="userPic"
                    src="./g.png"
                    alt="..."
                  />{" "}
                </span>
                Hi {myUser} <i className="bi bi-emoji-smile-upside-down"></i>
                <button
                  type="button"
                  className="btn btn-outline-secondary plusone"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i className="bi bi-person-plus-fill"></i>
                  <span className="visually-hidden">Button</span>
                </button>
              </div>
              <Search doSearch={doSearch} />
            </div>

            <div id="chatList">
              <ChatListResults
                chating={list}
                setChosen={setChosenOne}
                setClicked={setClicked}
              />
            </div>

            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Add new contact
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="contact's username (case sensitive)"
                        aria-label="contact's username (case sensitive)"
                        aria-describedby="basic-addon1"
                        id="usernameAdd"
                        required
                      ></input>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="contact's nickname (case sensitive)"
                        aria-label="contact's nickname (case sensitive)"
                        aria-describedby="basic-addon1"
                        id="nicknameAdd"
                        required
                      ></input>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="contact's server (case sensitive)"
                        aria-label="contact's server (case sensitive)"
                        aria-describedby="basic-addon1"
                        id="serverAdd"
                        required
                      ></input>
                    </div>
                    {/*<Addcontact doSearch={contactSearch} />*/}
                    {/*<ContactResults users={listOfContacts} set={setUser} setError={setError}/>*/}
                  </div>
                  <div className="modal-footer">
                    {/*flag === true ? (
                      <span>
                        <h5>{error}</h5>
                      </span>
                    ) : (
                      ""
                    )*/}
                    <button
                      type="button"
                      className="btn btn-success "
                      onClick={addToChat}
                      id="addButton"
                      data-bs-dismiss="modal"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*divList={divList}
            setList={setList}*/}
          <div className="col-8 right-half" id="chatBox">
            {chatClicked ? (
              <ChatDialog
                master={myUser}
                chosen={theChosenOne}
                listc={list}
                flag={1}
              />
            ) : (
              <ConveCricket />
            )}
          </div>
        </div>
        <h5 className="top-right">CriChæt</h5>
        <h5 className="bottom-left">CriChæt</h5>
        <span className="top-left">
          <img src="./cricket.gif" className="top-left" alt="..." />
        </span>
        <span className="bottom-right">
          <img src="./cricket.gif" className="bottom-right" alt="..." />
        </span>
      </div>
    );
}