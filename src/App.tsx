import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import QuizApp from './features/quiz';
import QuizStore from './stores/quizStore';

const App: React.FC = () => {
  const quizStore = new QuizStore();

  useEffect(() => {
    quizStore.fetchCategories();
  }, [quizStore]);

  return (
      <div className="App">
        <h1>Quiz App</h1>
        <QuizApp store={quizStore} />
      </div>
  );
};

export default observer(App);