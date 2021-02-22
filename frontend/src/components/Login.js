import React, {useState} from 'react';
import { withRouter, useHistory } from 'react-router-dom';

function Login({onLogin}) {

  const history = useHistory();

  const [data, setData] = useState({
        email: '',
        password: '',
  })
    
  const handleChange = (e) => {
      const {name, value} = e.target;
      setData({
        ...data,
        [name]: value,
      });
    }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
        return;
      }
      onLogin(data)
      .then(() => history.push('/'))
  }
  
    return(
        <form onSubmit={handleSubmit} className="register">
          <h2 className="register__header">Вход</h2>
          <input className="register__input" id="email" placeholder="Email" name="email" type="email" value={data.email} onChange={handleChange} />     
          <input className="register__input" id="password" placeholder="Пароль" name="password" type="password" value={data.password} onChange={handleChange} />
          <button type="submit" onSubmit={handleSubmit} className="register__button">Войти</button>
        </form>
    )
}

export default withRouter(Login);
