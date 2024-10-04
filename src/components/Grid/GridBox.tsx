import { LetterState } from 'src/types';

interface Props {
    letter: string;
    state: string;
}

const getRightColor = (state: string) => {
    switch (state) {
        case LetterState.Good:
            return 'bg-red-600 rounded-md dark:bg-red-500';
        case LetterState.WrongPlace:
            return 'border-4 border-yellow-500 rounded-md dark:border-yellow-400';
        default:
            return '';
    }
};

const GridBox: React.FC<Props> = ({ letter, state }) => (
    <div className="w-12 h-12 bg-gray-300 m-1 rounded-md flex justify-center items-center dark:bg-gray-800">
        <div className={`${getRightColor(state)} w-12 h-12 text-black dark:text-white text-2xl flex justify-center items-center`}>{letter}</div>
    </div>
);

export default GridBox;