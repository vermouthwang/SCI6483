import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Yboard
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
            color: new THREE.Color('#887020')
        })

    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.y = 5
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true
        this.mesh.visible = false
        this.scene.add(this.mesh)
    }

    upward()
    {
        this.mesh.position.y += 0.08
    }
    downward()
    {
        this.mesh.position.y -= 0.08
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