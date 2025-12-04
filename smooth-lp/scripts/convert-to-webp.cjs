// scripts/convert-to-webp.js
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

async function convert() {
  const inPath = path.join(
    process.cwd(),
    'public/images/dashboard-thumb-4x5.png',
  )
  const outDir = path.join(process.cwd(), 'public/images')
  fs.mkdirSync(outDir, { recursive: true })

  if (!fs.existsSync(inPath)) {
    console.error('Arquivo de entrada não existe:', inPath)
    process.exit(1)
  }

  // principal 4:5 (1200x1500)
  const outWebp = path.join(outDir, 'dashboard-thumb-4x5.webp')
  await sharp(inPath)
    .resize(1200, 1500, { fit: 'cover' })
    .webp({ quality: 80 })
    .toFile(outWebp)

  // variantes (opcionais) - 16:9 widescreen e 1:1
  await sharp(inPath)
    .resize(1600, 900, { fit: 'cover' })
    .webp({ quality: 78 })
    .toFile(path.join(outDir, 'dashboard-thumb-16x9.webp'))

  await sharp(inPath)
    .resize(800, 800, { fit: 'cover' })
    .webp({ quality: 78 })
    .toFile(path.join(outDir, 'dashboard-thumb-1x1.webp'))

  console.log('Conversão para webp concluída. Arquivos gerados em', outDir)
}

convert().catch((err) => {
  console.error(err)
  process.exit(1)
})
