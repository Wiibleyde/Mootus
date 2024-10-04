import React from "react";
import { GameState } from "src/types";
import { useAtomValue } from "jotai";
import { atomGameState, atomWord } from "src/global";

interface Props {
    handleReset: () => void;
}

const EndScreen: React.FC<Props> = ({ handleReset }) => {
    const word = useAtomValue(atomWord);
    const gameState = useAtomValue(atomGameState);

    switch (gameState) {
        case GameState.Win:
            return (
                <div className="text-center">
					<h2 className="text-2xl font-bold text-green-600">Gagné !</h2>
                    <p className="text-lg dark:text-white">Le mot était : {word}</p>
                    <RestartButton handleReset={handleReset} />
				</div>
            )
        case GameState.Lose:
            return (
                <div className="text-center">
					<h2 className="text-2xl font-bold text-red-600">Perdu !</h2>
                    <p className="text-lg dark:text-white">Le mot était : {word}</p>
					<RestartButton handleReset={handleReset} />
				</div>
            )
        default:
            return null;
    }
};

interface RestartButtonProps {
    handleReset: () => void;
}

const RestartButton: React.FC<RestartButtonProps> = ({ handleReset }) => <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleReset}>Recommencer</button>;

export default EndScreen;