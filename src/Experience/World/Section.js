import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Section
{
    constructor(sectionPoints)
    {
        this.closed = false
        this.points = sectionPoints
        this.segmentation(sectionPoints)
        
    }

    segmentation(points)
    {
        this.segments = []
        for(let i=0; i<points.length; i+=2){
            this.start = points[i]
            this.end = points[i+1]
            this.line3 = new THREE.Line3(this.start,this.end)
            this.segments.push(this.line3)
        }
    }

    update()
    {
    }
}