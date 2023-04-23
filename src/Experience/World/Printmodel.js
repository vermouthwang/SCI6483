import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Printmodel
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // this.setGeometry()
        // this.setTextures()
        // this.setMaterial()
        // this.setMesh()
        // this.update()
    }
}