import { Checkbox, RadioGroup } from '@yosefbeder/design-system/components';
import { useState } from 'react';

const SingleAnswer = ({ options, answer }) => {
	const [selectedValue, setSelectedValue] = useState();

	return (
		<RadioGroup
			options={options.map(({ id, value }) => ({
				label: value,
				value: id,
			}))}
			onChange={id => setSelectedValue(id)}
		/>
	);
};

const MultipleAnswers = ({ options, answers }) => (
	<form>
		{options.map(({ id, value }) => (
			<Checkbox key={id} label={value} />
		))}
	</form>
);

const MultipleChoice = ({ options, answers }) => {
	return answers.length === 1 ? (
		<SingleAnswer options={options} answer={answers[0]} />
	) : (
		<MultipleAnswers {...{ options, answers }} />
	);
};

export default MultipleChoice;
