import * as THREE from 'three'
import Experience from '../Experience.js'
// import EventEmitter from '/Users/macbook/Desktop/website/finalproject/SCI6483/src/Experience/Utils/EventEmitter.js'

export default class Floor
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
            wireframe :true,
            color: new THREE.Color('#ff00ff'),
            opacity: 0.5
        })
        // this.material.opacity = 0.5
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.x = 0
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }

    update()
    {
        this.mesh.position.x +=0.01
        console.log(this.mesh.position.x)
    }
}