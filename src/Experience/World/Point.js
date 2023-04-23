import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Point
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug
        this.camera = this.experience.camera
        this.getpoints = this.experience.world.drawing.getpoints
        
        this.setGeometry()
        console.log(this.getpoints)
    }

    setGeometry()
    {
        if (this.getpoints != undefined) {
            this.geometry = new THREE.BufferGeometry()

            this.vertices = new Float32Array([this.getpoints.x,this.getpoints.y,this.getpoints.z]) 
            this.geometry.setAttribute( 'position', new THREE.BufferAttribute( this.vertices, 3 ) )
            this.points = new THREE.Points( this.geometry, new THREE.PointsMaterial( { color: 0x888888,size:0.4 } ) )
            this.scene.add(this.points)
        }
    }

    update()
    {
        this.getpoints = this.experience.world.drawing.getpoints
        this.setGeometry()
        // console.log(this.getpoints)
    }
}