import script from "./scripts/lightbox"

import { QuartzComponent, QuartzComponentConstructor } from "./types"

const Lightbox: QuartzComponent = () => {
  return null
}

Lightbox.afterDOMLoaded = script

export default (() => Lightbox) satisfies QuartzComponentConstructor