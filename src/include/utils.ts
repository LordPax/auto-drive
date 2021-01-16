import { Match, Back, MapContent, Point, Line, Vector, ModelContent } from './type'
import { Car } from '../car/car'
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

export const emptyModel:ModelContent[] = [{
    weight:[],
    bias:[]
}]

export const distance = (ptsA:Point, ptsB:Point):number => {
    const vec:Point = {x:ptsA.x - ptsB.x, y:ptsA.y - ptsB.y}
    const dist:number = Math.sqrt(vec.x * vec.x + vec.y * vec.y)
    
    return dist
}

export const intersec = (line:Line, line2:Line):{t:number, u:number} => {
    const vecD:Vector = {x:line.toX - line.x, y:line.toY - line.y}
    const vecE:Vector = {x:line2.toX - line2.x, y:line2.toY - line2.y}

    const denom:number = vecD.x * vecE.y - vecD.y * vecE.x

    const t:number = -(line.x * vecE.y - line2.x * vecE.y - vecE.x * line.y + vecE.x * line2.y) / denom
    const u:number = -(-vecD.x * line.y + vecD.x * line2.y + vecD.y * line.x - vecD.y * line2.x) / denom

    return {t, u}
}

export const getCollide = (line:Line, line2:Line):boolean => {
    const {t, u} = intersec(line, line2)
    return t >= 0 && t <= 1 && u >= 0 && u <= 1
}

export const sensorCollidePoint = (line:Line, line2:Line):Point => {
    const {t, u} = intersec(line, line2)

    const cond:boolean = t >= 0 && t <= 1 && u >= 0 && u <= 1
    const vecD:Vector = {x:line.toX - line.x, y:line.toY - line.y}

    const interX:number = line.x + t * vecD.x
    const interY:number = line.y + t * vecD.y

    return cond ? {x:interX, y:interY} : null
}

export const compareCar = (a:Car, b:Car):number => {
    const rA:number = a.getModel().getBrain().getReward()
    const rB:number = b.getModel().getBrain().getReward()

    return rB - rA
}

export const compareSensore = (a:Point, b:Point, coord:Point):number => {
    const distA:number = distance(a, coord);
    const distB:number = distance(b, coord);
    
    return distA - distB
}