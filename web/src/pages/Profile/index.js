import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import swal from 'sweetalert';
import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';

function ActiveUser() {

    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLogintude] = useState('');
    const [github_username, setGitHubUserName] = useState('');
    const [techs, setTechs] = useState('');

    //o parametro array no final indica que vai executar apenas uma vez
    useEffect(() => {

        async function loadUser() {
            const userId = localStorage.getItem('userId');
            const response = await api.get(`getById/${userId}`);

            const { user } = response.data;            
            
            setUserId(user._id);
            setName(user.name);
            setEmail(user.email);
                        
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLatitude(latitude);
                    setLogintude(longitude);
                },
                (err) => {
                    console.log(err);
                },
                {
                    timeout: 30000,
                }
            );
        }

        loadUser();

    }, []);

    async function handleAddDev(e) {
        e.preventDefault();

        const tokenAuth = localStorage.getItem('tokenAuth');

        const data = {
            name,
            github_username,            
            techs,            
            latitude,
            longitude,
            userId
        };

        const response = await api.post('/devs', data, {
            headers: {
                Authorization: `Bearer ${tokenAuth}`
            }
        });

        if (response.data !== "") {

            swal({
                title: `Perfil atualizado com sucesso`,
                text: "Obrigado por atualizar seu cadastro!",
                icon: "success",
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

                <form onSubmit={handleAddDev}>
                    <input
                        placeholder="Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="GitHub UserName"
                        value={github_username}
                        onChange={e => setGitHubUserName(e.target.value)}
                    />
                    <input name="techs" id="techs" required placeholder="Informe as techs separado por vírgula"
                        value={techs}
                        onChange={e => setTechs(e.target.value)}
                    />
                    <input type="number" name="latitude" id="latitude" required
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)}
                    />
                    <input type="number" name="longitude" id="longitude" required
                        value={longitude}
                        onChange={e => setLogintude(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default ActiveUser;