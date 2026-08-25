import { QuartzComponent, QuartzComponentConstructor } from "./types"

import script from "./scripts/lightbox"

const Lightbox: QuartzComponent = () => {
  return null
}

Lightbox.afterDOMLoaded = script

export default (() => Lightbox) satisfies QuartzComponentConstructor