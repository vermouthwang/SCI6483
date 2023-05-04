import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Zboard
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
                this.backward()
                this.onchange=true
            }
            if (name === 'w'){
                this.forward()
                this.onchange=true
            }
            if (name === 'z'){
                this.mesh.visible = !this.mesh.visible
            }
            
        })
        window.addEventListener('keyup',(event) =>
        {    
            var name = event.key
            if (name === 's' || name === 'w'){ 
                this.onchange=false
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
        this.mesh.position.x = 0
        this.mesh.position.z = -0.5*this.size[1]/this.unit
        this.mesh.position.y = 0.5*this.size[1]/this.unit
        this.mesh.visible = true

        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }

    forward()
    {
        this.mesh.position.z -= 0.15
    }
    backward()
    {
        this.mesh.position.z += 0.15
    }
    update()
    {   
    }
}