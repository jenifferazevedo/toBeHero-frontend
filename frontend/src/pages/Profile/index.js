import React, { useState ,useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiMenu, FiX } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then( response => {
      setIncidents(response.data);
    });
    let show = true;
    const menuIcon = document.querySelector(".menuIcon");
    const menuToggle = document.querySelector(".menuTogle");
    const menuIconClose = document.querySelector(".menuIconClose");
    menuIcon.addEventListener('click', () => {
      document.body.style.overflow = show ? "hidden" : "initial"
      menuToggle.classList.add("on", show)
      menuIcon.style.display = "none"
    })
    menuIconClose.addEventListener('click', () => {
      menuToggle.classList.add('close')
      document.body.style.overflow = "initial"
    })
    menuToggle.addEventListener('animationend', (event) => {
      if(event.animationName === "closed") {
        menuToggle.classList.remove("on", "true", "close")
        menuIcon.style.display = "block"
      }
    })
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });
      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch(err) {
      alert('Erro ao deletar caso, tente novamente.')
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
  <div className="profile-container">
    <header>
      <img className="logoShow" src={logoImg} alt="Be The Hero" />
      <FiMenu className="menuIcon" size={30} color= "#858594" />
      <nav className="menuTogle">
      <FiX className="menuIconClose" size={30} color= "#545454" />
      <img src={logoImg} alt="Be The Hero" />
      <span>Bem vinda, {ongName}</span>
      <div className="menuOptions">
      <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
      <Link className="button" to="/profile/option">Opções da conta</Link>
      <button type="button" onClick={handleLogout}>
        <FiPower size={18} color="#E02041" />
      </button>
      </div>
      </nav>
        
    </header>
    <h1>Casos cadastrados</h1>

    <ul>
      {incidents.map(incident => (
        <li key={incident.id}>
        <strong>CASO:</strong>
          <p>{incident.title}</p>
        <strong>DESCRIÇÃO:</strong>
          <p>{incident.description}</p>
        <strong>VALOR:</strong>
          <p>{Intl.NumberFormat('pt-Br', {style: 'currency', currency:'BRL'}).format(incident.value)}</p>
        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
          <FiTrash2 size={20} color="#a8a8b3" />
        </button>
      </li>
      ))}
    </ul>
  </div>
  )
}