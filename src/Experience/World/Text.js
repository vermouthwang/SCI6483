import * as THREE from 'three'
import Experience from '../Experience.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export default class Text
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.machine = this.experience.world.printmodel.limit
        this.size = [this.machine["machine_width"], this.machine["machine_depth"], this.machine["machine_height"]]
        this.textstr =this.size[0].toString()
        this.textstrhalf = (0.5 *this.size[0]).toString()
        this.unit = this.experience.world.printmodel.unit["mm"]



        // Resource
        this.resource = this.resources.items.fonts

        this.setModel()
    }

    setModel()
    {
        this.font = this.resource

        this.textgeo = new TextGeometry( this.textstr + "mm", {
            font: this.font,
            size: 0.5,
            height: 0.1,
            // curveSegments: 12,
            // bevelEnabled: true,
            // bevelThickness: 10,
            // bevelSize: 8,
            // bevelOffset: 0,
            // bevelSegments: 5
        } )
        this.textgeohalf = new TextGeometry( this.textstrhalf + "mm", {
            font: this.font,
            size: 0.5,
            height: 0.1,
            // curveSegments: 12,
            // bevelEnabled: true,
            // bevelThickness: 10,
            // bevelSize: 8,
            // bevelOffset: 0,
            // bevelSegments: 5
        } )
        this.material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } )

        this.textmesh = new THREE.Mesh(this.textgeo, this.material)
        this.textmesh.rotation.x = - Math.PI * 0.5
        this.textmesh.position.x = this.size[0] / this.unit  * 0.5 +0.5
        this.textmesh.position.z = this.size[1] / this.unit  * 0.5 +0.5

        this.textmesh2 = new THREE.Mesh(this.textgeo, this.material)
        this.textmesh2.rotation.x = - Math.PI * 0.5
        this.textmesh2.position.z = - this.size[1] / this.unit  * 0.5 
        this.textmesh2.position.x = -this.size[0] / this.unit  * 0.5 - 3.5
        
        this.textmesh3 = new THREE.Mesh(this.textgeo, this.material)
        this.textmesh3.position.z = - this.size[1] / this.unit  * 0.5 
        this.textmesh3.position.x = -this.size[0] / this.unit  * 0.5 - 3.5
        this.textmesh3.position.y = this.size[0] / this.unit 

        this.textmesh4 = new THREE.Mesh(this.textgeohalf, this.material)
        this.textmesh4.position.z = - this.size[1] / this.unit  * 0.5 
        this.textmesh4.position.x = -this.size[0] / this.unit  * 0.5 - 3.5
        this.textmesh4.position.y = this.size[0] / this.unit *0.5
        
        this.scene.add(this.textmesh)
        this.scene.add(this.textmesh2)
        this.scene.add(this.textmesh3)
        this.scene.add(this.textmesh4)

    }

    setAnimation()
    {

    }

    update()
    {   
    
    }
}