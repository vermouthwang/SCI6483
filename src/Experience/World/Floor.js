import * as THREE from 'three'
import Experience from '../Experience.js'
import printers from '../printers.js'
// import EventEmitter from '/Users/macbook/Desktop/website/finalproject/SCI6483/src/Experience/Utils/EventEmitter.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export default class Floor
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.machine = this.experience.world.printmodel.limit
        this.size = [this.machine["machine_width"], this.machine["machine_depth"], this.machine["machine_height"]]
        this.unit = this.experience.world.printmodel.unit["mm"]
        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.update()
    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(this.size[0]/this.unit, this.size[1]/this.unit,10,10)
        this.geometry2 = new THREE.PlaneGeometry(this.size[0]/this.unit, this.size[1]/this.unit,10,10)
        this.geometry3 = new THREE.PlaneGeometry(this.size[0]/this.unit, this.size[1]/this.unit,1,1)
        this.geometry4 = new THREE.PlaneGeometry(this.size[0]/this.unit, this.size[1]/this.unit,1,1)
        this.geometry5 = new THREE.PlaneGeometry(this.size[0]/this.unit, this.size[1]/this.unit,1,1)
    }
    
    setMaterial()
    {
        this.material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            transparent: true,
            wireframe :true,
            color: new THREE.Color('#ffffff'),
            opacity: 0.5,
            wireframeLinewidth: 2
        })
        this.material2 = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            color: new THREE.Color('#201020'),
            opacity: 0.5,
            wireframeLinewidth: 2
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.y = 0.01
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh2 = new THREE.Mesh(this.geometry2, this.material2)
        this.mesh2.rotation.x = - Math.PI * 0.5
        this.mesh2.receiveShadow = true

        this.mesh3 =  new THREE.Mesh(this.geometry3, this.material)
        this.mesh4 =  new THREE.Mesh(this.geometry4, this.material)
        this.mesh5 =  new THREE.Mesh(this.geometry5, this.material)

        
        this.mesh3.rotation.y = - Math.PI * 0.5
        this.mesh5.rotation.y = - Math.PI * 0.5

        this.mesh5.position.y = this.size[1]/this.unit/2
        this.mesh5.position.x = -this.size[0]/this.unit/2
        
        this.mesh3.position.x = this.size[0]/this.unit/2
        this.mesh3.position.y = this.size[1]/this.unit/2

        this.mesh4.position.z = -this.size[0]/this.unit/2
        this.mesh4.position.y = this.size[1]/this.unit/2

        this.scene.add(this.mesh)
        this.scene.add(this.mesh2)
        this.scene.add(this.mesh3)
        this.scene.add(this.mesh4)
        this.scene.add(this.mesh5)
    }

    update()
    {
        this.mesh.position.x +=0.01
        console.log(this.mesh.position.x)
    }
}