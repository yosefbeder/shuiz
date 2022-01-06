import { useState, useEffect } from 'react';
import { Checkbox, RadioGroup } from '@yosefbeder/design-system/components';
import { Container, Header } from './shared-components';
import { turnToAnswer } from '../../utils';

const MultipleChoice = ({
	id,
	type,
	number,
	title,
	description,
	tags,
	hint,
	options,
	onChange,
}) => {
	const [answers, setAnswers] = useState(turnToAnswer({ type, options }));

	useEffect(() => {
		onChange(answers);
	}, [answers]);

	return (
		<Container>
			<Header
				number={number}
				title={title}
				description={description}
				tags={tags}
				hint={hint}
			/>
			{options.filter(({ correct }) => correct).length === 1 ? (
				<RadioGroup
					options={options}
					onChange={value =>
						setAnswers(prev => {
							let index = prev.findIndex(answer => answer.value === value);
							return [
								...prev
									.slice(0, index)
									.map(answer => ({ ...answer, selected: false })),
								{ ...prev[index], selected: !prev[index].selected },
								...prev
									.slice(index + 1)
									.map(answer => ({ ...answer, selected: false })),
							];
						})
					}
				/>
			) : (
				options.map(option => (
					<Checkbox
						key={option.value}
						checked={option.selected}
						{...option}
						onChange={value => {
							setAnswers(prev => {
								let index = prev.findIndex(
									answer => answer.value === value.target.value,
								);
								return [
									...prev.slice(0, index),
									{ ...prev[index], selected: !prev[index].selected },
									...prev.slice(index + 1),
								];
							});
						}}
					/>
				))
			)}
		</Container>
	);
};

export default MultipleChoice;
