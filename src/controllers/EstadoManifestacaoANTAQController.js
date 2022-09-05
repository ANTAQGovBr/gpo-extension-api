const { extensaoControleDB } = require("../database");

module.exports = {
  async read(IDEstadoManifestacaoANTAQ, next) {
    try {
      const results = await extensaoControleDB("TBEstadoManifestacaoANTAQ")
      .where({IDEstadoManifestacaoANTAQ})
      .first();

      return results;
    } catch (error) {next(error)}
  },
};
