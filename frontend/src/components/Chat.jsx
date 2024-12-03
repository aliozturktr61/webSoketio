import React, { useEffect, useState } from "react";

const Chat = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]); // Boş bir dizi olarak tanımlıyoruz

  /* Soketteki tüm mesajları geri alma */
  useEffect(() => {
    const messageListener = (data) => {
      setMessageList((prev) => [...prev, data]);
    };

    socket.on("messageReturn", messageListener);

    // Cleanup: Component unmount edildiğinde listener'ı kaldır
    return () => {
      socket.off("messageReturn", messageListener);
    };
  }, [socket]);

  /* Mesaj gönderme fonksiyonu */
  const sendMessage = async () => {
    const messageContent = {
      username: username,
      message: message,
      room: room,
      date:
        new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
    };
    await socket.emit("message", messageContent);
    setMessageList((prev) => [...prev, messageContent]);
    setMessage("");
  };

  return (
    <div className="flex items-center justify-center h-full">
      {/* Üst profil alanı başlangıç */}
      <div className="w-1/3 h-[600px] bg-white relative">
        <div className="w-full h-16 bg-gray-700 flex items-center p-3">
          <div className="w-12 h-12 bg-white rounded-full"></div>
        </div>
        {/* Üst profil alanı bitiş */}

        {/* Mesaj görüntüleme alanı başlangıç */}
        <div className="w-full h-[400px] overflow-y-auto">
          {messageList.map((msg, i) => (
            <div
              key={i}
              className={`${
                username === msg.username ? "flex justify-end" : ""
              }`}
            >
              <div
                className={`${
                  username === msg.username ? "bg-green-600" : "bg-blue-600"
                } w-2/3 h-12 p-2 text-white m-2 rounded-xl rounded-br-none`}
              >
                <div>{msg.message}</div>
                <div className="w-full flex justify-end text-xs">
                  {msg.username || "Tanımsız Kullanıcı"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mesaj gönderme alanı */}
        <div className="absolute bottom-0 left-0 w-full">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-3/4 h-12 border p-3 outline-none"
            type="text"
            placeholder="Mesaj Yazınız"
          />
          <button
            onClick={sendMessage}
            className="w-1/4 bg-indigo-600 h-12 text-white cursor-pointer hover:opacity-70"
          >
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;