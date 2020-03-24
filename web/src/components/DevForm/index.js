import React, { useState, useEffect } from 'react';

import './styles.css';

function DevForm(props) {

    const { onSubmit } = props;

    const [latitude, setLatitude] = useState('');
    const [longitude, setLogintude] = useState('');
    const [github_username, setGitHubUserName] = useState('');
    const [techs, setTechs] = useState('');

    //o parametro array no final indica que vai executar apenas uma vez
    useEffect(() => {
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
        )
    }, []);

    async function handleAddDev(e) {
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
        });

        setGitHubUserName('');
        setTechs('');
    }

    return (
        <form onSubmit={handleAddDev}>
            <div className="input-block">
                <label htmlFor="github_username">Usuário do GitHub</label>
                <input name="github_username" id="github_username" required
                    value={github_username}
                    onChange={e => setGitHubUserName(e.target.value)} />
            </div>

            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input name="techs" id="techs" required
                    value={techs}
                    onChange={e => setTechs(e.target.value)} />
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input type="number" name="latitude" id="latitude" required
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)} />
                </div>
                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input type="number" name="longitude" id="longitude" required
                        value={longitude}
                        onChange={e => setLogintude(e.target.value)} />
                </div>
            </div>

            <button type="submit">Salvar</button>
        </form>
    );
}

export default DevForm;