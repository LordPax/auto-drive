import { Match, Back, MapContent } from './type'
import { ipcRenderer } from 'electron'

export const superfor = (compt:number, f:(i:number, r:any) => any, acc:number = 0, r:any = null):any => {
    const re:any = acc < compt ? f(acc, r) : r
    return acc < compt ? superfor(compt, f, acc + 1, re) : re
}

export const randInt = (min:number, max:number):number => 
    Math.floor(Math.random() * (max - min + 1) + min)

export const rand = (neg:boolean = false):number => {
    const mul:number = neg ? -1 : 1
    return roundNumber(Math.random(), 2) * mul
}

export const rand2 = ():number => 
    randInt(0, 1) === 0 ? rand() : rand(true)

export const match = (test:any, acc:any = null):Match => ({
    case: (val:any, act:Back):any => match(test, val === test ? act() : acc),
    if: (cond:boolean, act:Back):any => match(test, cond ? act() : acc),
    plage: (val1:any, val2:any, act:Back):any => match(test, (test >= val1 && test <= val2) ? act() : acc),
    default: (act:Back):any => acc === null ? act() : acc
})

export const roundNumber = (num:number, dec:number):number => 
    Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec)

export const emptyMap:MapContent = {
    spawn:{x:0, y:0},
    wall:[],
    gate:[],
    text:[]
}

export const prompt = (label:string):Promise<string> => new Promise((resolve, reject) => {
    ipcRenderer.send('prompt', label)
})