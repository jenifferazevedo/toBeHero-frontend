const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const ongs = await connection('ongs').select('*');
    return res.json({ongs});
  },

  //function de listar ongs
  async list(req, res) {
    const ongs = await connection('ongs').select(['ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
    return res.json({ongs});
  },

  //function de cadastro das ongs
  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;
    const id = generateUniqueId();
    const emailOngs = await connection('ongs').select(['ongs.email']);
    const [ count ] = await connection('ongs').count();
    const nDeOngs = count['count(*)'];

    async function creating() {
      await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
      })
      
      return res.json({ id });
    }
    if(nDeOngs < 6) {
       emailOngs.map(e => e.email === email).includes(true) ? res.status(400).json({ error: `There is already an NGO registered with this email: ${email}.`}) : creating();
    } else {
      return res.status(401).json({ error: `Number of entries exceeded! There are ${nDeOngs} ONGs registered!`});
    }
  }
}