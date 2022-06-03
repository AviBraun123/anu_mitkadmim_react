import "./ChatDialog.css"
import React, { useState, useEffect, useRef }  from 'react';
import Record from "./Record";
import {HubConnectionBuilder} from '@microsoft/signalr'
import * as aj from "./Ajax";
import { hasSelectionSupport, wait } from "@testing-library/user-event/dist/utils";

export default function ChatDialog({master, chosen, listc, flag}) {

    
    // if(flag){
    //   flag = 0;
      
    // }
    var masterMsgArr=[], msgSide;
    
    // for(var i in info[masterIdx].chats) {
    //     if (info[masterIdx].chats[i].user === user) {
    //         masterMsgArr = info[masterIdx].chats[i].msgArr;
    //         break;
    //     }
    // }
    
    const [divList, setList] = useState("");

    for (var u in listc) {
        if (listc[u].contact.id == chosen) {
          var user = listc[u].contact;
        }
    }
    
    const [list, setchat] = useState([]);
    const refList = useRef([]);
    const chatR = React.useRef(list)
    const _setchatim = data => {
      chatR.current = data;
      setchat(list=>(data));
    } 
    
    useEffect(()=>{
      async function get(){
        var data = await aj.getChat(user.id);
        _setchatim(data);
      }
      get();
    },[]);
    useEffect(() => {
      const connection = new HubConnectionBuilder()
          .withUrl('http://localhost:6132/Class')
          .withAutomaticReconnect()
          .build();

      connection.start()
          .then(() => {
                connection.on("recive_message", async function(From, to) {
                  // var newMessage = {id: message.id, content : message.content, created: message.created, sent: message.sent, chat_id: message.chat_id}
                  // const curr = chatR.current;
                  // console.log("111:");
                  // console.log(curr);
                  // curr.push(newMessage);
                  // console.log("222:");
                  // console.log(curr);
                  // //_setchatim(curr);
                  // _setchatim(curr);
                  if(user.id == to) {
                    var data = await aj.getChat(user.id);
                 //   _setchatim(data); 
                    refList.current = data;
                    setchat(list=>(refList));
                    setchat(list=>(data));
                    setchat(list=>(refList.current));
                    msgSort();
                     }
                });
          })
          .catch(e => console.log('Connection failed: ', e));
  }, [list]);

    var userNickname = user.name, userProfPic = "./g.png";

    // for(var j in info) {
    //   if (info[j].username === user) {
    //     userNickname = info[j].nickname;
    //     userProfPic = info[j].profPic;
    //     break;
    //   }
    // }


    
    const msgSort = function(){
        let divArr=[];
        console.log(list);
        for(let msg in list) {
          (list[msg].sent === true) ? msgSide = "left" : msgSide = "right";
            //if(masterMsgArr[msg].type === "text") {
                divArr.push(<div className={msgSide}><div className="actualMsg">{list[msg].content}</div><div className="msgTime">
                {list[msg].created.substring(11,16)}
              </div></div>);
                divArr.push(<br className="break"/>);
            // } else if (masterMsgArr[msg].type === "audio") {
            //   divArr.push(<div className={msgSide}><span className="actualMsg audioMsg">
            //   <audio controls> 
            //     <source src= {masterMsgArr[msg].data} type="audio/mpeg"/>
            //   </audio>
            //   </span><div className="msgTime">
            //   {masterMsgArr[msg].time.hour}
            // </div></div>);
            //   divArr.push(<br className="break"/>);
            // } else if (masterMsgArr[msg].type === "video") {
            //   divArr.push(<div className={msgSide}><span className="actualMsg fileMsg">
            //   <video className="actualImgMsg" controls> <source src={masterMsgArr[msg].data} type="video/mp4"/> </video>
            //   </span><div className="msgTime">
            //   {masterMsgArr[msg].time.hour}
            // </div></div>);
            //   divArr.push(<br className="break"/>);
            // } else if (masterMsgArr[msg].type === "image") {
            //   divArr.push(<div className={msgSide}><span className="actualMsg fileMsg"> <img src={masterMsgArr[msg].data} alt="..." className="actualImgMsg"/>
            //   </span><div className="msgTime">
            //   {masterMsgArr[msg].time.hour}
            // </div></div>);
            //   divArr.push(<br className="break"/>);
            // }
        }
        setList(divArr);
        document.getElementById("msgBox").scrollTop = document.getElementById("msgBox").scrollHeight;
        return(divArr);
    }
    useEffect(() => {msgSort();}, [list]);

    const msgSortInit = function(){
        let divArr=[];
        for(let msg in list) {
          (list[msg].sent === true) ? msgSide = "left" : msgSide = "right";
            // if(masterMsgArr[msg].type === "text") {
              divArr.push(<div className={msgSide}>
                            <div className="actualMsg">
                              {list[msg].content} 
                            </div> 
                            <div className="msgTime">
                              {list[msg].created.substring(11,16)}
                            </div> </div>);
              divArr.push(<br className="break"/>);
            // } else if (masterMsgArr[msg].type === "audio") {
            //     divArr.push(<div className={msgSide}><span className="actualMsg audioMsg">
            //     <audio controls>
            //       <source src= {masterMsgArr[msg].data} type="audio/mpeg"/>
            //     </audio>
            //     </span><div className="msgTime">
            //     {masterMsgArr[msg].time.hour}
            //   </div></div>);
            //     divArr.push(<br className="break"/>);
            // } else if (masterMsgArr[msg].type === "video") {
            //   divArr.push(<div className={msgSide}><span className="actualMsg fileMsg">
            //   <video className="actualImgMsg" controls> <source src={masterMsgArr[msg].data} type="video/mp4"/> </video>
            //   </span><div className="msgTime">
            //   {masterMsgArr[msg].time.hour}
            // </div></div>);
            //   divArr.push(<br className="break"/>);
            // } else if (masterMsgArr[msg].type === "image") {
            //   divArr.push(<div className={msgSide}><span className="actualMsg fileMsg"> <img src={masterMsgArr[msg].data} alt="..." className="actualImgMsg"/>
            //   </span><div className="msgTime">
            //   {masterMsgArr[msg].time.hour}
            // </div></div>);
            //   divArr.push(<br className="break"/>);
            // }
        }
        return(divArr);
    }
    var me;
    const sender = async function(){
      if(document.getElementById("input").value !== "") {
        // var today = new Date();
        // var hour = String(today.getHours()).padStart(2, '0') + ":" + String(today.getMinutes()).padStart(2, '0');
        // info[masterIdx].chats[i].msgArr.push({type:"text", data: document.getElementById("input").value, time:{month: today.getMonth(), day: today.getDate(), hour: hour}, side:0});
        await aj.addMessage(user.id, document.getElementById("input").value);
        await aj.sendMessage(master, user.id, document.getElementById("input").value)
        // masterMsgArr = info[masterIdx].chats[i].msgArr;
        // console.log(info);
        document.getElementById("input").value = "";
        me = await aj.getChat(user.id);
        _setchatim(me);
        return;
      }
    }
    
    // const fileSender = function(fileType){
    //   var today = new Date();
    //   var hour = String(today.getHours()).padStart(2, '0') + ":" + String(today.getMinutes()).padStart(2, '0');
    //   info[masterIdx].chats[i].msgArr.push({type:fileType, data: file, time:{month: today.getMonth(), day: today.getDate(), hour: hour}, side:0});
    //   masterMsgArr = info[masterIdx].chats[i].msgArr;
    //   document.getElementsByClassName("upupup").value = "";
      
    //   return (msgSort());
    // }

    // const fileHandler = (e) => {
    //   e.preventDefault();
    //   setFile(URL.createObjectURL(e.target.files[0]));
    // } 
    // const [file, setFile] = useState(null);  

    // const [uploadError, setUploadError] = useState("");

    // const upload = function(fileType){
    //   setUploadError("please pick a file first");
    //   if(file != null) {
    //     setUploadError("");
    //     fileSender(fileType);
    //   }
    // }
    
    

    return (
      <>
        <div className="dialogScreen">
          <h1> <img className="partnerPic" src={userProfPic} alt=""/> {userNickname} chat</h1>
        </div>

        <div className="msgBox" id="msgBox">
          <br />
          {divList === "" ? msgSortInit() : ""}
          {divList}
        </div>

        <div className="buttomLine">
          &nbsp; &nbsp;
          {/*<span className="btn-group dropup">
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-paperclip"> </i>
            </button>{" "}
            <ul className="dropdown-menu">
              <li key="1">
                <button
                  type="button"
                  className="btn btn-secondary dropdown-item "
                  data-bs-toggle="modal"
                  data-bs-target="#Record"
                >
                  {" "}
                  <span className="item">Record</span>{" "}
                  <i className="bi bi-mic-fill emoji" id="recordButton"></i>{" "}
                </button>
              </li>
              <li key="2">
                <button
                  type="button"
                  className="btn btn-secondary dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#videoUpload"
                >
                  {" "}
                  <span className="item">Video</span>{" "}
                  <i className="bi bi-camera-reels-fill emoji"></i>{" "}
                </button>
              </li>
              <li key="3">
                <button
                  type="button"
                  className="btn btn-secondary dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#imageUpload"
                >
                  {" "}
                  <span className="item">Image</span>{" "}
                  <i className="bi bi-images emoji"></i>{" "}
                </button>
              </li>
            </ul>
          </span>*/}
          &nbsp;
          <input type="text" className="sendbox" id="input" /> &nbsp;
          <button
            type="button"
            onClick={sender}
            id="inputSend"
            className="button"
          >
            {" "}
            <i className="bi bi-send"></i>{" "}
          </button>
        </div>

        {/*<div
          className="modal fade"
          id="Record"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <Record idx={masterIdx} user={i} sender={msgSort} />
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="videoUpload"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  And the Oscar goes to...
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input type="file" accept="video/*" onChange={fileHandler} className="upupup"/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={()=>{upload("video")}} data-bs-dismiss={
                  (uploadError !== "please pick a file first") ? "modal" : ""
                }>
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="imageUpload"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Say Cheese!
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input type="file" accept="image/*" onChange={fileHandler} className="upupup"/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={()=>{upload("image")}} data-bs-dismiss={
                  (uploadError !== "please pick a file first") ? "modal" : ""
                }>
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>*/}
      </>
    );
  }