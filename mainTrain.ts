import { Train } from './src/train/train'
require('dotenv').config()

const NBSIM:number = parseInt(process.env.NBSIM)
const NBCAR:number = parseInt(process.env.NBCAR)
const { MAP, MODELSAVE, MODELCHARGE } = process.env

const train = new Train(NBSIM, NBCAR, MAP, MODELSAVE)
train.calculate(MODELCHARGE)