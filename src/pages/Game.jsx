import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import './Game.css';

const RANDOM_SORT = 0.5;
const TOKEN_EXPIRED = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      currentQuestion: 0,
      selectedAnswer: null,
      timer: 30,
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

  handleTimer = () => {
    const ONE_SECOND_INTERVAL = 1000;

    this.timeout = setTimeout(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND_INTERVAL);
  };

  // Busca as perguntas da API
  fetchQuestions = async () => {
    const { history } = this.props;

    const token = localStorage.getItem('token');
    const response = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token}`,
    );
    const data = await response.json();

    // Verifica se o token é inválido e redireciona para a tela de login se for
    if (data.response_code === TOKEN_EXPIRED) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      // Caso contrário, atualiza o state com as perguntas recebidas
      this.setState({ questions: data.results });
    }
  };

  // Atualiza o state 'selectedAnswer' com a resposta clicada.
  handleAnswerClick = (answer) => {
    this.setState({ selectedAnswer: answer });
  };

  // Retorna a classe CSS para uma opção de resposta com base na selecionada.
  getAnswerClassName = (answer, correctAnswer) => {
    const { selectedAnswer } = this.state;

    if (!selectedAnswer) {
      return '';
    }
    return answer === correctAnswer ? 'green' : 'red';
  };

  render() {
    const { questions, currentQuestion, timer } = this.state;

    // Mensagem de carregamento enquanto as perguntas não são carregadas
    if (questions.length === 0) {
      return <p>Carregando...</p>;
    }

    // Obtém a pergunta atual e as respostas (em ordem aleatória)
    const question = questions[currentQuestion];
    const allAnswers = [
      ...question.incorrect_answers,
      question.correct_answer,
    ].sort(() => Math.random() - RANDOM_SORT);

    //
    const answerClassName = (answer) => this
      .getAnswerClassName(answer, question.correct_answer);

    return (
      <div>
        <Header />
        <section>
          {/* Exibe a categoria da pergunta */}
          <div data-testid="question-category">{question.category}</div>
          {/* Exibe a pergunta */}
          <div data-testid="question-text">{question.question}</div>
          {/* Mapeia e exibe as alternativas */}
          {allAnswers.map((answer, index) => (
            <div key={ index } data-testid="answer-options">
              <button
              className={ answerClassName(answer) }
              onClick={ () => this.handleAnswerClick(answer) }
                disabled={ timer === 0 }
                data-testid={
                  answer === question.correct_answer
                    ? 'correct-answer'
                    : `wrong-answer-${index}`
                }
              >
                {answer}
              </button>
            </div>
          ))}
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
};

export default connect()(Game);
