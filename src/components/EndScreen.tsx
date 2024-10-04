import React from "react";
import { GameState } from "src/App";

interface Props {
    gameState: GameState;
}

const EndScreen: React.FC<Props> = ({ gameState }) => {
    switch (gameState) {
        case GameState.Win:
            return (
                <div>
					<h2 className="text-2xl font-bold text-green-600">Gagné !</h2>
                    <RestartButton />
				</div>
            )
        case GameState.Lose:
            return (
                <div>
					<h2 className="text-2xl font-bold text-red-600">Perdu !</h2>
					<RestartButton />
				</div>
            )
        default:
            return null;
    }
};

const RestartButton: React.FC = () => <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.reload()}>Rejouer</button>;

export default EndScreen;