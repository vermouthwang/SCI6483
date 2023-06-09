import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'



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
        this.yboard = this.experience.world.yboard
        
        this.paint = false
        this.mousemove = false
        this.change = false
        this.setRaycaster()
        this.setMouseControl()
        this.setMouseUpDown()
        this.currentx = this.mouse.x
        this.currenty = this.mouse.y
        this.getpoints
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
            this.getpoints = undefined
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
    }

    checkintersection()
    {
        this.raycaster.setFromCamera(this.mouse,this.camera.instance)
        if (this.zboard.mesh.visible == true){
            this.intersects = this.raycaster.intersectObject(this.zboard.mesh)}
        else{
            this.intersects = this.raycaster.intersectObject(this.yboard.mesh)
        }
        
        if (this.intersects.length!=0 && this.intersects != undefined){
            this.getpoints = this.intersects[0].point
        }
        else{
            this.getpoints = undefined
        }
    }

    update()
    {   
        this.checkMouseChange()
        if ((this.paint && this.change && this.camera.controls.enabled == false) ||
            (this.paint && this.zboard.onchange && this.camera.controls.enabled == false)
            ){
            this.checkintersection()
        }
        this.currentx = this.mouse.x
        this.currenty = this.mouse.y
    }
}