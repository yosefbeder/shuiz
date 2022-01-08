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
	const [state, setState] = useState(turnToAnswer({ id, type, options }));

	useEffect(() => {
		onChange(state);
	}, [state]);

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
						setState(prev => {
							let index = prev.fields.findIndex(field => field.value === value);
							return {
								...prev,
								fields: [
									...prev.fields
										.slice(0, index)
										.map(field => ({ ...field, selected: false })),
									{
										...prev.fields[index],
										selected: !prev.fields[index].selected,
									},
									...prev.fields
										.slice(index + 1)
										.map(field => ({ ...field, selected: false })),
								],
							};
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
							setState(prev => {
								let index = prev.fields.findIndex(
									field => field.value === value.target.value,
								);
								return {
									...prev,
									fields: [
										...prev.fields.slice(0, index),
										{
											...prev.fields[index],
											selected: !prev.fields[index].selected,
										},
										...prev.fields.slice(index + 1),
									],
								};
							});
						}}
					/>
				))
			)}
		</Container>
	);
};

export default MultipleChoice;
