import { useState, useEffect } from 'react';
import { Checkbox, RadioGroup } from '@yosefbeder/design-system/components';
import { Container, Header } from './shared-components';

const MultipleChoice = ({
	id,
	number,
	title,
	description,
	tags,
	hint,
	answers: correctAnswers,
	options,
}) => {
	const [answers, setAnswers] = useState(
		options.map(option => ({ ...option, selected: false })),
	);

	return (
		<Container>
			<Header
				number={number}
				title={title}
				description={description}
				tags={tags}
				hint={hint}
			/>
			{correctAnswers.length === 1 ? (
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
