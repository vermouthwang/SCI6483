import * as THREE from 'three'
import * as dat from 'lil-gui'
import Experience from './Experience.js'

export default class Inspectwindow
{
    constructor()
    {
        this.ui = new dat.GUI()
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setWindow()
    }

    setWindow(){
        console.log("GUI")
    }

}