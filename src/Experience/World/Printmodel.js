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
        this.material = 'PLA'
        this.layerHeight = 1.0
        this.printSpeed = {
            'min': 5,
            'max': 30,
        }
        this.maxSlope = printers[this.printer]["machine_max_z_slope"] + 10
        this.smoothInterpolation = true
        this.exportGcode = () => {
            exportPrtintPath(this.printpath)
        }
        // atributtes
        this.sections = []
        this.printpath = []
        this.color = 'orange'
    }

    addLine(line){
       this.sections.push(line)
       if (this.sections.length == 1) {
            first_layer = this.generateFirstLayer(this.sections[0], this.layerHeight)
            this.display(first_layer, single_layer = true)
       }
       else {
        const last_section = this.sections[this.sections.length - 1]
        const second_last_section = this.sections[this.sections.length - 2]
        const smoothInterpolation = null
        // first two layers can only be linearly interpolated
        if (this.sections.length == 2) { smoothInterpolation = false } 
        else { smoothInterpolation = this.smoothInterpolation}
        // check if the last two layers can be interpolated
        is_interpolatable, layersNum = this.isInterpolatable(last_section, second_last_section)
        if (is_interpolatable) {
            inter_layers = this.generateInterLayers(last_section, second_last_section, layersNum, smoothInterpolation)
            this.display(inter_layers, single_layer = false)
            this.display(last_section, single_layer = true)
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
        if (layer.closed != layer2.closed) {
            console.log("The last two layers are not all closed curves or all open curves.")
            return false
        }
        // check the last section's slope is not too steep
        layer1.segments.forEach(segment1 => {
            const run = MATH.sqrt((segment1.end.x - segment1.start.x)**2 + (segment1.end.z - segment1.start.z)**2)
            const slope = (segment1.end.y - segment1.start.y) / run
            const angle = Math.atan(slope) * 180 / Math.PI
            if (angle > this.maxSlope) {
                console.log("The last section's slope is too steep.")
                return (false, null)
            }})

        closestDis = 0
        furthestDis = null
        for(let i = 0; i < layer1.points.length; i++){
            point1 = layer1.points[i]
            if (i < layer1.points.length - 1) {
            }
            // check the two layers don't intersect vertically
            layer2.points.forEach(point2 => {
                if (point2.x - 1 <= point1.x <= point2.x + 1 && point2.z - 1 <= point1.z <= point2.z + 1){
                    if (point1.y <= point2.y) {
                        console.log("The last two layers intersect vertically.")
                        return (false, null)
                    }
                }
            })
            // calculate the shortest/furthest closest distance between the two layers
            layer2.segments.forEach(segment2 => {
                const distance = segment2.closestPointToPoint(point1, true).distanceTo(point1)
                if (distance < closestDis) { closestDis = distance }
            })
            if (furthestDis == null || closestDis > furthestDis)
               { furthestDis = closestDis }
        }
        inter_layers_num_by_closestDis = MATH.floor(closestDis / this.limit["min_layer_height"])
        layer_height_max_by_closestDis = furthestDis / inter_layers_num_by_closestDis
        if (layer_height_max_by_closestDis > this.limit["max_layer_height"]) {
            console.log("The last two layers can not be interpolated by the shortest closest distance.")
            return (false, null)
        }
        inter_layers_num_by_furthestDis = MATH.ceil(furthestDis / this.limit["max_layer_height"])
        layer_height_min_by_furthestDis = closestDis / inter_layers_num_by_furthestDis
        if (layer_height_min_by_furthestDis < this.limit["min_layer_height"]) {
            console.log("The last two layers can not be interpolated by the furthest closest distance.")
            return (false, null)
        }
        // calculate the number of layers between the last two layers
        inter_layers_num = MATH.floor((furthestDis - closestDis) / this.layerHeight)
        return (true, inter_layers_num)
    }

    generateFirstLayer(layer, layerHeight) {
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
            const newPoint = new THREE.Vector3(point.x, this.limit["min_layer_height"], point.z);
            firstLayerPoints.push(newPoint);
        })
        const geometry = new THREE.BufferGeometry().setFromPoints(firstLayerPoints);
        const material = new THREE.LineBasicMaterial({ color : this.color });
        const firstLayer = new THREE.Line(geometry, material);
        this.printpath.push(first_layer)
        return firstLayer;
    }

    generateInterLayers(layer1, layer2, interLayersNum, smoothInterpolation = true) {
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
        new_layers = []
        for (let i = 0; i < interLayersNum; i++) {
            const curve = new THREE.CatmullRomCurve3( interLayersPoints[i], true );
            const points = curve.getPoints( 50 );
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
    
    clear() {
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

