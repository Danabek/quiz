import React from 'react';
import { observer } from 'mobx-react';
import QuizStore from '../stores/quizStore';
import { Button } from 'antd';

interface QuizResultProps {
  store: QuizStore;
}

const QuizResult: React.FC<QuizResultProps> = observer(({ store }) => {

  return (
    <div>
      <p>Your score: {store.currentScore}</p>
      <h3>Scoreboard</h3>
      <ul>
        {store.sortedScoreboard.map((entry, index: number) => (
          <li key={index}>
            <span>{entry.nickname}</span> - <span>{entry.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default QuizResult;