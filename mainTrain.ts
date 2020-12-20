#!/usr/bin/node

import { Train } from './src/train/train'

const train = new Train(500, 50, 'save/map/map_edit.json', 'save/model/model_test.json')
train.calculate()