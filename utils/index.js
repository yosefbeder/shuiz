export const turnToAnswer = ({ type, ...props }) => {
	switch (type) {
		case 'true-false':
			return { answer: undefined, correctAnswer: props.answer };
		case 'multiple-choice':
			return props.options.map(option => ({ ...option, selected: false }));
		case 'fill-in-the-blanks':
			return props.blanks.map(blank => ({
				position: blank.position,
				correctAnswers: blank.answers,
				answer: '',
			}));
	}
};
