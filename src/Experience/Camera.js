import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('control')
        }

        this.setInstance()
        this.setControls()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(0,3,10)
        // TODO #1
        // console.log(this.instance.lookAt)
        // this.instance.lookAt((0,10,0))
        this.scene.add(this.instance)
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.enabled = true

        console.log(this.debug)
        if(this.debug.active)
        {
            this.debugFolder.add(this.controls,'enabled',true).name('perspective')
        }
  
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {   
        this.controls.update()
    }
}