import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Button, Spin } from 'antd';
import QuizCategories from '../components/QuizCategories';
import QuizQuestion from '../components/QuizQuestion';
import QuizResult from '../components/QuizResult';
import NicknameForm from '../components/NicknameForm';
import quizStore from '../stores/quizStore';
import Title from 'antd/es/skeleton/Title';

interface QuizAppProps {
  store: quizStore;
}

const QuizApp: React.FC<QuizAppProps> = ({ store }) => {
  const [started, setStarted] = useState(false)

  const handleStartQuiz = () => {
    setStarted(true)
    store.fetchQuestions();
    store.resetQuiz();
  };

  return (
    <div>
      {started ? (
        <>
          <h2>Welcome, {store.nickname}! </h2>
          {store.totalQuestions > 0 && store.currentQuestionIndex < store.totalQuestions ? (
            <QuizQuestion setStarted={setStarted} store={store} />
          ) : <div style={{display: 'flex', justifyContent: 'center'}}> <Spin size="large" /> </div>}
        </>
      ) : (
        <>
          <NicknameForm store={store} />
          <QuizCategories store={store} />
          { store.sortedScoreboard.length ? <QuizResult store={store} /> : null }
          <Button type="default" disabled={!store.nickname || !store.currentCategory} onClick={handleStartQuiz}>
            Start Quiz
          </Button>
        </>
      )}
    </div>
  );
};

export default observer(QuizApp);