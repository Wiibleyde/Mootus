
interface Props {
	keyElement: string;
	handleKeyPress: (keyElement: string) => void
}

const KeyboardKey: React.FC<Props> = ({ keyElement, handleKeyPress }) => (
	<button
		key={keyElement}
		type="button"
		className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center m-1 hover:bg-gray-300 transition-colors duration-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
		onClick={() => handleKeyPress(keyElement)}
	>
		{keyElement}
	</button>
);

export default KeyboardKey;