import { action, computed, makeObservable, observable } from 'mobx';

type Quiz = {
  question: string;
  options: string[];
  answer: string;
};

type ScoreboardEntry = {
  nickname: string;
  score: number;
};

class QuizStore {
  categories: string[] = [];
  currentCategory: string = '';
  questions: Quiz[] = [];
  currentQuestionIndex: number = 0;
  selectedOption: string = '';
  currentScore: number = 0;
  nickname: string = '';
  scoreboard: ScoreboardEntry[] = [];

  constructor() {
    makeObservable(this, {
      categories: observable,
      currentCategory: observable,
      questions: observable,
      currentQuestionIndex: observable,
      selectedOption: observable,
      nickname: observable,
      scoreboard: observable,
      currentScore: observable,
      fetchCategories: action,
      fetchQuestions: action,
      setCurrentCategory: action,
      nextQuestion: action,
      selectOption: action,
      updateNickname: action,
      addToScoreboard: action,
      resetQuiz: action,
      totalQuestions: computed,
      currentQuestion: computed,
      isLastQuestion: computed,
      sortedScoreboard: computed,
    });

    this.nextQuestion = this.nextQuestion.bind(this);

  }

  async fetchCategories() {
    try {
      const response = await fetch('https://jservice.io/api/categories?count=20');
      const data = await response.json();
      this.categories = data;
    } catch (error) {
      console.error(error);
    }
  }

  async fetchQuestions() {
    try {
      const response = await fetch(`https://jservice.io/api/category?id=${this.currentCategory}`);
      const data = await response.json();
      this.questions = data.clues;
    } catch (error) {
      console.error(error);
    }
  }

  setCurrentCategory(category: string) {
    this.currentCategory = category;
  }

  nextQuestion() {
    if(this.currentQuestion.answer === this.selectedOption) {
      this.currentScore++
    }
    if (this.currentQuestionIndex < this.totalQuestions - 1) {
      this.currentQuestionIndex++;
    }
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }

  updateNickname(nickname: string) {
    this.nickname = nickname;
  }

  addToScoreboard(score: number) {
    this.scoreboard.push({ nickname: this.nickname, score });
  }

  resetQuiz() {
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.selectedOption = '';
    this.fetchCategories()
  }

  get totalQuestions() {
    return this.questions.length;
  }

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  get isLastQuestion() {
    return this.currentQuestionIndex === this.totalQuestions - 1;
  }

  get sortedScoreboard() {
      return this.scoreboard.slice().sort((a, b) => b.score - a.score);
    }
  }
  
  export default QuizStore;
  