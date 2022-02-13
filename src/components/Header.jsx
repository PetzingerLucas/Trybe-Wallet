import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../assets/images/logo.png';

class Header extends Component {
totalExpenses =() => {
  const { expenses } = this.props;
  const total = expenses.reduce((a, b) => {
    const { exchangeRates } = b;
    const currency = exchangeRates[`${b.currency}`];
    a += Number(b.value * Number(currency.ask));
    return a;
  }, 0);
  return total;
}

render() {
  const { email } = this.props;
  return (
    <header className="header">
      <img src={ logo } alt="logo" />
      <h4 data-testid="email-field">{email !== '' ? email : 'alguem@email.com'}</h4>
      <div style={ { display: 'flex', background: 'transparent' } }>
        <h5
          style={ { marginRight: '10px' } }
          data-testid="total-field"
        >
          {this.totalExpenses().toFixed(2)}

        </h5>
        <h5 data-testid="header-currency-field">BRL</h5>
      </div>

    </header>);
}
}
const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  email,
  expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};
export default connect(mapStateToProps)(Header);
