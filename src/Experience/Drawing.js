import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import World from './World/World.js'
import Zboard from './World/Zboard.js'

export default class Drawing
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug
        this.camera = this.experience.camera
        this.zboard = this.experience.world.zboard
        console.log(this.zboard)
        

        this.paint = false
        this.mousemove = false
        this.change = false
        this.setRaycaster()
        this.setMouseControl()
        this.setMouseUpDown()
        this.currentx = this.mouse.x
        this.currenty = this.mouse.y
        this.objectTotest = 
        this.update()

    }

    setMouseControl()
    {
        this.mouse = new THREE.Vector2()
        window.addEventListener('mousemove', (event) =>
        {
            this.mousemove = true
            this.mouse.x = event.clientX / this.sizes.width * 2 - 1
            this.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1
        })
    }

    setMouseUpDown()
    {
        window.addEventListener( 'pointerdown', ()=>{
            this.paint = true
        })
        window.addEventListener( 'pointerup', ()=>{
            this.paint = false
        })
    }

    checkMouseChange()
    {
        if (Math.abs(this.mouse.x - this.currentx) >= 0.001 
            || Math.abs(this.mouse.y -this.currenty) >= 0.001)
            this.change = true
        else
            this.change = false
    }

    setRaycaster()
    {
        this.raycaster = new THREE.Raycaster()

        // this.scene.add(this.instance)
    }

    checkintersection()
    {
        // console.log(this.camera.instance)
        // console.log(this.zboard.mesh)
        this.raycaster.setFromCamera(this.mouse,this.camera.instance)
        this.intersects = this.raycaster.intersectObject(this.zboard.mesh)
        // console.log(this.intersects)
        console.log("change")
    }

    update()
    {   
        // console.log(this.zboard)
        this.checkMouseChange()
        if (this.paint && this.change & this.camera.controls.enabled == false){
            this.checkintersection()
        }
        this.currentx = this.mouse.x
        this.currenty = this.mouse.y
    }
}