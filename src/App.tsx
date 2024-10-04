import Grid from 'src/components/Grid/Grid';
import Keyboard from 'src/components/Keyboard/Keyboard';
import EndScreen from './components/EndScreen';
import { GameState } from "./types";
import useGame from "./hooks/useGame";

const App = () => {
	const { gameState, isLoading, handleKeyPress, resetGame } = useGame();

	return (
		<div className="bg-gray-100 dark:bg-black h-screen flex flex-col justify-center items-center">
			<h1 className="text-center text-5xl mt-12 mb-8 font-bold dark:text-white">Mootus</h1>
			{gameState === GameState.Playing && (
				<div>
					{!isLoading && (
						<div>
							<Grid />
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
			<EndScreen handleReset={resetGame} />
		</div>
	);
};

export default App;