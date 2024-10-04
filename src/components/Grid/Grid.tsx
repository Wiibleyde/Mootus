import { maxAttempts } from 'src/App';
import GridRow from 'src/components/Grid/GridRow.tsx';
import { generateArray } from 'src/helpers/genericHelper.ts';

interface Props {
	length: number;
	attempts: string[];
	results: string[];
}

const Grid: React.FC<Props> = (props) => {
	const { length, attempts, results } = props;

	return (
		<div className="flex justify-center items-center flex-col">
			{
				generateArray(maxAttempts).map((value) => (
					<GridRow
						key={value}
						length={length}
						letters={value in attempts ? attempts[value] : ''}
						result={value in results ? results[value] : ''}
					/>
				))
			}
		</div>
	);
};

export default Grid;