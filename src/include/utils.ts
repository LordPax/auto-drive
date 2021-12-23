import { Match, Back, MapContent, Point, Line, Vector, ModelContent } from './type'
import { Car } from '../car/car'
import { ipcRenderer } from 'electron'

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
