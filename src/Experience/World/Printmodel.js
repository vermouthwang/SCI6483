import * as THREE from 'three'
import Experience from '../Experience.js'
import printers from '../printers.js'

export default class Printmodel
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        // settings
        this.printerType = "FDM"
        this.printer = "Prusa MKS3"
        this.limit = printers[this.printer]
        this.unit = {'mm': 10, 'cm': 1, 'm': 0.01}
        this.material = 'PLA'
        this.layerHeight = 1.0
        this.printSpeed = {
            'min': 5,
            'max': 30,
        }
        this.maxSlope = printers[this.printer]["machine_max_z_slope"] + 10
        this.smoothInterpolation = false
        this.exportGcode = () => {
            exportPrtintPath(this.printpath)
        }
        // atributtes
        this.sections = []
        this.printpath = []
        this.color = 'orange'
        this.clear = () => {
            this.clearPrintPath()
        }
    }

    addSection(section){
        this.sections.push(section)
        if (this.sections.length == 1) {
            const first_layer = this.generateFirstLayer(this.sections[0])
            this.display(first_layer, true)
        }
        else {
            let last_section = this.sections[this.sections.length - 1]
            let second_last_section = this.sections[this.sections.length - 2]
            let smoothInterpolation 
            // first two layers can only be linearly interpolated
            if (this.sections.length == 2) { smoothInterpolation = false } 
            else { smoothInterpolation = this.smoothInterpolation}
            // check if the last two layers can be interpolated
            let is_interpolatable = this.isInterpolatable(last_section, second_last_section)[0]
            let layersNum = this.isInterpolatable(last_section, second_last_section)[1]
            console.log(is_interpolatable, layersNum)
            if (is_interpolatable) {
                let inter_layers = this.generateInterLayers(last_section, second_last_section, layersNum, smoothInterpolation)
                this.display(inter_layers, false)
                console.log(inter_layers)
            }else{
                console.log("The last two layers can not be interpolated.")
                this.sections.pop()
                }
       }
    }
    
    isInterpolatable(layer1, layer2) {
        /**
         * Check if the last two layers can be interpolated.
         * args:
         *    layer1 (array): last section, a Line object.
         *    layer2 (array): second-last section, a Line object.
         * returns: (boolean , int)
         *   boolean: True if the last two layers can be interpolated.
         *           False if the last two layers can not be interpolated.
         *  int: the number of layers between the last two layers.
            */
        // check the two layers are all closed curves or all open curves
        const result = [false, 0]
        if (layer1.closed != layer2.closed) {
            console.log("The last two layers are not all closed curves or all open curves.")
            return result
        }
        // check the last section's slope is not too steep
        layer1.segments.forEach(segment1 => {
            const run = Math.sqrt((segment1.end.x - segment1.start.x)**2 + (segment1.end.z - segment1.start.z)**2)
            const slope = (segment1.end.y - segment1.start.y) / run
            const angle = Math.atan(slope) * 180 / Math.PI
            if (angle > this.maxSlope) {
                console.log("The last section's slope is too steep.")
                return result
            }})

        let closestDis = null
        let furthestDis = null
        for(let i = 0; i < layer1.points.length; i++){
            let point1 = layer1.points[i]
            if (i < layer1.points.length - 1) {
            }
            // check the two layers don't intersect vertically
            layer2.points.forEach(point2 => {
                if (point2.x - 1 <= point1.x <= point2.x + 1 && point2.z - 1 <= point1.z <= point2.z + 1){
                    if (point1.y <= point2.y) {
                        console.log("The last two layers intersect vertically.")
                        return result
                    }
                }
            })
            // calculate the shortest/furthest closest distance between the two layers
            layer2.segments.forEach(segment2 => {
                let closetPoint = new THREE.Vector3()
                segment2.closestPointToPoint(point1, true, closetPoint)
                const distance = closetPoint.distanceTo(point1)
                if (closestDis == null || distance < closestDis) { closestDis = distance }
            })
            if (furthestDis == null || closestDis > furthestDis)
               { furthestDis = closestDis }
        }
        const inter_layers_num_by_closestDis = Math.floor(closestDis*this.unit['mm'] / this.limit["min_layer_height"])
        const layer_height_max_by_closestDis = furthestDis*this.unit['mm'] / inter_layers_num_by_closestDis
        // console.log("inter_layers_num_by_closestDis", inter_layers_num_by_closestDis)
        // console.log("layer_height_max_by_closestDis", layer_height_max_by_closestDis)
        if (layer_height_max_by_closestDis > this.limit["max_layer_height"]) {
            console.log("The last two layers can not be interpolated by the shortest closest distance.")
            return result
        }
        const inter_layers_num_by_furthestDis = Math.ceil(furthestDis*this.unit['mm'] / this.limit["max_layer_height"])
        const layer_height_min_by_furthestDis = closestDis*this.unit['mm'] / inter_layers_num_by_furthestDis
        // console.log("inter_layers_num_by_furthestDis", inter_layers_num_by_furthestDis)
        // console.log("layer_height_min_by_furthestDis", layer_height_min_by_furthestDis)
        if (layer_height_min_by_furthestDis < this.limit["min_layer_height"]) {
            console.log("The last two layers can not be interpolated by the furthest closest distance.")
            return result
        }
        // calculate the number of layers between the last two layers
        const k = (this.layerHeight - this.limit["min_layer_height"]) / (this.limit["max_layer_height"] - this.limit["min_layer_height"])
        const inter_layers_num = Math.floor((inter_layers_num_by_closestDis - inter_layers_num_by_furthestDis)*k + inter_layers_num_by_furthestDis)
        result[0] = true
        result[1] = inter_layers_num
        return result
    }

    generateFirstLayer(layer) {
        /**
         * Generate the first layer.
         * args:
         *    layer (array): a Line object.
         *    layerHeight (float): The height of each layer.
         * returns: (array)
         *  array: a set of points.
         * */
        const firstLayerPoints = [];
        layer.points.forEach(point => {
            const newPoint = new THREE.Vector3(point.x, this.limit["min_layer_height"]/this.unit['mm'], point.z);
            firstLayerPoints.push(newPoint);
        })
        const geometry = new THREE.BufferGeometry().setFromPoints(firstLayerPoints);
        const material = new THREE.LineBasicMaterial({ color : this.color });
        const firstLayer = new THREE.Line(geometry, material);
        this.printpath.push(firstLayer)
        return firstLayer;
    }

    generateInterLayers(layer1, layer2, interLayersNum, smoothInterpolation) {
        /**
         * Interpolate between the last two layers.
         * args: 
         *     layer1 (array): last section, a Line object.
         *    layer2 (array): second-last section, a Line object.
         *   interLayersNum (int): the number of layers between the last two layers.
         *  smoothInterpolation (boolean): True if the interpolation is smooth.
         *                               False if the interpolation is linear.
         * returns: (array): a set of interpolated layers.
         */
        const interLayersPoints = [];
        // console.log("interLayersNum: " + interLayersNum)
        if (smoothInterpolation) {
            // smooth interpolation
            
        } else {
            // linear interpolation
            for (let i = 0; i < layer1.points.length; i++) {
                const lastPoint = layer1.points[i];
                const secondLastPoint = layer2.points[i];
                const points = [];
                points.push(lastPoint);
                points.push(secondLastPoint);
                const verticalLine = new THREE.LineCurve3(lastPoint, secondLastPoint);
                // VISUALIZE THE LINE
                // const geometry = new THREE.BufferGeometry().setFromPoints( points );
                // const material = new THREE.LineBasicMaterial( { color : 0x0000ff } );
                // const line = new THREE.Line( geometry, material );
                // scene.add(line);
                // END VISUALIZE THE LINE
                const interPointsVertical = verticalLine.getPoints(interLayersNum);
                for (let j = 0; j < interPointsVertical.length; j++) {
                    if (i === 0 ){
                        interLayersPoints.push([]);
                        interLayersPoints[j].push(interPointsVertical[j]);
                    }else{
                        interLayersPoints[j].push(interPointsVertical[j])};
                }
            }
        }
        const new_layers = []
        for (let i = 0; i < interLayersNum; i++) {
            const curve = new THREE.CatmullRomCurve3( interLayersPoints[i], true );
            console.log('curve ' + i + ' generated', curve)
            let points = curve.getPoints( 50 );
            const geometry = new THREE.BufferGeometry().setFromPoints( points );
            const material = new THREE.LineBasicMaterial( { color : this.color } );
            const line = new THREE.Line( geometry, material );
            // console.log('line ' + i + 'generated')
            this.printpath.push(line);
            new_layers.push(line)
        }
        return new_layers
    }
    
    display(layers, single_layer = false) {
        /*
        Display the layers array.
    
        Args:
            layers (array): The array of layers.
        */
        if (single_layer) {
            this.experience.scene.add(layers);
        }else{
            layers.forEach(layer => {
                this.experience.scene.add(layer);
            });
        }
        
    }
    
    clearPrintPath() {
        /*
        Clear the canvas.
        */
        this.printpath.forEach(layer => {
            this.experience.scene.remove(layer);
        });
        this.printpath = [];
    }

    exportPrtintPath(printpath){
        // export the printpath to gcode
        // TODO
        console.log("printpath exported")
    }
}

