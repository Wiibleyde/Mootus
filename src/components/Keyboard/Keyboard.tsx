import KeyboardRow from 'src/components/Keyboard/KeyboardRow.tsx';

interface Props {
    handleKeyPress: (keyElement: string) => void
}

const firstLine = 'AZERTYUIOP';
const secondLine = 'QSDFGHJKLM';
const thirdLine = 'WXCVBN⌫⏎';

const Keyboard: React.FC<Props> = ({ handleKeyPress }) => (
    <div className="flex justify-center items-center flex-col mt-12">
        <KeyboardRow line={firstLine} handleKeyPress={handleKeyPress} />
        <KeyboardRow line={secondLine} handleKeyPress={handleKeyPress} />
        <KeyboardRow line={thirdLine} handleKeyPress={handleKeyPress} />
    </div>
);

export default Keyboard;