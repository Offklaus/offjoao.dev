/**
 * Palavra recortada de papel (letras de revista).
 * jag: borda rasgada 1–3 · tilt: inclinação 1–3 · font: anton | serif | brico
 * paper: white | ink | news · size: font-size CSS (ex.: "clamp(32px, 4vw, 60px)")
 */
export default function Cut({ children, jag = 1, tilt = 1, font = 'anton', paper = 'white', size }) {
  return (
    <span
      className={`cut j${jag} r${tilt} f-${font} p-${paper}`}
      style={size ? { '--cut-size': size } : undefined}
    >
      <span>{children}</span>
    </span>
  )
}
