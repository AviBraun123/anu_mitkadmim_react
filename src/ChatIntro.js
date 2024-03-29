﻿import info from "./Info";
import "./ChatIntro.css";
import * as aj from './Ajax';

function ChatIntro({id, last, lastdate, name, server, userid, setChosen, setClicked} ) {
    // var other;
    // var i;
    //var oneContact = aj.getContact(user);
    // for (i in info) {
    //     if (info[i].username === user) {
    //         other = info[i];
    //         break;
    //     }
    // }


    // var date = new Date();

    const sorter = function(){
        if(last.length < 20) {
            return last;
        } else {
            return (last.substring(0,20) + "...");
        }
    } 

    // const timeSorter = function(){
    //     let dayDiff = date.getDate() - msgArr.at(-1).time.day;
    //     let monDiff = date.getMonth() - msgArr.at(-1).time.month;
    //     if(monDiff > 1) {
    //         if(dayDiff < 0) {
    //             return (msgArr.at(-1).time.hour + " " + (monDiff-1) + " months ago");
    //         } else {
    //             return (msgArr.at(-1).time.hour + " " + monDiff + " months ago");
    //         }
    //     } else if(monDiff == 1) {
    //         if(dayDiff < 0) {
    //             switch(Math.floor((30+dayDiff) / 7)) {
    //                 case 4:
    //                     return (msgArr.at(-1).time.hour + " 4" + " weeks ago");
    //                 case 3:
    //                     return (msgArr.at(-1).time.hour + " 3" + " weeks ago");
    //                 case 2:
    //                     return (msgArr.at(-1).time.hour + " 2" + " weeks ago");
    //                 case 1:
    //                     return (msgArr.at(-1).time.hour + " one week ago");
    //                 default:
    //                     if(30+dayDiff == 1) {
    //                         return (msgArr.at(-1).time.hour + " yesterday");
    //                     } else {
    //                         return (msgArr.at(-1).time.hour + " " + (30+dayDiff) + " days ago");
    //                     }
    //             }
    //         } else {
    //             return (msgArr.at(-1).time.hour + " one month ago");
    //         }
    //     } else {
    //         if(dayDiff == 0) {
    //             return (msgArr.at(-1).time.hour + " today");
    //         }
    //         switch(Math.floor(dayDiff / 7)) {
    //             case 4:
    //                 return (msgArr.at(-1).time.hour + " 4" + " weeks ago");
    //             case 3:
    //                 return (msgArr.at(-1).time.hour + " 3" + " weeks ago");
    //             case 2:
    //                 return (msgArr.at(-1).time.hour + " 2" + " weeks ago");
    //             case 1:
    //                 return (msgArr.at(-1).time.hour + " one week ago");
    //             default:
    //                 if(dayDiff == 1) {
    //                     return (msgArr.at(-1).time.hour + " yesterday");
    //                 } else {
    //                     return (msgArr.at(-1).time.hour + " " + (dayDiff) + " days ago");
    //                 }
    //         }
    //     }
    // } 

    return (
        <button onClick={()=>{setChosen(id); setClicked(true);}} className="col-12">
            <div className="card card-chat mb-1 ">
                <div className="row g-0">
                    <div className="col-4 pic-col">
                        <center>
                            <img src="./g.png" className="img-fluid rounded-start pic-chat" alt="..."></img>
                        </center>
                    </div>
                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            { (last !== null) ? 
                                (<div>
                                    <p className="card-text">{sorter()}</p>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            <span className="fullDate">{lastdate.substring(11,16)}</span>
                                        </small>
                                    </p>
                                </div>)
                            : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        </button>
    );
}

export default ChatIntro;