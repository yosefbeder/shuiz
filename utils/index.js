const getTitleWithBlanks = ({ title, blanks }) =>
	title
		.split(' ')
		.map((word, index) => {
			let blankIndex = blanks.findIndex(({ position }) => position === index);

			return blankIndex !== -1 ? `____(${blankIndex + 1})____ ${word}` : word;
		})
		.join(' ');

export const turnToAnswer = (
	{ id, type, title, hint, description, tags, ...props },
	index,
) => {
	switch (type) {
		case 'true-false':
			return {
				number: index + 1,
				id,
				type,
				title,
				hint,
				description,
				tags,
				answer: undefined,
				correctAnswer: props.answer,
			};
		case 'multiple-choice':
			return {
				number: index + 1,
				id,
				type,
				title,
				hint,
				description,
				tags,
				fields: props.options.map(option => ({ ...option, selected: false })),
			};
		case 'fill-in-the-blanks':
			return {
				number: index + 1,
				id,
				type,
				title: getTitleWithBlanks({ title, blanks: props.blanks }),
				hint,
				description,
				tags,
				fields: props.blanks.map(blank => ({
					position: blank.position,
					correctAnswers: blank.answers,
					answer: '',
				})),
			};
	}
};
