const ContratoArrendamentoController = require("./ContratoArrendamentoController");
const { extensaoControleDB, arrendamentoV2DB } = require("../database");
const PortosController = require("./PortosController");
const UsuarioController = require("./UsuarioController");

module.exports = {
  async index(req, res, next) {
    try {
      const results = await extensaoControleDB("TBControleREIDI");

      res.json(results);
    } catch (error) {
      next(error);
    }
  },

  async read(NRProcessoPrincipal, next) {
    try {
      const results = await extensaoControleDB("TBControleREIDI")
        .where({
          NRProcessoPrincipal,
        })
        .first();
      return results;
    } catch (error) {next(error)}
  },

  
  async getIDControleREIDI(NRProcessoPrincipal){
    try {
      const result = await extensaoControleDB("TBControleREIDI")
      .select("IDControleREIDI")
      .where( {NRProcessoPrincipal} )
      .first()
      

      return result;
    } catch (error) {
      
    }
  },


  async matchRows(req, res, next) {
    try {
      const results = await extensaoControleDB("TBControleREIDI").select(
        "NRProcessoPrincipal"
      );

      res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const {
        IDContratoArrendamento,
        NRProcessoPrincipal,
        IDProtocoloSEI,
        DTProtocoloPedido,
        VLInvestimentoProposto,
        DSObservacoesSituacao,
        NRProtocoloMINFRA,
        NRCodigoMINFRA,
      } = req.body;

      await extensaoControleDB("TBControleREIDI").insert({
        IDContratoArrendamento,
        NRProcessoPrincipal,
        IDProtocoloSEI,
        DTProtocoloPedido,
        VLInvestimentoProposto,
        DSObservacoesSituacao,
        NRProtocoloMINFRA,
        NRCodigoMINFRA,
      });
      

      res.status(201).json({
        IDContratoArrendamento,
        NRProcessoPrincipal,
        IDProtocoloSEI,
        DTProtocoloPedido,
        VLInvestimentoProposto,
        DSObservacoesSituacao,
        NRProtocoloMINFRA,
        NRCodigoMINFRA,
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { NRProcessoPrincipal } = req.params;

      const response = await extensaoControleDB("TBControleREIDI")
        .where({ NRProcessoPrincipal })
        .del("*");
      
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { NRProcessoPrincipal } = req.params;
      const {
        IDContratoArrendamento,
        DTProtocoloPedido,
        VLInvestimentoProposto,
        DSObservacoesSituacao,
        NRProtocoloMINFRA,
        NRCodigoMINFRA,
      } = req.body;

      await extensaoControleDB("TBControleREIDI")
        .where({ NRProcessoPrincipal })
        .update({
          IDContratoArrendamento,
          DTProtocoloPedido,
          VLInvestimentoProposto,
          DSObservacoesSituacao,
          NRProtocoloMINFRA,
          NRCodigoMINFRA,
        });

      res.status(200).json({
        IDContratoArrendamento,
        DTProtocoloPedido,
        VLInvestimentoProposto,
        DSObservacoesSituacao,
        NRProtocoloMINFRA,
        NRCodigoMINFRA,

      });
    } catch (error) {
      next(error);
    }
  },
};
