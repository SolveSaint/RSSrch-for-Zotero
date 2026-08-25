import { QuartzComponent, QuartzComponentConstructor } from "./types"

import script from "./lightbox"

const Lightbox: QuartzComponent = () => {
  return null
}

Lightbox.afterDOMLoaded = script

export default (() => Lightbox) satisfies QuartzComponentConstructor