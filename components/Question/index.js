import TrueFalse from './TrueFalse';
import MultipleChoice from './MultipleChoice';
import FillInTheBlanks from './FillInTheBlanks';

const Question = ({ type, ...props }) => {
	switch (type) {
		case 'true-false':
			return <TrueFalse {...props} />;
		case 'multiple-choice':
			return <MultipleChoice {...props} />;
		case 'fill-in-the-blanks':
			return <FillInTheBlanks {...props} />;
	}
};

export default Question;
