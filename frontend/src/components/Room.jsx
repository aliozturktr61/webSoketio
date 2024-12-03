import React from "react";

const Room = ({userName,room,setUserName,setRoom,setChatScreen,socket}) => {

    const sendRoom=()=>{
socket.emit("room",room)
setChatScreen(true)
    }
  return (
    <div
      className="/* sayfanın ortasına getirmek için */ 
    flex items-center justify-center h-full"
    >
      <div className="w-1/3 h-[320px] bg-indigo-600 flex flex-col space-y-4 p-3 rounded-lg ">
        <h1 className="font-bold text-2xl text-center my-2 ">Chat Odasına Hoş Geldiniz</h1>
        {/* Kullanıcı Adı */}
        <input value={userName} onChange={e=>setUserName(e.target.value)} className="h-12 rounded-xl p-3 outline-none" type="text" placeholder="Username" />
 {/* Mesaj odası */}
        <input value={room} onChange={e=>setRoom(e.target.value)} className="h-12 rounded-xl p-3 outline-none"  type="text" placeholder="Room" />
{/* Giriş Butonu */}
        <div onClick={sendRoom} className="hover:opacity-70 bg-indigo-900 h-12 pt-2 text-xl text-center rounded-xl text-white cursor-pointer /* harflerin arasını açmak için */ tracking-wider">Chat!!</div>
      </div>
    </div>
  );
};

export default Room;
