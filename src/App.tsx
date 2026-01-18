import { useState } from "react";
import "./App.css";

const ANSWERS = ["Iya", "Coba Lagi", "Mungkin Saja", "Tidak", "YNTKTS"];

const AUDIO_FILES: Record<string, string> = {
	Iya: "/audio/iya.mp3",
	"Coba Lagi": "/audio/coba-lagi.mp3",
	"Mungkin Saja": "/audio/mungkin-saja.mp3",
	Tidak: "/audio/tidak.mp3",
	YNTKTS: "/audio/yntkts.mp3",
};

function App() {
	const [answer, setAnswer] = useState<string | null>(null);
	const [isShaking, setIsShaking] = useState(false);

	const playSound = (answer: string) => {
		const audio = new Audio(AUDIO_FILES[answer]);
		audio.play();
	};

	const handleClick = () => {
		setIsShaking(true);
		setAnswer(null);

		setTimeout(() => {
			const randomIndex = Math.floor(Math.random() * ANSWERS.length);
			const newAnswer = ANSWERS[randomIndex];
			setAnswer(newAnswer);
			playSound(newAnswer);
			setIsShaking(false);
		}, 500);
	};

	return (
		<div className="container">
			<h1>Puja Kerang Ajaib</h1>
			<p className="subtitle">
				Click the Magic Conch to receive your answer
			</p>

			<div className="conch-wrapper" onClick={handleClick}>
				<img
					src="images/magic-conch.png"
					alt="Magic Conch"
					className={`conch ${isShaking ? "shake" : ""}`}
				/>
			</div>

			<div className="answer-box">
				{answer && <p className="answer">{answer}</p>}
			</div>
		</div>
	);
}

export default App;
