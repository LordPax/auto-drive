#!/bin/bash

help="
usage : $0 <option> \n
  --show <gen> <all | worst | best> .......... affiche le comportement d'un réseau de neurone \n
  --editor <file> ............................ editeur de map \n
  --train <nbGen> <nbCar> .................... entraine les réseau de neurone
"

if [ $# -lt 1 ]; then
    echo -e $help
    exit 1
fi

if [ $1 == "--help" ]; then
    echo -e $help
elif [ $1 == "--show" ] && [ $# -eq 3 ]; then
    echo "$2 $3"
elif [ $1 == "--editor" ] && [ $# -eq 2 ]; then
    npx electron build/main.js editor $2
elif [ $1 == "--train" ] && [ $# -eq 3 ]; then
    echo "$2 $3"
else
    echo "option incorrect"
fi