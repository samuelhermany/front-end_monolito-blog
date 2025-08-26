import Drawing from 'dxf-writer'
import { DxfWriter, point3d } from '@tarikjabiri/dxf'

interface Props {
  model: string // Tipo de arquivo
  [key: string]: string
}

export function dXFCreate({ model, ...props }: Props): void {
  const { valueA, valueB, valueC, valueD } = props
  // Cria as versões em número apenas se existirem
  const floatA = valueA ? parseFloat(valueA.replace(',', '.')) : undefined
  const floatB = valueB ? parseFloat(valueB.replace(',', '.')) : undefined
  const floatC = valueC ? parseFloat(valueC.replace(',', '.')) : undefined
  const floatD = valueD ? parseFloat(valueD.replace(',', '.')) : undefined

  let fileType = 'arquivo_modificado'
  fileType = model

  // Serve para todos os aquivos, exceto elipse
  let draw: Drawing | null = null
  let dxfWriter: DxfWriter | null = null // Serve para elipse

  if (fileType !== 'ellipse') {
    draw = new Drawing()
    draw.setUnits('Millimeters')
  } else {
    dxfWriter = new DxfWriter()
    dxfWriter.setUnits(4) // 4 = Millimeters
  }

  switch (fileType) {
    case 'rectangle':
      if (draw && floatA !== undefined && floatB !== undefined) {
        createRectangle(draw, floatA, floatB)
      }
      break
    case 'circle':
      if (draw && floatA !== undefined) {
        createCircle(draw, floatA)
      }
      break
    case 'washer':
      if (draw && floatA !== undefined && floatB !== undefined) {
        createWasher(draw, floatA, floatB)
      }
      break
    case 'trapezoid_4l':
      if (draw && floatA !== undefined && floatB !== undefined && floatC !== undefined) {
        createTrapezoid_4l(draw, floatA, floatB, floatC)
      }
      break
    case 'flange':
      if (draw && floatA !== undefined && floatB !== undefined && floatC !== undefined && floatD !== undefined) {
        createFlange(draw, floatA, floatB, floatC, floatD)
      }
      break
    case 'trapezoid_5l':
      if (draw && floatA !== undefined && floatB !== undefined && floatC !== undefined && floatD !== undefined) {
        createTrapezoid_5l(draw, floatA, floatB, floatC, floatD)
      }
      break
    case 'ellipse':
      if (dxfWriter && floatA !== undefined && floatB !== undefined) {
        createEllipse(dxfWriter, floatA, floatB)
      }
      break
    case 'arc1':
      if (draw && floatA !== undefined && floatB !== undefined) {
        createArc1(draw, floatA, floatB)
      }
      break
  }

  // Verifica se o tipo for nulo será paasado com undefinded
  salvarArquivo(fileType, draw ?? undefined, dxfWriter ?? undefined)
}

/**
 * Salva o arquivo, 2 primeiros parametros (sempre só um é passado)
 */
function salvarArquivo(fileType: string, draw?: Drawing, dxfWriter?: DxfWriter) {
  // Para todos os tipos "toDxfString()" | para elipse "stringify()"
  const content = draw ? draw!.toDxfString() : dxfWriter!.stringify()

  const blob = new Blob([content], { type: 'application/dxf' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileType + '.dxf'
  link.click()

  // Limpa a memória
  setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 100) // espera 100ms antes de revogar
}

/**
 * Cria um retangulo
 */
const createRectangle = (draw: Drawing, valueA: number, valueB: number) => {
  // drawLine(x1, y1, x2, y2): Drawing;
  draw.drawLine(0, 0, valueA, 0)
  draw.drawLine(valueA, 0, valueA, valueB)
  draw.drawLine(valueA, valueB, 0, valueB)
  draw.drawLine(0, valueB, 0, 0)
}

/**
 * Cria um círculo
 */
const createCircle = (draw: Drawing, valueA: number, x: number = 0, y: number = 0) => {
  // drawCircle(x, y, radius): Drawing;
  draw.drawCircle(x, y, valueA / 2)
}

/**
 * Cria uma arruela
 */
const createWasher = (draw: Drawing, valueA: number, valueB: number) => {
  // raio Externo valuA, raio Interno valueB
  createCircle(draw, valueA)
  createCircle(draw, valueB)
}

/**
 * Cria um trapézio de 4 lados
 */
const createTrapezoid_4l = (draw: Drawing, valueA: number, valueB: number, valueC: number) => {
  const larguraBase = valueA
  const altura = valueB
  const larguraTopo = valueC
  //   D---C
  //  /     \
  // A-------B
  draw.drawLine(-larguraBase / 2, 0, larguraBase / 2, 0) //A - B = Largura Base
  draw.drawLine(larguraBase / 2, 0, larguraTopo / 2, altura) // B - C = Aresta Altura
  draw.drawLine(larguraTopo / 2, altura, -larguraTopo / 2, altura) // C - D = Largura Superior
  draw.drawLine(-larguraTopo / 2, altura, -larguraBase / 2, 0) // D - A = Aresta Altura
}

/**
 * Cria um flange com 4 lados iguais
 */
const createFlange = (draw: Drawing, valueA: number, valueB: number, valueC: number, valueD: number) => {
  // A=Diâmetro Externo | B=Diâmetro Médio | C=Diâmetro Interno | D=Diâmetro Furação
  createCircle(draw, valueA)
  createCircle(draw, valueC)
  // Furação = Superior | Direita | Inferior | Esquerda
  createCircle(draw, valueD, 0, valueB / 2)
  createCircle(draw, valueD, valueB / 2, 0)
  createCircle(draw, valueD, 0, -valueB / 2)
  createCircle(draw, valueD, -valueB / 2, 0)
}

/**
 * Cria um trapézio de 5 lados
 */
const createTrapezoid_5l = (draw: Drawing, valueA: number, valueB: number, valueC: number, valueD: number) => {
  //   E---D
  //  /     \
  // F       C
  // |       |
  // A-------B
  // A=Largura Base | B=Altura Total | C=Largura Topo | D=Altura Parcial
  draw.drawLine(-valueA / 2, 0, valueA / 2, 0) //A - B = Largura Base
  draw.drawLine(valueA / 2, 0, valueA / 2, valueD) // B - C = Aresta Altura Parcial
  draw.drawLine(valueA / 2, valueD, valueC / 2, valueB) // C - D = Aresta Altura Total
  draw.drawLine(valueC / 2, valueB, -valueC / 2, valueB) // D - E = Largura Superior
  draw.drawLine(-valueC / 2, valueB, -valueA / 2, valueD) // C - D = Aresta Altura Total
  draw.drawLine(-valueA / 2, valueD, -valueA / 2, 0) // D - A = Aresta Altura Total
}

/**
 * Ciar uma Elipse
 */
const createEllipse = (dxfWriter: DxfWriter, valueA: number, valueB: number) => {
  // Calcula centro e semi-eixos em X | Y
  const halfWidth = valueA / 2
  const halfHeight = valueB / 2

  // addEllipse(center, majorAxisEnd, axisRatio, startParam, endParam)
  dxfWriter.addEllipse(
    point3d(halfWidth, halfHeight, 0),
    point3d(halfWidth, 0, 0), // Vetor do fim do eixo maior (relativo ao centro)
    halfHeight / halfWidth, // razão (axisRatio) = ry / rx
    0, // startParam (0 rad)
    2 * Math.PI // endParam (2π rad = volta completa)
  )
}

/**
 * Cria um semi-círculo
 */
const createArc1 = (draw: Drawing, valueA: number, valueB: number) => {
  const center = 90
  const startAngle = center - valueB / 2
  const endAngle = center + valueB / 2
  // Angulo 0 é na direita indo no sentido anti-horário
  // valueA = diametro | valueB = angulo
  // drawArc( x, y, raio, startAngle, endAngle)
  draw.drawArc(0, 0, valueA / 2, startAngle, endAngle)
  drawLineAngle(draw, startAngle, valueA)
  drawLineAngle(draw, endAngle, valueA)
}

/**
 * Função para os arcos. Cria a linha de x=0 e y=0 até os pontos extremos do arco informado
 */
const drawLineAngle = (draw: Drawing, pointAngle: number, value: number) => {
  const pointAngleRadians = pointAngle * (Math.PI / 180)
  const endX = (value / 2) * Math.cos(pointAngleRadians)
  const endY = (value / 2) * Math.sin(pointAngleRadians)
  // Desenha a linha de (0, 0) até (endX, endY)
  draw.drawLine(0, 0, endX, endY)
}
