import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function ProfileOption() {
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();

  async function handleDeletOng(e) {
    try {
      await api.delete('profile', {
        headers: {
          Authorization: ongId,
        }
      });
      localStorage.clear();
      history.push('/');
    } catch(err) {
      alert('Erro ao cancelar conta!')
    }
  }
  return (
    <div className="profileOption-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Esperamos que muito heróis estajam ajudando!</h1>
          <p>Opções disponíveis no momento</p>
          <button className="button" onClick={() => handleDeletOng()}>Cancelar Conta</button>
          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para home
          </Link>
        </section>
      </div>
    </div>
  )
}