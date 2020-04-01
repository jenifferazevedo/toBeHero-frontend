const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const ong_id = req.headers.authorization;
    const incidents = await connection('incidents').where('ong_id', ong_id).select('*');

    return res.json(incidents);
  },

  async delete(req, res) {
    const ong_id = req.headers.authorization;
    const ong = await connection('ongs').where('id', ong_id).delete();

    return res.json('Apagado');
  }
}