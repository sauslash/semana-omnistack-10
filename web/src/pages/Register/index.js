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
    const [profile, setProfile] = useState('Dev');
    const [github_username, setGitHubUserName] = useState('');
    const [companyName, setCompanyName] = useState('');

    function validate() {   
        if(profile === "Dev")
        {     
            if (name !== "" && email !== "" && password !== "" && github_username !== "")
                return true;
            else
                return false;
        }
        else
        {
            if (name !== "" && email !== "" && password !== "" && companyName !== "")
                return true;
            else
                return false;
        }

    }

    async function handleRegisterUser(e) {
        e.preventDefault();

        if (validate()) {
            const data = {
                name,
                email,
                password,
                profile,
                github_username,
                companyName
            }

            try {
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
            catch (err) {
                swal({
                    title: "Erro ao cadastrar!",
                    text: "Tente novamente.",
                    icon: "error",
                    button: true,
                    dangerMode: true,
                });
            }
        }
        else {
            swal({
                title: "Erro ao cadastrar!",
                text: "Todos os campos são obrigatórios.",
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
                    <select id="profile" name="profile" onChange={e => setProfile(e.target.value)}>                        
                        <option value="Dev">Dev</option>
                        <option value="Recruiter">Recruiter</option>
                    </select>
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
                    {profile === "Dev" ? (
                        <input
                            placeholder="GitHub UserName"
                            value={github_username}
                            onChange={e => setGitHubUserName(e.target.value)}
                        />
                    ) : (
                        <input
                            placeholder="Nome da empresa"
                            value={companyName}
                            onChange={e => setCompanyName(e.target.value)}
                        />
                    )}
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default Register;