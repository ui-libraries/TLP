let w = window.innerWidth
let h = window.innerHeight
let gap = 100

// reload canvas on window resize
$(window).resize(function () {
  location.reload()
})

// create a wrapper around native canvas element (with id="canvas")
let canvas = new fabric.Canvas('canvas')
canvas.setHeight(h)
canvas.setWidth(w)
canvas.setBackgroundColor('rgba(0, 0, 0, 0.0)', canvas.renderAll.bind(canvas))
canvas.setZoom(1.1)

fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center'

// builds a circle
function makeCircle (left, top, line1, line2, line3, line4) {
  let c = new fabric.Circle({
    left: left,
    top: top,
    strokeWidth: 4,
    radius: 12,
    fill: '#fff',
    stroke: '#666'
  })

  c.hasControls = c.hasBorders = false

  c.line1 = line1
  c.line2 = line2
  c.line3 = line3
  c.line4 = line4

  return c
}

// builds a line
function makeLine (coords, color) {
  return new fabric.Line(coords, {
    fill: color,
    stroke: color,
    strokeWidth: 15,
    selectable: false
  })
}

// x1, etc are increments, not hard pixel values
function lineCoords (x1, y1, x2, y2) {
  let coords = []
  coords.push(x1 * gap, y1 * gap, x2 * gap, y2 * gap)

  return coords
}

let line = makeLine( lineCoords(1, 1, 5, 1), 'red'),
  line2 = makeLine( lineCoords(1, 2, 2, 2), 'blue'),
  line3 = makeLine( lineCoords(1, 1, 1, 2), 'black')

canvas.add(line, line2, line3)

line2.label = "2.265"

console.log(canvas.toObject())

canvas.add(
  makeCircle(line.get('x1'), line.get('y1'), null, line, line3),
  makeCircle(line.get('x2'), line.get('y2'), line),
  makeCircle(line2.get('x2'), line2.get('y2'), line2),
  makeCircle(line3.get('x2'), line3.get('y2'), line3, line2)
)

canvas.on('object:moving', function (e) {
  var p = e.target
  p.line1 && p.line1.set({ 'x2': p.left, 'y2': p.top })
  p.line2 && p.line2.set({ 'x1': p.left, 'y1': p.top })
  p.line3 && p.line3.set({ 'x1': p.left, 'y1': p.top })
  p.line4 && p.line4.set({ 'x1': p.left, 'y1': p.top })
  canvas.renderAll()
})
