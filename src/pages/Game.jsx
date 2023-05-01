/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import './Game.css';
import { getAssertions, incrementScore } from '../redux/actions/action';
import calculateScore from '../utils/calculateScore';

const RANDOM_SORT = 0.5;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      currentQuestionIndex: 0,
      selectedAnswer: null,
      timer: 30,
      allAnswers: [],
    };
  }

  componentDidMount() {
    this.fetchQuestions();
    this.handleTimer();
  }

  componentDidUpdate(_, prevState) {
    const { timer } = this.state;
    if (timer !== prevState.timer && prevState.timer !== 1) {
      this.handleTimer();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  randomAnswers = () => {
    const { currentQuestionIndex, questions } = this.state;

    const question = questions[currentQuestionIndex];

    this.setState({
      allAnswers: [
        ...question.incorrect_answers,
        question.correct_answer,
      ].sort(() => Math.random() - RANDOM_SORT),
    });
  };

  handleTimer = () => {
    const ONE_SECOND_INTERVAL = 1000;

    this.timeout = setTimeout(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND_INTERVAL);
  };

  fetchQuestions = async () => {
    const { history } = this.props;
    const { category, difficulty } = this.props;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&token=${token}`);
      const data = await response.json();
      this.setState(({ questions: data.results }), () => this.randomAnswers());
    } catch (error) {
      localStorage.removeItem('token');
      history.push('/');
    }
  };

  handleAnswerClick = (answer) => {
    const { questions, currentQuestionIndex, timer } = this.state;
    const { dispatch } = this.props;
    this.setState({ selectedAnswer: answer });
    clearTimeout(this.timeout);
    if (questions[currentQuestionIndex].correct_answer === answer) {
      const CURR_SCOR = calculateScore(questions[currentQuestionIndex].difficulty, timer);
      dispatch(incrementScore(CURR_SCOR));
      dispatch(getAssertions(1));
    }
  };

  handleNextClick = () => {
    const { currentQuestionIndex, questions } = this.state;
    const { history } = this.props;
    if (currentQuestionIndex === questions.length - 1) {
      history.push('/feedback');
    }
    this.setState(
      (prevState) => ({
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        selectedAnswer: null,
        timer: 30,
      }),
      () => this.randomAnswers(),
    );
  };

  answerClassName(answer) {
    const { selectedAnswer, questions, currentQuestionIndex, timer } = this.state;

    if (selectedAnswer || timer === 0) {
      return answer === questions[currentQuestionIndex].correct_answer ? 'green' : 'red';
    }

    return '';
  }

  render() {
    const { questions,
      allAnswers,
      timer, currentQuestionIndex, selectedAnswer } = this.state;

    const showNextButton = selectedAnswer !== null || timer === 0;

    if (questions.length === 0) {
      return <p>Carregando...</p>;
    }

    return (
      <div>
        <Header />
        <section>
          <div
            data-testid="question-category"
          >
            {
              questions[currentQuestionIndex].category
            }

          </div>
          <div
            data-testid="question-text"
            dangerouslySetInnerHTML={ {
              __html: questions[currentQuestionIndex].question,
            } }
          />
          {allAnswers.map((answer, index) => (
            <div key={ index } data-testid="answer-options">
              <button
                className={ `${this.answerClassName(answer)} button-64` }
                onClick={ () => this.handleAnswerClick(answer) }
                disabled={ timer === 0 || selectedAnswer }
                dangerouslySetInnerHTML={ {
                  __html: `<span class="my-class">${answer}</span>`,
                } }
                data-testid={
                  answer === questions[currentQuestionIndex].correct_answer
                    ? 'correct-answer'
                    : `wrong-answer-${index}`
                }
                aria-label={ answer }
              />
            </div>
          ))}
          {showNextButton && (
            <button
              data-testid="btn-next"
              onClick={ this.handleNextClick }
              className="button-64"
            >
              <span>Next</span>
            </button>
          )}
        </section>
        <section>
          <h1>{timer !== 0 ? timer : 'O tempo acabou'}</h1>
        </section>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  category: PropTypes.number.isRequired,
  difficulty: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.config.category,
  difficulty: state.config.difficulty,
});

export default connect(mapStateToProps)(Game);
