const { extensaoControleDB } = require("../database");

module.exports = {
  async read(IDEstadoAnaliseREIDI, next) {
    try {
      const results = await extensaoControleDB("TBEstadoAnaliseREIDI")
      .where({IDEstadoAnaliseREIDI})
      .first();

      return results;
    } catch (error) {next(error)}
  },
};
