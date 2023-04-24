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
        
        this.pointline = []
        this.returnpoint_bool = false
        
        window.addEventListener('keypress', (event) =>
        {
            var name = event.key
            if (name === 'Enter'){ 
                this.returnpoint_bool = true
            }
        })
        window.addEventListener('keyup',(event) =>
        {    
            var name = event.key
            if (name === 'Enter'){ 
                this.returnpoint_bool=false
            }
        })
        window.addEventListener('keypress', (event) =>
        {
            var name = event.key
            if (name === 'Enter'){ 
                this.destroy()
            }
        })
        
        this.setGeometry()
    }

    setGeometry()
    {
        if (this.getpoints !== undefined) {
            this.geometry = new THREE.BufferGeometry()
            this.vertices = new Float32Array([this.getpoints.x,this.getpoints.y,this.getpoints.z]) 
            this.geometry.setAttribute( 'position', new THREE.BufferAttribute( this.vertices, 3 ) )
            this.points = new THREE.Points( this.geometry, new THREE.PointsMaterial( { color: 0x888888,size:0.4 } ) )
            this.scene.add(this.points)
            this.pointline.push(new THREE.Vector3(this.getpoints.x,this.getpoints.y,this.getpoints.z))
        }
    }
    destroy()
    {
        for (let i=this.scene.children.length-1; i > 0 ; i--){
            if (this.scene.children[i].isPoints == true){
                this.scene.remove(this.scene.children[i])
            }
        }
    }
    update()
    {
        this.getpoints = this.experience.world.drawing.getpoints
        this.setGeometry()
    }
}