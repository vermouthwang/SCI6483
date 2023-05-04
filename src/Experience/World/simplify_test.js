import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Simplification
{
    constructor(line)
    {
        this.line = line
        console.log("line",this.line)
        // this.line_xz = this.linexz()
        // this.line_yz = this.lineyz()
        // // this.simplify_yz = this.simplify(this.line_yz)
        // // console.log(this.simplify_yz.length)
        // this.simplify_xz = this.simplify(this.line_xz)
        // console.log(this.simplify_xz.length)
        this.simplified_line = this.simplification()
        console.log("inside result",this.simplified_line)
    }
    
    simplification(){
// to suit your point format, run search/replace for '.x', '.y' and '.z';
// (configurability would draw significant performance overhead)

// square distance between 2 points
        function getSquareDistance(p1, p2) {
        
            var dx = p1.x - p2.x,
                dy = p1.y - p2.y,
                dz = p1.z - p2.z;
        
            return dx * dx + dy * dy + dz * dz;
        }

        // square distance from a point to a segment
        function getSquareSegmentDistance(p, p1, p2) {
        
            var x = p1.x,
                y = p1.y,
                z = p1.z,
        
                dx = p2.x - x,
                dy = p2.y - y,
                dz = p2.z - z;
        
            if (dx !== 0 || dy !== 0 || dz !== 0) {
            
                var t = ((p.x - x) * dx + (p.y - y) * dy + (p.z - z) * dz) /
                        (dx * dx + dy * dy + dz * dz);
            
                if (t > 1) {
                    x = p2.x;
                    y = p2.y;
                    z = p2.z;
                
                } else if (t > 0) {
                    x += dx * t;
                    y += dy * t;
                    z += dz * t;
                }
            }
        
            dx = p.x - x;
            dy = p.y - y;
            dz = p.z - z;
        
            return dx * dx + dy * dy + dz * dz;
        }
        // the rest of the code doesn't care for the point format

        // basic distance-based simplification
        function simplifyRadialDistance(points, sqTolerance) {
        
            var prevPoint = points[0],
                newPoints = [prevPoint],
                point;
        
            for (var i = 1, len = points.length; i < len; i++) {
                point = points[i];
            
                if (getSquareDistance(point, prevPoint) > sqTolerance) {
                    newPoints.push(point);
                    prevPoint = point;
                }
            }
        
            if (prevPoint !== point) {
                newPoints.push(point);
            }
        
            return newPoints;
        }

        // simplification using optimized Douglas-Peucker algorithm with recursion elimination
        function simplifyDouglasPeucker(points, sqTolerance) {
        
            var len = points.length,
                MarkerArray = typeof Uint8Array !== 'undefined' ? Uint8Array : Array,
                markers = new MarkerArray(len),
        
                first = 0,
                last = len - 1,
        
                stack = [],
                newPoints = [],
        
                i, maxSqDist, sqDist, index;
        
            markers[first] = markers[last] = 1;
        
            while (last) {
            
                maxSqDist = 0;
            
                for (i = first + 1; i < last; i++) {
                    sqDist = getSquareSegmentDistance(points[i], points[first], points[last]);
                
                    if (sqDist > maxSqDist) {
                        index = i;
                        maxSqDist = sqDist;
                    }
                }
            
                if (maxSqDist > sqTolerance) {
                    markers[index] = 1;
                    stack.push(first, index, index, last);
                }
            
                last = stack.pop();
                first = stack.pop();
            }
        
            for (i = 0; i < len; i++) {
                if (markers[i]) {
                    newPoints.push(points[i]);
                }
            }
        
            return newPoints;
        }
        return simplifyDouglasPeucker(this.line, 0.00000001)
        // // both algorithms combined for awesome performance
        // function simplify(points, tolerance, highestQuality) {
        
        //     var sqTolerance = tolerance !== undefined ? tolerance * tolerance : 1;
        
        //     points = highestQuality ? points : simplifyRadialDistance(points, sqTolerance);
        //     points = simplifyDouglasPeucker(points, sqTolerance);
        
        //     return points;
        // }

        // export as a Node module, an AMD module or a global browser variable
        // if (typeof module !== 'undefined') {
        //     module.exports = simplify;
        
        // } else if (typeof define === 'function' && define.amd) {
        //     define(function() {
        //         return simplify;
        //     });
        
        // } else {
        //     window.simplify = simplify;
        // }

        }
            }
    // rebuildline()
    // {
    //     var lines = []
    //     var len = this.simplify_xz.length
    //     var y_line = []
    //     var jump = Math.round(this.line.length/len)
    //     for (let i = 0; i<this.line.length; i+=jump){
    //         y_line.push(this.line[i].y)
    //     }
    //     console.log("y_line",y_line.length)
    //     console.log("simplify_xz",len)
    //     var min_len = Math.min(len,y_line.length)

    //     for (let i=0; i<min_len; i++){
    //         lines.push(new THREE.Vector3(this.simplify_xz[i][0],y_line[i],this.simplify_xz[i][1]))
    //     }
    //     return lines
    // }
    // linexz()
    // {
    //     var lines = []
    //     for (let i=0; i<this.line.length; i++){
    //         lines.push([this.line[i].x,this.line[i].z])
    //     }
    //     return lines
    // }
    // lineyz()
    // {
    //     var lines = []
    //     for (let i=0; i<this.line.length; i++){
    //         lines.push([this.line[i].y,this.line[i].z])
    //     }
    //     return lines
    // }

    // simplify(twovecline)
    // {   
    //     console.log("twovec",twovecline.length)
    //     // var line = this.line_xy
    //     function distanceFromALine(point, line) {
    //         var x0 = point[0],
    //             y0 = point[1],
    //             indexOfLastPoint = line.length-1,
    //             x1 = line[0][0],
    //             y1 = line[0][1],
    //             x2 = line[indexOfLastPoint][0],
    //             y2 = line[indexOfLastPoint][1];
    //         //console.log('distance from a line', x0, y0, x1, y1, x2, y2)
    //         var numerator = Math.abs( ((y2-y1)*x0) - ((x2-x1)*y0) + (x2*y1) - (y2*x1) );
    //         var denominator = Math.sqrt( Math.pow((y2-y1),2) + Math.pow((x2-x1),2) );
    //         return numerator / denominator;
    //     }
  
    //     function farthestPoint(line) {
    //         var candidates = line.slice(1,-1);
    //         var farthest = candidates.reduce( function(p,c, i) {
    //             //console.log("p: " + p);
    //             //console.log("c: " + c)
    //             var distance = distanceFromALine(c, line);
    //             //console.log("d: " + distance);
                
    //             if (p.distance > distance) {
    //                 return p;
    //             } else {
    //                 return {index: i, distance: distance};
    //             }    
    //         }, {index: undefined, distance: 0});

    //         return farthest;
    //     }
        
    //     function simplify(line, tollerance) {
    //         if (line.length <= 2) {
    //             return line;
    //         }
    //         var fp = farthestPoint(line);

    //         if (fp.distance <= tollerance) {
    //             // drop any remaining points
    //             return [line[0], line[line.length-1]];
    //         } else {
    //             var firstLine = line.slice(0,fp.index+2),
    //                 secondLine = line.slice(fp.index+1);
    //             //console.log('firstLine', JSON.stringify(firstLine));
    //             //console.log('secondLine', JSON.stringify(secondLine));
    //             var simplifiedFirstLine = simplify(firstLine, tollerance),
    //                 simplifiedSecondLine = simplify(secondLine, tollerance);            
    //                 //console.log('sfirstLine', JSON.stringify(simplifiedFirstLine));
    //                 //console.log('ssecondLine', JSON.stringify(simplifiedSecondLine));
    //             return simplifiedFirstLine.concat(simplifiedSecondLine.slice(1));
    //         }
    //     }
    //     return simplify(twovecline, 0.0001)
    //     // console.log(simplify(line, 0.05))
    // }

// export default class Point
// {
//     constructor()
//     {
//         this.experience = new Experience()
//         this.scene = this.experience.scene
//         this.resources = this.experience.resources
//         this.sizes = this.experience.sizes
//         this.scene = this.experience.scene
//         this.canvas = this.experience.canvas
//         this.debug = this.experience.debug
//         this.camera = this.experience.camera
//         this.getpoints = this.experience.world.drawing.getpoints
        
//         this.pointline = []
//         this.returnpoint_bool = false
        
//         window.addEventListener('keypress', (event) =>
//         {
//             var name = event.key
//             if (name === 'Enter'){ 
//                 this.returnpoint_bool = true
//             }
//         })
//         window.addEventListener('keyup',(event) =>
//         {    
//             var name = event.key
//             if (name === 'Enter'){ 
//                 this.returnpoint_bool=false
//             }
//         })
//         window.addEventListener('keypress', (event) =>
//         {
//             var name = event.key
//             if (name === 'Enter'){ 
//                 this.destroy()
//             }
//         })
//         this.setGeometry()
//     }



// }

