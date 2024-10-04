import GridBox from 'src/components/Grid/GridBox.tsx';
import { generateArray } from 'src/helpers/genericHelper.ts';

interface Props {
    length: number;
    letters: string;
    result: string;
}

const GridRow: React.FC<Props> = ({ length, letters, result }) => (
    <div className="flex">
        {
            generateArray(length).map((value) => (
                <GridBox
                    key={value}
                    letter={letters.charAt(value) ? letters[value] : ''}
                    state={result.charAt(value) ? result[value] : ''}
                />
            ))
        }
    </div>
);

export default GridRow;