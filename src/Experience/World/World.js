import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'
import Zboard from './Zboard.js'
import Yboard from './Yboard.js'
import Point from './Point.js'
import Line from './Line.js'
import Printmodel from './Printmodel.js'
import Drawing from '../Drawing.js'
import Text from './Text.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.printmodel = new Printmodel()


        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()
            this.zboard = new Zboard()
            this.yboard = new Yboard()
            this.fox = new Fox()
            this.text = new Text()
            this.environment = new Environment()
            this.drawing = new Drawing()
            this.point = new Point()
            this.line = new Line()
            this.experience.inspectwindow.setadditionalwindow()
        })

    }

    update()
    {
        if(this.fox){
            this.fox.update()
            // this.drawing.update()
        }
        if (this.drawing){
            this.drawing.update()
        }
        if (this.point){
            this.point.update()
        }    
        if (this.line){
            this.line.update()
        }         
        if (this.yboard){
            this.yboard.update()
        }

    }
}