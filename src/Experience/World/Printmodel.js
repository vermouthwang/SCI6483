import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Printmodel
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.sections = []
        

    }

    addLine(line, smoothInterpolation = true){
       this.sections.push(line)
    }

    

    generateinterLayers(layer1, layer2, layerHeight ) {
        /**
         * Interpolate between the last two layers.
         * args: 
         *     layers (array): a set of points.
         *     layerHeight (float): The height of each layer.
         */
    
        const interLayersNum = sectionHeight / layerHeight - 1;
        const interLayersPoints = [];
    
    
        for (let i = 0; i < layer1.length; i++) {
            const lastPoint = layer1[i];
            const secondLastPoint = layer2[i];
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
    
        for (let i = 0; i < interLayersNum; i++) {
            const curve = new THREE.CatmullRomCurve3( interLayersPoints[i], true );
            const points = curve.getPoints( 50 );
            const geometry = new THREE.BufferGeometry().setFromPoints( points );
            const material = new THREE.LineBasicMaterial( { color : 'orange' } );
            const line = new THREE.Line( geometry, material );
            // console.log('line ' + i + 'generated')
            layers.push(line);
        }
    
    }
    
    display(layers) {
        /*
        Display the layers array.
    
        Args:
            layers (array): The array of layers.
        */
        layers.forEach(layer => {
            scene.add(layer);
        });
    }
    
    clear() {
        /*
        Clear the canvas.
        */
        layers.forEach(layer => {
            scene.remove(layer);
        });
        layers.length = 0;
        sectionsNum = 0;
    }

}