import {Command, flags} from '@oclif/command'
import { BlimOptimizer } from '../optimizer/BlimOptimizer'
import { Image } from '../model/Image'

export default class Optimize extends Command {

  static description = 'Optimize an image'

  static flags = {
    width: flags.string({
      char: 'w', 
      description: 'The target width to resize to'
    }),
    height: flags.string({
      char: 'h', 
      description: 'The target height to resize to'
    }),
    fit: flags.string({
      char: 'f', 
      description: 'How to fit the width and height',
      options: ['cover', 'contain', 'fill', 'inside', 'outside'],
      dependsOn: ['width', 'height']
    }),
    position: flags.string({
      char: 'p',
      description: 'When using a fit of cover or contain, use this flag to adjust where to crop',
      options: ['top', 'right top', 'right', 'right bottom', 'bottom', 'left bottom', 'left', 'left top',
        'north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest', 'center',
        'entropy', 'attention'],
      dependsOn: ['fit']
    }),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Optimize)

    const optimizer: BlimOptimizer = new BlimOptimizer();
    const image: Image = Image.fromAnypath(args['file']);
    await optimizer.optimize(image, {
      width: Number.parseInt(flags.width || '') || undefined,
      height: Number.parseInt(flags.height || '') || undefined,
      fit: flags.fit || undefined,
      position: flags.position || undefined,
    })
    this.log(`Processed image and put optimized image to ${image.optimizedPath}`);
  }
}