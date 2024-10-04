import Grid from 'src/components/Grid/Grid';
import Keyboard from 'src/components/Keyboard/Keyboard';
import { useState, useEffect } from 'react';
import EndScreen from './components/EndScreen';
import axios from 'axios';


export const maxAttempts = 6;

export enum LetterState {
	Good = 'G',
	Wrong = 'W',
	WrongPlace = 'N'
}

export enum GameState {
	Win,
	Lose,
	Playing
}

const App = () => {
	const [word, setWord] = useState<string>('');
	const [attempts, setAttempts] = useState<Array<string>>([word.substring(0, 1)]);
	const [results, setResults] = useState<string[]>([]);
	const [gameState, setGameState] = useState<GameState>(GameState.Playing);
	const [needRefindWord, setNeedRefindWord] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const resetGame = () => {
		setNeedRefindWord(true);
		setIsLoading(true);
		setResults([]);
		// setBlockFirstLetter(false);
	}

	useEffect(() => {
		if (needRefindWord) {
			axios.get('https://trouve-mot.fr/api/random').then((response) => {
				setWord(response.data[0].name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase());
				setAttempts([response.data[0].name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().substring(0, 1)])
				setNeedRefindWord(false);
				setIsLoading(false)
				setGameState(GameState.Playing);
			});
		}
	}, [needRefindWord]);

	const handleKeyPress = (keyElement: string) => {
		if(attempts[0].length === 1 && keyElement === '⌫') {
			return;
		}
		if (attempts[0].length === 1 && keyElement === attempts[0]) {
			return;
		}
		const copy = [...attempts];
		switch (keyElement) {
			case '⌫':
				copy[attempts.length - 1] = copy[attempts.length - 1].slice(0, -1);
				break;
			case '⏎': {
				if (copy[attempts.length - 1].length < word.length) {
					return;
				}
				const attemptResult = copy[attempts.length - 1].split('').map((letter, index) => {
					if (letter === word[index]) {
						return LetterState.Good;
					}
					if (word.includes(letter) && letter !== word[index]) {
						return LetterState.WrongPlace;
					}
					return LetterState.Wrong;
				});
				setResults([...results, attemptResult.join('')]);
				if (copy[attempts.length - 1] === word) {
					setGameState(GameState.Win);
					return;
				}
				if (attempts.length === maxAttempts) {
					setGameState(GameState.Lose);
					return;
				}
				setAttempts([...attempts, word.substring(0, 1)]);
				setGameState(GameState.Playing);
				return;
			}
			default:
				if (copy[attempts.length - 1].length === word.length) {
					return false;
				}
				copy[attempts.length - 1] = `${copy[attempts.length - 1]}${keyElement}`;
				break;
		}
		setAttempts(copy);
	};

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			const keyElement = event.key.toUpperCase();
			if ((keyElement.match(/[A-Z]/) || keyElement === 'BACKSPACE' || keyElement === 'ENTER') && !(event.ctrlKey || event.altKey || event.metaKey || event.shiftKey || keyElement === 'TAB')) {
				handleKeyPress(keyElement === 'BACKSPACE' ? '⌫' : keyElement === 'ENTER' ? '⏎' : keyElement);
			}
		}
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [attempts, results]);

	return (
		<div className="bg-gray-100 dark:bg-black h-screen flex flex-col justify-center items-center">
			<h1 className="text-center text-5xl mt-12 mb-8 font-bold dark:text-white">Mootus</h1>
			{gameState === GameState.Playing && (
				<div>
					{!isLoading && (
						<div>
							<Grid length={word.length} attempts={attempts} results={results} />
							<Keyboard handleKeyPress={handleKeyPress} />
						</div>
					)}
					{isLoading && (
						<div className="text-center">
							<p className="text-lg dark:text-white">Chargement...</p>
						</div>
					)}
				</div>
			)}
			<EndScreen gameState={gameState} handleReset={resetGame} word={word} />
		</div>
	);
};

export default App;