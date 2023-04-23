import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'
import Zboard from './Zboard.js'
import Point from './Point.js'
import Line from './Line.js'
import Printmodel from './Printmodel.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()
            this.zboard = new Zboard()
            this.fox = new Fox()
            this.environment = new Environment()
        })
    }

    update()
    {
        if(this.fox)
            this.fox.update()
            // console.log(this.floor.update())
        // if(this.floor)
        //     this.floor.update()
    }
}