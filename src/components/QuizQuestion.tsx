import React from 'react';
import { observer } from 'mobx-react';
import { Button, Input } from 'antd';
import QuizStore from '../stores/quizStore';

interface QuizQuestionProps {
  store: QuizStore;
  setStarted: Function;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({store, setStarted}) => {
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    store.selectOption(e.target.value);
  };

  const handleFinish = () => {
    store.addToScoreboard(store.currentScore);
    setStarted(false)
    store.resetQuiz();
  };
  
  return (
    <div>
      <h3>{store.currentQuestion.question} {store.currentScore}</h3>
      <h6>answear: {store.currentQuestion.answer}</h6>
      <Input
        placeholder="Enter your answear"
        onChange={handleOptionChange}
      />
      <Button style={{marginTop: '15px'}} type="primary" onClick={store.isLastQuestion ? handleFinish : store.nextQuestion} disabled={!store.selectedOption}>
        {store.isLastQuestion ? 'Submit' : 'Next'}
      </Button>
    </div>
  );
};

export default observer(QuizQuestion);