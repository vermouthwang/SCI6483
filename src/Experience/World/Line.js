import * as THREE from 'three'
import Experience from '../Experience.js'
import Section from './Section.js'
import Simplification from './simplify_test.js'

export default class Line
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug
        this.camera = this.experience.camera
        
        this.allpoints = undefined
        this.old = this.allpoints
        window.addEventListener('keypress', (event) =>
        {
            var name = event.key
            if (name === 'Enter'){ 
                this.allpoints = this.experience.world.point.pointline
                this.experience.world.point.pointline = []
            }
            this.setGeometry()
            
            
        })
    }
    simplify()  //simplify the line
    {
        if (this.allpoints != undefined){
            this.simplification = new Simplification(this.allpoints)
            return this.simplification.simplified_line
        }
    }
    onchange()
    {
        if (this.allpoints != this.old){
            this.linechange = true
        }
        else{
            this.linechange = false
        }
        this.old = this.allpoints
    }

    setGeometry()
    {
        if (this.linechange == true) {

            var simplified_line = this.simplify()
            console.log(simplified_line.length)
            this.curve = new THREE.CatmullRomCurve3(simplified_line)
            this.curve.closed = true
            this.close_bool = this.curve.closed
            // if (simplified_line.length <= 100){
            this.section_point = this.curve.getPoints(simplified_line.length);
            // }
            // else{
            //     this.section_point = this.curve.getPoints(Math.round(this.allpoints.length/1.2));
            // }
            this.geometry = new THREE.BufferGeometry().setFromPoints( this.section_point );
            this.material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
            this.curveObject = new THREE.Line( this.geometry, this.material );
            this.scene.add(this.curveObject)
            this.createSection()
        }
    }

    createSection()
    {
        this.section = new Section(this.section_point)
        this.section.close_bool = this.close_bool
        this.experience.world.printmodel.addLine(this.section)
        console.log(this.section)
        // this.experience.world.printmodel.atttributelinestorage.push(this.section)
    }

    update()
    {
        this.onchange()
        
        this.setGeometry()
    }
}