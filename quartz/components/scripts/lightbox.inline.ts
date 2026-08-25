const script = `
const setupLightbox = () => {
  const images = document.querySelectorAll(".page article img")

  images.forEach((img) => {
    if (img.dataset.lightboxEnabled) return

    img.dataset.lightboxEnabled = "true"
    img.classList.add("lightbox-image")

    img.addEventListener("click", () => {
      const overlay = document.createElement("div")
      overlay.className = "image-lightbox-overlay"

      const enlarged = document.createElement("img")
      enlarged.src = img.src
      enlarged.alt = img.alt
      enlarged.className = "image-lightbox-image"

      overlay.appendChild(enlarged)
      document.body.appendChild(overlay)

      document.body.style.overflow = "hidden"

      const close = () => {
        overlay.remove()
        document.body.style.overflow = ""
      }

      overlay.addEventListener("click", close)

      document.addEventListener(
        "keydown",
        (event) => {
          if (event.key === "Escape") {
            close()
          }
        },
        { once: true },
      )
    })
  })
}

document.addEventListener("nav", setupLightbox)
setupLightbox()
`

export default script