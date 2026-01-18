import { useEffect, useState } from "react";
import "./Claude.css";

interface Message {
	role: "user" | "assistant";
	content: string;
}

interface Conversation {
	title: string;
	date: string;
	assistant: string;
	summary: string;
	messages: Message[];
}

function Claude() {
	const [conversation, setConversation] = useState<Conversation | null>(null);

	useEffect(() => {
		fetch("/conversation.json")
			.then((res) => res.json())
			.then((data) => setConversation(data));
	}, []);

	if (!conversation) {
		return <div className="container claude-page">Loading...</div>;
	}

	return (
		<div className="container claude-page">
			<h1>{conversation.title}</h1>
			<p className="meta">
				{conversation.date} | Powered by {conversation.assistant}
			</p>
			<p className="summary">{conversation.summary}</p>

			<div className="messages">
				{conversation.messages.map((msg, index) => (
					<div key={index} className={`message ${msg.role}`}>
						<span className="role">{msg.role === "user" ? "User" : "Claude"}</span>
						<p>{msg.content}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Claude;
