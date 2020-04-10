import React, {  useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import api from '../../services/api';

import './styles.css';

function ActiveUser() {

    const history = useHistory();
    const { tokenConfirmRegister } = useParams();

    useEffect(() => {

        async function loadUser() {
            const response = await api.get(`activeUser/${tokenConfirmRegister}`);
            
            if(response.data !== "") {                                                 

                await api.put(`activeUser/${tokenConfirmRegister}`);

                swal({
                    title: `Cadastro ativado com sucesso`,
                    text: "Faça login na próxima tela!",
                    icon: "success",
                    button: true,
                    dangerMode: true,
                });
                    
            }                        
        }

        loadUser();
        history.push('/');

    }, [tokenConfirmRegister,history]);


    return (
        <div className="register-container">
            
        </div>
    );
}

export default ActiveUser;