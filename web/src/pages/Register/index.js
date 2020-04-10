import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import swal from 'sweetalert';
import axios from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

function Register() {

    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleRegisterUser(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            password
        }

        try
        {
            await axios.post('register', data);            

            swal({
                title: `Cadastro realizado com sucesso`,
                text: "Verifique seu e-mail para ativa-lo!",
                icon: "success",
                button: true,
                dangerMode: true,
            });

            history.push('/');
        }
        catch(err)
        {            
            swal({
                title: "Erro ao cadastrar!",
                text: "Tente novamente.",
                icon: "error",
                button: true,
                dangerMode: true,
            });
        }
        
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img className="logo" src={logoImg} alt="Dev Radar" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG</p>

                    <Link className="back-link" to="/"><FiArrowLeft size={26} color="#e02041" /> Já tenho cadastro</Link>
                </section>
                
                <form onSubmit={handleRegisterUser}>
                    <input 
                        placeholder="Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input type="password" placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>                
            </div>
        </div>
    );
}

export default Register;