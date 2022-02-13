import React, * as react from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, editExpense, editExpenses, removeExpense } from '../actions';

class ExpensesForm extends react.Component {
  constructor({ expense: { value, description, currency, method, tag } }) {
    super();
    this.state = {
      value,
      description,
      currency,
      method,
      tag,
      qtdExpenses: 0,
      exchange: [],
    };
  }

  componentDidMount() {
    this.getCurrency();
  }

  getCurrency = async () => {
    const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';
    const request = await fetch(ENDPOINT);
    const response = await request.json();
    delete response.USDT;
    const data = Object.keys(response);
    this.setState({
      exchange: [...data] });
  }

handleClick =() => {
  const { value, description, currency, method, tag, qtdExpenses } = this.state;
  const { sendExpense, expenses, btnTittle, editStatus, removeExpenses, idEdit,
    editExpensess } = this.props;
  if (btnTittle === 'Adicionar despesa') {
    this.setState((prev) => ({ value: 0,
      qtdExpenses: prev.qtdExpenses + 1 }));
    sendExpense({ id: qtdExpenses,
      value,
      description,
      currency,
      method,
      tag,
    });
  } else {
    editStatus();
    removeExpenses(expenses[idEdit]);
    editExpensess({
      id: Number(idEdit),
      value,
      description,
      currency,
      method,
      tag,
    }, expenses[idEdit].exchangeRates);

    const target = document.querySelectorAll('.row')[idEdit];
    target.style.backgroundColor = '#e0e0e0';
    target.style.color = 'black';
  }
}

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { btnTittle, currencies, classForm } = this.props;
    return (
      <form className={ classForm } id="form" action="">
        <label htmlFor="value-input">
          Valor da despesa:
          <input
            onChange={ this.handleChange }
            data-testid="value-input"
            type="text"
            value={ value }
            name="value"
            id="value-input"
          />

        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            onChange={ this.handleChange }
            type="text"
            data-testid="description-input"
            name="description"
            value={ description }
            id="description-input"
            cols="30"
            rows="10"
          />

        </label>
        <label htmlFor="currency-input">
          Moedas:
          <select
            value={ currency }
            onChange={ this.handleChange }
            data-testid="currency-input"
            name="currency"
            id="currency-input"
          >
            {currencies.map((curency) => <option key={ curency }>{curency}</option>)}
          </select>

        </label>

        <label htmlFor="method-input">
          Método de pagamento:
          <select
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
            name="method"
            id="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
            name="tag"
            id="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>

        </label>
        <button
          onClick={ this.handleClick }
          type="button"
        >
          {btnTittle}

        </button>
      </form>
    );
  }
}

ExpensesForm.propTypes = {
  sendExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  btnTittle: PropTypes.string.isRequired,
  editStatus: PropTypes.func,
};

ExpensesForm.defaultProps = {
  expense: {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchange: [],
    idEdit: '',
  } };

const mapDispatchToProps = (dispatch) => ({
  sendExpense: (object) => dispatch(addExpense(object)),
  editStatus: () => dispatch(editExpense()),
  removeExpenses: (object) => dispatch(removeExpense(object)),
  editExpensess: (object, exchangeRates) => dispatch(editExpenses(object, exchangeRates)),
});

const mapStateToProps = ({ wallet: { expenses, edit, currencies } }) => ({
  currencies,
  expenses,
  edit,
});
export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
