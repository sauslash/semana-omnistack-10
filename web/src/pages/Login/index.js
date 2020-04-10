import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import swal from 'sweetalert';
import axios from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesimg from '../../assets/heroes.png';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();    

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const data = {
                email,
                password
            }
            const response = await axios.post('authenticate', data);
            const { id, name } = response.data.user;

            localStorage.setItem('tokenAuth', response.data.token);
            localStorage.setItem('userId', id);
            localStorage.setItem('name', name);

            history.push('/profile');
        }
        catch (err) {
            swal({
                title: "Falha ao fazer o login!",
                text: "Tente novamente.",
                icon: "error",
                button: true,
                dangerMode: true,
            });
        }

    }

    return (
        
        <div className="logo-container">
            <section className="form">
                <img className="logo" src={logoImg} alt="Dev Radar" />

                <form noValidate autoComplete="off" onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
                    <button className="button" type="submit" disabled={!email}>Entrar</button>

                    <Link className="back-link" to="/register"><FiLogIn size={26} color="#e02041" /> Não tenho cadastro</Link>
                </form>
            </section>

            <img className="heroes" src={heroesimg} alt="Heroes" />
        </div>
    );
}

export default Login;