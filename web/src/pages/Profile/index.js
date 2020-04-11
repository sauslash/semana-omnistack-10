import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.png';

function ActiveUser() {

    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLogintude] = useState('');
    const [github_username, setGitHubUserName] = useState('');
    const [techs, setTechs] = useState('');
    const [dev, setDev] = useState('');

    //o parametro array no final indica que vai executar apenas uma vez
    useEffect(() => {

        async function loadUser() {
            const tokenAuth = sessionStorage.getItem('tokenAuth');
            const userId = sessionStorage.getItem('userId');

            const response = await api.get(`getById/${userId}`, {
                headers: {
                    Authorization: `Bearer ${tokenAuth}`
                }
            });

            const { user } = response.data;

            setUserId(user._id);
            setEmail(user.email);
            setGitHubUserName(user.github_username);

            let responseDev;

            try {
                responseDev = await api.get(`getDevByGitHubUserName/${user.github_username}`, {
                    headers: {
                        Authorization: `Bearer ${tokenAuth}`
                    }
                });

                const { dev } = responseDev.data;

                setTechs(dev.techs.join(', '));
                setDev(dev);
                setName(dev.name);
            }
            catch (err) {
                responseDev = null;
                setName(user.name);
            }

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

    }, [github_username]);

    async function handleAddDev(e) {
        e.preventDefault();

        try {
            const tokenAuth = sessionStorage.getItem('tokenAuth');

            const data = {
                name,
                github_username,
                techs,
                latitude,
                longitude,
                userId
            };

            if (!dev) {

                await api.post('/devs', data, {
                    headers: {
                        Authorization: `Bearer ${tokenAuth}`
                    }
                });

            }
            else {
                await api.put(`/devs/${userId}`, data, {
                    headers: {
                        Authorization: `Bearer ${tokenAuth}`
                    }
                });
            }

            swal({
                title: `Perfil atualizado com sucesso`,
                text: "Obrigado por atualizar seu cadastro!",
                icon: "success",
                button: true,
                dangerMode: true,
            });
        }
        catch (err) {
            swal({
                title: "Falha ao atualizar o cadastro!",
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
                    <p>Complete seu cadastro para que possa ser localizado por contratantes.</p>

                </section>

                <form onSubmit={handleAddDev}>
                    <input
                        placeholder="Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input placeholder="E-mail" readOnly
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input readOnly
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