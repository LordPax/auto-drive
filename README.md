# Auto drive
## Description
Petit projet qui implemente [billy's brain](https://github.com/LordPax/neural-network)

## Installation
```bash
git clone https://github.com/LordPax/auto-drive.git && cd auto-drive
npm install
npm run build
```

## Usage
1. modifier le fichier dotenv nommée .env (si besion)
2. créer une map (pas obligatoir car map déjà créé)
```bash
npm run start:editor
```
3. entrainer un modele (pas obligatoir car modele déjà entrainé)
```bash
npm run start:train
```
4. visualiser le modele en action
```bash
npm run start:show
```

## Aide éditeur de map
```
Help mode :
 - esc : mode null
 - a : mode insertion de mure
 - z : mode modifie le spawn
 - e : mode insertion de gate
 - r : mode insertion de text (soon)
 - s : save la map
 - h : affiche help
```

## Construction fichier .env
```
MAP=chemin de la map à charger en cas d'entrainement, d'édition et de visualisation
MODELSAVE=chemin du modele à sauver en cas d'entrainement et à charger en cas de visualisation
MODELCHARGE=chemin du modele à charger seulement en cas d'entrainement (peut rester vide)
NBSIM=nombre de génération à entrainer
NBCAR=nombre de viéhicules l'ors d'une simulation
```
### exemple
```
MAP=save/map/map_S1.json
MODELSAVE=save/model/model_S1_100gen.json
MODELCHARGE=
NBSIM=500
NBCAR=100
```