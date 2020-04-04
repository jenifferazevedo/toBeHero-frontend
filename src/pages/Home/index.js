import React, { useState ,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiPlusCircle, FiMessageCircle, FiMail } from 'react-icons/fi';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function Home() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadIncidents() {
    if(loading){
      return;
    }
    if(total > 0 && incidents.length === total) {
      return;
    }
    setLoading(true);
    const response = await api.get('incidents', {
      params: { page }
    });

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents()
  }, [incidents])

  return (
    <section className="background">
      <nav className="nav">
      <img src={logoImg} alt="Be The Hero" />
      <div>
        <Link className="button" to="/register">Cadastrar ONG</Link>
        <Link to="/login"><FiUser size={40} color= "#E02041" /></Link>
      </div>
      </nav>
      <div className="home-container">
      <div className="content">
        <h1>Ajude em um caso e seja um herói! </h1>
      </div>
      <ul>
      {incidents.map(incident => (
        <li key={incident.id}>
          <h3>{incident.name}</h3>
          <br />
          <strong>CASO:</strong>
          <p>{incident.title}</p>
          <strong>DESCRIÇÃO:</strong>
          <p>{incident.description}</p>
          <strong>VALOR:</strong>
          <p>{Intl.NumberFormat('pt-Br', {style: 'currency', currency:'BRL'}).format(incident.value)}</p>
          <div>
          <p><FiMessageCircle size={25} color="#01a71d" /><span>{incident.whatsapp}</span></p>
          <p><FiMail size={25} color="#0026ff" /><span>{incident.email}</span></p>
          </div>
        </li>
      ))}
      </ul>
      <button onClick={() => loadIncidents()}><FiPlusCircle size={30} color= "#E02041" /></button>
      </div>
    </section>
  );
}