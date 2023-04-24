import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Zboard
{
    constructor()
    {
        
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

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
        this.geometry = new THREE.PlaneGeometry(10, 10,10,10)
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
        this.mesh.position.z = -5
        this.mesh.position.y = 5
        this.mesh.visible = true

        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }

    forward()
    {
        this.mesh.position.z -= 0.08
    }
    backward()
    {
        this.mesh.position.z += 0.08
    }
    update()
    {   
    }
}