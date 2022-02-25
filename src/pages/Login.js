import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../actions';
import logo from '../assets/images/logo.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disableButton: true,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    const minLength = 6;
    this.setState({
      [name]: value,
    });
  }

 handleClick = (e) => {
   e.preventDefault();
   const { history } = this.props;
   history.push('/carteira');
 }

 render() {
   const { email, password, disableButton } = this.state;
   const { sendEmail } = this.props;
   return (
     <div className="login-page">

       <form>
         <img className="logo" src={ logo } alt="logo" />
         <input
           value={ email }
           onChange={ this.handleChange }
           name="email"
           type="email"
           data-testid="email-input"
           placeholder="email"
         />
         <input
           value={ password }
           onChange={ this.handleChange }
           name="password"
           type="password"
           data-testid="password-input"
           placeholder="senha"
         />
         <button
           className="login-btn"
           onClick={ (e) => {
             this.handleClick(e);
             sendEmail(email);
           } }
           disabled={ disableButton }
           type="submit"
         >
           Entrar

         </button>
       </form>
     </div>);
 }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  sendEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (email) => dispatch(userLogin(email)),
});
export default connect(null, mapDispatchToProps)(Login);
