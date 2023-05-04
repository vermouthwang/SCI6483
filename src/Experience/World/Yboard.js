import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Yboard
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.size = this.experience.world.floor.size
        this.unit = this.experience.world.floor.unit
        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.update()
        this.onchange = false
    
 
        window.addEventListener('keypress', (event) =>
        {
            var name = event.key
            if (name === 's'){ 
                this.downward()
                this.onchange=true
            }
            if (name === 'w'){
                this.upward()
                this.onchange=true
            }
        })
        window.addEventListener('keyup',(event) =>
        {    
            var name = event.key
            if (name === 's' || name === 'w'){ 
                this.onchange=false
            }
        })      
        window.addEventListener('keypress',(event) =>
        {    
            var name = event.key
            if (name === 'Enter'){ 
                this.mesh.material.color.r = 0.53
                this.mesh.material.color.g =0.44
            }
        })     
    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(this.size[0]/this.unit, this.size[1]/this.unit,10,10)
    }

    setMaterial()
    {
        this.material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            transparent: true,
            opacity:0.2,
            color: new THREE.Color('#887020')
        })
        
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.y = 0
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true
        this.mesh.visible = false
        this.scene.add(this.mesh)
    }

    upward()
    {
        this.mesh.position.y += 0.12
        this.mesh.material.color.r += 0.03
        this.mesh.material.color.g -= 0.03
        this.mesh.material.opacity += 0.001
        
        
    }

    downward()
    {
        this.mesh.position.y -= 0.12
        this.mesh.material.color.r -= 0.03
        this.mesh.material.color.g += 0.03
        this.mesh.material.opacity -= 0.001
    }

    update()
    {   
        if (this.experience.world.zboard.mesh.visible == false){
            this.mesh.visible = true
        }
        else{
            this.mesh.visible = false
        }
    } 
}