const express = require("express");
const routes = express.Router();
const PortosController = require("./controllers/PortosController");
const ControleREIDIController = require("./controllers/ControleREIDIController");
const AnaliseREIDIController = require("./controllers/AnaliseREIDIController");
const ControleREIDISemVinculoController = require("./controllers/ControleREIDISemVinculoController");
const EstadoAnaliseREIDIController = require("./controllers/EstadoAnaliseREIDIController");
const ManifestacaoAntaqController = require("./controllers/ManifestacaoANTAQController");
const EstadoManifestacaoAntaqController = require("./controllers/EstadoManifestacaoANTAQController");
const { route } = require("express/lib/application");
const ContratoArrendamentoController = require("./controllers/ContratoArrendamentoController");
const UsuarioController = require("./controllers/UsuarioController");
const ProcessController = require("./controllers/ProcessController");

routes.get("/", (req, res) => {
  try {
    res.json({ message: "Tudo certo!" });
  } catch (error) {
    next(error);
  }
});


// Processo
routes.get("/api/processo/:NRProcessoPrincipal", ProcessController.read)
// Portos
routes.get("/api/portos", PortosController.read);

// Contrato Arrendamento
routes.get(
  "/api/contratoarrendamento/:CDTrigrama",
  ContratoArrendamentoController.listByPorto
);

// Controle REIDI
routes.get("/api/controlereidi", ControleREIDIController.index);
routes.get(
  "/api/controlereidi/:NRProcessoPrincipal",
  ControleREIDIController.read
);
routes.get("/api/match-rows", ControleREIDIController.matchRows);
routes.post("/api/controlereidi", ControleREIDIController.create);
routes.put(
  "/api/controlereidi/:NRProcessoPrincipal",
  ControleREIDIController.update
);
routes.delete(
  "/api/controlereidi/:NRProcessoPrincipal",
  ControleREIDIController.delete
);

// Analise REIDI
routes.get("/api/analisereidi", AnaliseREIDIController.read);
routes.post(
  "/api/analisereidi/:NRProcessoPrincipal",
  AnaliseREIDIController.create
);
routes.put(
  "/api/analisereidi/:NRProcessoPrincipal",
  AnaliseREIDIController.update
);
routes.delete(
  "/api/analisereidi/:NRProcessoPrincipal",
  AnaliseREIDIController.delete
);

routes.get(
  "/api/controlereidisemvinculo",
  ControleREIDISemVinculoController.read
);
routes.get("/api/estadoanalisereidi", EstadoAnaliseREIDIController.read);

//Manifestacao ANTAQ
routes.get("/api/manifestacaoantaq", ManifestacaoAntaqController.read);
routes.post(
  "/api/manifestacaoantaq/:NRProcessoPrincipal",
  ManifestacaoAntaqController.create
);
routes.put(
  "/api/manifestacaoantaq/:NRProcessoPrincipal",
  ManifestacaoAntaqController.update
);
routes.delete(
  "/api/manifestacaoantaq/:NRProcessoPrincipal",
  ManifestacaoAntaqController.delete
);

//Usuario 
routes.get("/api/usuario", UsuarioController.read);

routes.get(
  "/api/estadomanifestacaoantaq",
  EstadoManifestacaoAntaqController.read
);

module.exports = routes;
