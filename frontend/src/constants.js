export const INITIAL_RADAR = { id: "", cendereco: "", limite_vel_kmh: "", latitude: "", longitude: "", qtde_faixas: "", site: null, sentido: null, municipio: null, bairro: null, cameras: [] }
export const INITIAL_CAMERA = { id: "", cameranum: "" }
export const INITIAL_RADAR_CAMERA = { id: "", ativo: "true", faixa: "", radar: INITIAL_RADAR, camera: INITIAL_CAMERA }
export const INITIAL_SITE = { id: "", site: "", data_instalacao: "", data_inicio_operacao: "", data_fim_operacao: null, ativo: "true", empresa: null, contrato: null, radares: [] }