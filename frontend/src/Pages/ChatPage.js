import React, { useEffect, useState } from "react";
import axios from "axios";

function ChatPage() {
	const [chats, setChats] = useState([]);
	const fetchChats = () => {
		axios.get("http://localhost:5000/api/chat").then((res) => {
			setChats(res.data);
		});
	};

	useEffect(() => {
		fetchChats();
	}, []);
	return (
		<div>
			{chats.map((chat) => {
				return <div key={chat._id}>{chat.chatName}</div>;
			})}
		</div>
	);
}

export default ChatPage;
