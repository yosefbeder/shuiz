import { Checkbox, RadioGroup } from '@yosefbeder/design-system/components';
import { Container, Header } from './shared-components';

const MultipleChoice = ({
	number,
	title,
	description,
	tags,
	hint,
	fields,
	onChange,
}) => {
	return (
		<Container>
			<Header
				number={number}
				title={title}
				description={description}
				tags={tags}
				hint={hint}
			/>
			{fields.filter(({ correct }) => correct).length === 1 ? (
				<RadioGroup
					options={fields.map(({ label, value }) => ({ label, value }))}
					value={fields.find(field => field.selected)?.value}
					onChange={value => onChange(value)}
				/>
			) : (
				fields.map(field => (
					<Checkbox
						key={field.value}
						label={field.label}
						value={field.value}
						checked={field.selected}
						onChange={() => onChange(field.value)}
					/>
				))
			)}
		</Container>
	);
};

export default MultipleChoice;
