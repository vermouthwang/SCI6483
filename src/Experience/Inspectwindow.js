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
    
    setadditionalwindow(){
        if (this.experience.world.zboard != undefined){
            this.printParams.add(this.experience.world.zboard.mesh, 'visible')
                            .name("Zboard-Yboard")}
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
                        .name('Layer Height(mm)')
                        .min(this.experience.world.printmodel.limit["min_layer_height"])
                        .max(this.experience.world.printmodel.limit["max_layer_height"])
                        .step(0.1)
        this.printParams.add(this.experience.world.printmodel, 'smoothInterpolation', ['True', 'False'])
                        .name('Smooth Interpolation')
        this.printParams.add(this.experience.world.printmodel, 'exportGcode')
                        .name('Export Gcode')
        // display settings
        this.displayParams = this.ui.addFolder('DisplaySettings')
        this.displayParams.add(this.experience.world.printmodel, 'color', ['orange', 'blue', 'green', 'red'])
                          .name('Model Color')
        //drawing parameters
        this.printParams = this.ui.addFolder('DrawingSettings')
        this.printParams.add(this.experience.camera.controls, 'enabled')
                        .name("view")
        this.printParams.add(this.experience.world.printmodel, 'clear').name("Clear")
    }


}