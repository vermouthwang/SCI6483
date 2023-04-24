import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Section
{
    constructor(line)
    {
        this.closed_bool
        this.points = line
        this.segmentation = this.segmentation(line)
        
    }
    segmentation(line)
    {
        this.seg = []
        for(let i=0; i<line.length; i+=2){
            this.start = line[i]
            this.end = line[i+1]
            this.line3 = new THREE.Line3(this.start,this.end)
            this.seg.push(this.line3)
        }
        return this.seg
    }
    update()
    {

    }
}