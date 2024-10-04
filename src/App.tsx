import Grid from 'src/components/Grid/Grid';
import Keyboard from 'src/components/Keyboard/Keyboard';
import { useState } from 'react';
import EndScreen from './components/EndScreen';

const WORD = 'NATHAN';
export const maxAttempts = 6;

export enum LetterState {
	Good = 'V',
	Wrong = 'X',
	WrongPlace = '_'
}

export enum GameState {
	Win,
	Lose,
	Playing
}

const App = () => {
	const [attempts, setAttempts] = useState([WORD.substring(0, 1)]);
	const [results, setResults] = useState<string[]>([]);
	const [gameState, setGameState] = useState(GameState.Playing);

	const handleKeyPress = (keyElement: string) => {
		const copy = [...attempts];
		switch (keyElement) {
			case '⌫':
				copy[attempts.length - 1] = copy[attempts.length - 1].slice(0, -1);
				break;
			case '⏎': {
				if (copy[attempts.length - 1].length < WORD.length) {
					console.log("Le mot n'est pas assez long");
					return;
				}
				const attemptResult = copy[attempts.length - 1].split('').map((letter, index) => {
					if (letter === WORD[index]) {
						return LetterState.Good;
					}
					if (WORD.includes(letter) && letter !== WORD[index]) {
						return LetterState.WrongPlace;
					}
					return LetterState.Wrong;
				});
				setResults([...results, attemptResult.join('')]);
				if (copy[attempts.length - 1] === WORD) {
					console.log('Win');
					setGameState(GameState.Win);
					return;
				}
				if (attempts.length === maxAttempts) {
					console.log('Lose');
					setGameState(GameState.Lose);
					return;
				}
				setAttempts([...attempts, WORD.substring(0, 1)]);
				setGameState(GameState.Playing);
				return;
			}
			default:
				if (copy[attempts.length - 1].length === WORD.length) {
					return false;
				}
				copy[attempts.length - 1] = `${copy[attempts.length - 1]}${keyElement}`;
				break;
		}
		setAttempts(copy);
	};

	return (
		<div className="bg-gray-100 dark:bg-black h-screen flex flex-col justify-center items-center">
			<h1 className="text-center text-5xl mt-12 mb-8 font-bold dark:text-white">Mootus</h1>
			{gameState === GameState.Playing && (
				<div>
					<Grid length={WORD.length} attempts={attempts} results={results} />
					<Keyboard handleKeyPress={handleKeyPress} />
				</div>
			)}
			<EndScreen gameState={gameState} />
		</div>
	);
};

export default App;