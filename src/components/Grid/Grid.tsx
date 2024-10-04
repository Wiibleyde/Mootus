import { maxAttempts } from 'src/config';
import GridRow from 'src/components/Grid/GridRow.tsx';
import { generateArray } from 'src/helpers/genericHelper.ts';
import { useAtomValue } from 'jotai';
import { atomAttempts, atomResults, atomWord } from 'src/atom/global';

const Grid: React.FC = () => {
	const word = useAtomValue(atomWord);
	const attempts = useAtomValue(atomAttempts);
	const results = useAtomValue(atomResults);

	return (
		<div className="flex justify-center items-center flex-col">
			{
				generateArray(maxAttempts).map((value) => (
					<GridRow
						key={value}
						length={word.length}
						letters={value in attempts ? attempts[value] : ''}
						result={value in results ? results[value] : ''}
					/>
				))
			}
		</div>
	);
};

export default Grid;