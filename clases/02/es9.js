const auto1 = {
  marca: 'VW',
  modelo: 2015,
  subMarca: 'Gol',
  km: 1650000,
  owner: {
    nombre: 'Juan Perez'
  }
}

let autoBase = {
  transmision: 'manual',
  combustible: 'gasolina',
  traccion: 'delantera'
}

const { modelo, km, owner: { nombre } } = auto1

const auto = { ...auto1, ...autoBase }

const auto2 = {
  marca: 'tesla',
  modelo: 2023,
  km: 5000,
  subMarca: 'Model 3',
}

const { marca: marcaTesla, ...rest } = auto2