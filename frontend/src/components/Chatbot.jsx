import React, { useState } from "react";
import { Flex, Box, Card } from "@radix-ui/themes";
import axios from "axios";
import { VscCopilot } from "react-icons/vsc";
import { IconContext } from "react-icons";

export const Chatbot = ({ ingredientLines }) => {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([
		{
			role: "system",
			content: `You are a helper for people trying to cook food and following recipes. Here is an array of the ingredients for this meal: ${ingredientLines}`,
		},
	]);
	const [openChatbot, setOpenChatbot] = useState(false);

	const sendFirstMessage = async () => {
		try {
			const response = await axios.post("http://localhost:5001/chat", {
				model: "gpt-3.5-turbo",
				messages: messages,
			});
			const assistantResponse = response.data;
			setMessages((prevMessages) => [...prevMessages, assistantResponse]);
			setOpenChatbot(true);
		} catch (error) {
			console.error("Error sending message:", error);
		}
	};

	const sendMessage = async (messageContent) => {
		const newMessage = { role: "user", content: messageContent };
		const updatedMessages = [...messages, newMessage];
		setMessages(updatedMessages);

		try {
			const response = await axios.post("http://localhost:5001/chat", {
				model: "gpt-3.5-turbo",
				messages: updatedMessages,
			});
			const assistantResponse = response.data;
			setMessages((prevMessages) => [...prevMessages, assistantResponse]);
		} catch (error) {
			console.error("Error sending message:", error);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		sendMessage(message);
		setMessage(""); // Reset the input field
	};

	return (
		<>
			<button onClick={sendFirstMessage}>
				<IconContext.Provider value={{ color: "navy", size: 42 }}>
					<VscCopilot />
				</IconContext.Provider>
			</button>
			<h2>I have read all the ingredients and am here to help!</h2>
			{openChatbot && (
				<Box style={{ margin: "20px", marginLeft: "0px" }} maxWidth="600px">
					<Card>
						<Flex gap="4" align="center">
							<Box>
								<form onSubmit={handleSubmit}>
									<label>Enter message</label>
									<input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
									<button type="submit">Submit</button>
								</form>
								<div>
									{messages.map((msg, index) => (
										<div
											className={`message-container ${
												msg.role === "user" ? "user-message" : "assistant-message"
											}`}
											key={index}>
											{index === 0 || index === 1 ? null : msg.role === "user" ? (
												<p id="my-msg">You: {msg.content}</p>
											) : (
												<p id="asst-msg">Assistant: {msg.content}</p>
											)}
										</div>
									))}
								</div>
							</Box>
						</Flex>
					</Card>
				</Box>
			)}
		</>
	);
};
