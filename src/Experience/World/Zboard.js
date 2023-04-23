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
        this.setTextures()
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

    setTextures()
    {
        this.textures = {}

        this.textures.color = this.resources.items.grassColorTexture
        this.textures.color.encoding = THREE.sRGBEncoding
        this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping

        this.textures.normal = this.resources.items.grassNormalTexture
        this.textures.normal.repeat.set(1.5, 1.5)
        this.textures.normal.wrapS = THREE.RepeatWrapping
        this.textures.normal.wrapT = THREE.RepeatWrapping
    }

    setMaterial()
    {
        this.material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            transparent: true,
            opacity:0.2,
            color: new THREE.Color('#ff00ff')
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.x = 0
        this.mesh.position.z = -5
        this.mesh.position.y = 5

        // this.mesh.rotation.x = - Math.PI * 0.5
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