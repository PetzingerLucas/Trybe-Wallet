import React, * as react from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { addExpense, editExpense, removeExpense } from '../actions';
import ExpensesForm from './ExpensesForm';

class ExpensesTable extends react.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      selectedExpenses: [],

    };
  }

  showCleanBtn = () => {
    const deleteAll = document.querySelectorAll('.delete-all');
    const allCheckbox = document.querySelectorAll('.check');
    const checkboxAll = [...allCheckbox];
    console.log(checkboxAll);
    if (checkboxAll
      .some((checkbox) => checkbox.checked)) {
      deleteAll[0].style.display = 'block';
    } else {
      deleteAll[0].style.display = 'none';
    }
  }

selectExpense = (event, expense, selectedExpenses) => {
  if (event) {
    this.setState((prev) => ({ selectedExpenses: [...prev.selectedExpenses, expense] }));
  } else {
    this
      .setState({ selectedExpenses: [...selectedExpenses
        .filter((exp) => exp.id !== expense.id)] });
  }
}

render() {
  const { expenses = [], removeExpenses, edit, editExpenses } = this.props;
  const { id, selectedExpenses } = this.state;
  return (
    <div style={ { backgroundColor: 'white' } }>
      {' '}
      <table>
        <tbody>
          <tr>
            <th>Valor</th>
            <th>Descrição</th>
            <th>Moeda</th>
            <th>Tag</th>
            <th>Método de pagamento</th>

            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          { expenses
            .map((expense) => (
              <tr className="row" key={ expense.id }>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{expense.description}</td>
                <td>
                  {expense
                    .exchangeRates[`${expense.currency}`].name.split('/')[0] }

                </td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>

                <td>
                  {Number(expense
                    .exchangeRates[`${expense.currency}`].ask).toFixed(2)}

                </td>
                <td>
                  {Number(expense.value * expense
                    .exchangeRates[`${expense.currency}`].ask).toFixed(2) }

                </td>
                <td>Real</td>
                <td>
                  {!edit && (
                    <>
                      <button
                        className="edit-btn"
                        data-testid="edit-btn"
                        type="button"
                        onClick={ () => {
                          const target = document.querySelectorAll('.row')[expense.id];
                          target.style.backgroundColor = '#09ba61';
                          target.style.color = 'white';
                          this.setState({ id: expense.id });
                          editExpenses();
                        } }
                      >
                        <FaEdit />

                      </button>

                      <button
                        className="delete-btn"
                        onClick={ () => {
                          removeExpenses(expense);
                        } }
                        data-testid="delete-btn"
                        type="button"
                      >
                        <FaTrash />

                      </button>

                      <input
                        className="check"
                        style={ { marginLeft: '10px' } }
                        onClick={ ({ target }) => this
                          .selectExpense(target.checked, expense, selectedExpenses) }
                        type="checkbox"
                        onChange={ this.showCleanBtn }
                      />

                    </>
                  )}
                  <button
                    className="delete-all"
                    onChange={ () => console.log('teste') }
                    onClick={ () => {
                      const deleteAll = document.querySelectorAll('.delete-all');
                      deleteAll[0].style.display = 'none';
                      selectedExpenses.forEach((exp) => {
                        removeExpenses(exp);

                        this.selectExpense(false, expense, selectedExpenses);
                      });
                    } }
                    type="button"
                  >
                    Excluir Selecionadas
                  </button>
                </td>

              </tr>))}
        </tbody>
      </table>
      {edit && <ExpensesForm
        classForm="edit-form"
        expense={ expenses[id] }
        idEdit={ id }
        btnTittle="Editar despesa"
      />}

    </div>);
}
}
ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  removeExpenses: PropTypes.func.isRequired,
  editExpenses: PropTypes.func.isRequired,
};
const mapStateToProps = ({ wallet: { expenses, edit } }) => ({
  expenses,
  edit,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpenses: (object) => dispatch(removeExpense(object)),
  sendExpense: (object) => dispatch(addExpense(object)),
  editExpenses: () => dispatch(editExpense()),

});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
