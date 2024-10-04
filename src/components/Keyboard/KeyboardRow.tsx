import KeyboardKey from 'src/components/Keyboard/KeyboardKey.tsx';

interface Props {
	line: string;
	handleKeyPress: (keyElement: string) => void
}

const KeyboardRow: React.FC<Props> = ({ line, handleKeyPress }) => (
	<div className="flex">
		{line.split('').map((value) => (
			<KeyboardKey key={value} keyElement={value} handleKeyPress={handleKeyPress} />
		))}
	</div>
);

export default KeyboardRow;