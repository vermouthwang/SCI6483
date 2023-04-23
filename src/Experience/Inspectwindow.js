import * as THREE from 'three'
import * as dat from 'lil-gui'
import Experience from './Experience.js'

export default class Inspectwindow
{
    constructor()
    {
        this.ui = new dat.GUI({title: 'Inspect Window', width: 200})
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setWindow()
    }

    setWindow(){
        // printing parameters
        this.printParams = this.ui.addFolder('PrintSettings')
        this.printParams.add(this.experience.world.printmodel, 'printerType', ['FDM', 'SLA','CLAY'])
                        .name('Printer Type')   
        this.printParams.add(this.experience.world.printmodel, 'printer', ['Prusa MKS3', 'Creality Ender-3'])
                        .name('Printer')
        this.printParams.add(this.experience.world.printmodel, 'material', ['PLA', 'ABS','CLAY'] )
                        .name('Material')
        this.printParams.add(this.experience.world.printmodel, 'layerHeight')
                        .name('Layer Height')
                        .min(0.5).max(1.5).step(0.1)
        this.printParams.add(this.experience.world.printmodel.printSpeed, 'min')
                        .name('Min Speed')
                        .min(5).max(30).step(0.1)
        this.printParams.add(this.experience.world.printmodel.printSpeed, 'max')
                        .name('Max Speed')
                        .min(5).max(30).step(0.1)
        //drawing parameters
        this.printParams = this.ui.addFolder('DrawingSettings')
        this.printParams.add(this.experience.camera.controls, 'enabled', 'draw')
    }


}