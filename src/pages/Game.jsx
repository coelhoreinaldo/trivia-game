import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import './Game.css';
import { getAssertions, incrementScore } from '../redux/actions/action';
import calculateScore from '../utils/calculateScore';

const RANDOM_SORT = 0.5;
// const TOKEN_EXPIRED = 3;

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
    const { history } = this.props;

    const question = questions[currentQuestionIndex];

    if (question) {
      this.setState({
        allAnswers: [
          ...question.incorrect_answers,
          question.correct_answer,
        ].sort(() => Math.random() - RANDOM_SORT),
      });
    } else {
      history.push('/');
    }
    // Pra mim esse seria o certo, mas o cypress reprova????
    // this.setState({
    //   allAnswers: [
    //     ...question.incorrect_answers,
    //     question.correct_answer,
    //   ].sort(() => Math.random() - RANDOM_SORT),
    // });
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

    // const token = localStorage.getItem('token');
    // const response = await fetch(
    //   `https://opentdb.com/api.php?amount=5&token=${token}`,
    // );
    // const data = await response.json();

    // if (data.response_code === TOKEN_EXPIRED) {
    //   localStorage.removeItem('token');
    //   history.push('/');
    // } else {
    //   this.setState(({ questions: data.results }), () => this.randomAnswers());
    // }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `https://opentdb.com/api.php?amount=5&token=${token}`,
      );
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

  getAnswerClassName = (answer, correctAnswer) => {
    const { selectedAnswer, timer } = this.state;

    if (selectedAnswer || timer === 0) {
      return answer === correctAnswer ? 'green' : 'red';
    }
    return '';
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

  render() {
    const { questions,
      allAnswers,
      timer, currentQuestionIndex, selectedAnswer } = this.state;

    const showNextButton = selectedAnswer !== null || timer === 0;

    if (questions.length === 0) {
      return <p>Carregando...</p>;
    }

    const answerClassName = (answer) => this
      .getAnswerClassName(answer, questions[currentQuestionIndex].correct_answer);

    return (
      <div className="container">
        <Header />
        <section className="game-question">
          <div
            data-testid="question-category"
            className="question-category"
          >
            {
              questions[currentQuestionIndex].category
            }

          </div>
          <div data-testid="question-text">
            {
              questions[currentQuestionIndex].question
            }

          </div>
          {allAnswers.map((answer, index) => (
            <div key={ index } data-testid="answer-options">
              <button
                className={ answerClassName(answer) }
                onClick={ () => this.handleAnswerClick(answer) }
                disabled={ timer === 0 || selectedAnswer }
                data-testid={
                  answer === questions[currentQuestionIndex].correct_answer
                    ? 'correct-answer'
                    : `wrong-answer-${index}`
                }
              >
                {answer}
              </button>
            </div>
          ))}
          {showNextButton && (
            <button
              data-testid="btn-next"
              onClick={ this.handleNextClick }
            >
              Next
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
};

export default connect()(Game);
