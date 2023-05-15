import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Input } from 'antd';
import quizStore  from '../stores/quizStore';

interface NicknameFormProps {
  store: quizStore;
}

const NicknameForm: React.FC<NicknameFormProps> = ({store}) => {

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    store.updateNickname(e.target.value);
  };

  return (
    <div>
      <Input
        placeholder="Enter your nickname"
        value={store.nickname}
        onChange={handleNicknameChange}
      />
    </div>
  );
};

export default observer(NicknameForm);