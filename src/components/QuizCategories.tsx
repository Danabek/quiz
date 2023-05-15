import React from 'react';
import { observer } from 'mobx-react';
import { Select } from 'antd';
import quizStore  from '../stores/quizStore';

const { Option } = Select;

interface QuizCategoriesProps {
  store: quizStore;
}

const QuizCategories: React.FC<QuizCategoriesProps> = ({ store }) => {
  const handleCategoryChange = (category: string) => {
    store.setCurrentCategory(category);
  };

  return (
    <div style={{ margin: '16px 0' }}>
      <label>Select a category: </label>
      <Select defaultValue="" style={{ width: 200 }} onChange={handleCategoryChange}>
        <Option value="">All</Option>
        {store.categories.map((category) => (
          <Option key={category.id} value={category.id}>
            {category.title}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default observer(QuizCategories);