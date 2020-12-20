export type Back = () => any

export interface Match {
    case:(val:any, act:Back) => any
    if:(cond:boolean, act:Back) => any
    plage:(val1:any, val2:any, act:Back) => any
    default:(act:Back) => any
}

export interface View {
    draw():void
}

export interface Line {
    x:number
    y:number
    toX:number
    toY:number
}

export type Wall = Line
export type Sensor = Line
export type Gate = Line

export interface Point {
    x:number
    y:number
}

export type Vector = Point

export interface MapText {
    x:number
    y:number
    txt:string
}

export interface MapContent {
    spawn:Point
    wall:Wall[]
    gate:Gate[]
    text:MapText[]
}

export interface ModelContent {
    weight:number[][][]
    bias:number[][][]
}