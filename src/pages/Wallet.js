import React, * as react from 'react';
import { connect } from 'react-redux';
import ExpensesForm from '../components/ExpensesForm';
import Header from '../components/Header';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends react.Component {
  render() {
    const { edit } = this.props;
    return (
      <main className="wallet">
        <Header />
        {!edit && <ExpensesForm
          classForm="add-form"
          btnTittle="Adicionar despesa"
        /> }

        <ExpensesTable />
      </main>);
  }
}

const mapStateToProps = ({ wallet: { edit } }) => ({
  edit,
});

export default connect(mapStateToProps)(Wallet);
