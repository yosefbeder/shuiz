export const turnToAnswer = ({ id, type, ...props }) => {
	switch (type) {
		case 'true-false':
			return {
				id,
				type,
				answer: undefined,
				correctAnswer: props.answer,
			};
		case 'multiple-choice':
			return {
				id,
				type,
				fields: props.options.map(option => ({ ...option, selected: false })),
			};
		case 'fill-in-the-blanks':
			return {
				id,
				type,
				fields: props.blanks.map(blank => ({
					position: blank.position,
					correctAnswers: blank.answers,
					answer: '',
				})),
			};
	}
};
