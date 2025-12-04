// scripts/screenshot.cjs (detecta title + remove headers)
const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms))
}

async function run() {
  const url =
    process.argv[2] ||
    'https://dashboard-boilerplate-seven.vercel.app/dashboard'
  const outPath =
    process.argv[3] ||
    path.join(process.cwd(), 'public/images/dashboard-thumb-4x5.png')
  fs.mkdirSync(path.dirname(outPath), { recursive: true })

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  try {
    const page = await browser.newPage()
    const vw = 1600,
      vh = 2000
    await page.setViewport({ width: vw, height: vh, deviceScaleFactor: 1.5 })

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 })
    await sleep(600)

    // hides common fixed headers that block the view
    await page.evaluate(() => {
      const hide = [
        'header',
        '.topbar',
        '.navbar',
        '.fixed-header',
        '.ant-layout-header',
      ]
      hide.forEach((s) =>
        document
          .querySelectorAll(s)
          .forEach((el) => (el.style.display = 'none')),
      )
    })

    // try to find title element
    const titleSelectors = [
      '.dashboard-title',
      '.page-title',
      '.header-title',
      'h1',
      'h2',
      '.title',
    ]
    let titleBox = null
    for (const sel of titleSelectors) {
      const el = await page.$(sel)
      if (el) {
        const box = await el.boundingBox()
        if (box && box.width > 20 && box.height > 8) {
          titleBox = box
          break
        }
      }
    }

    // try to find main content container
    const mainSelectors = [
      'main',
      '#root',
      '#app',
      '.app',
      '.dashboard',
      '.container',
      '.content',
      '.main-content',
    ]
    let mainBox = null
    for (const sel of mainSelectors) {
      const el = await page.$(sel)
      if (el) {
        const box = await el.boundingBox()
        if (box && box.width > 50 && box.height > 50) {
          mainBox = box
          break
        }
      }
    }

    const pad = 20
    const targetW = 1200,
      targetH = 1500
    let clip = null

    if (titleBox && mainBox) {
      const topY = Math.max(0, Math.floor(titleBox.y - pad))
      const centerX = Math.max(
        0,
        Math.floor(mainBox.x + (mainBox.width - targetW) / 2),
      )
      const x = Math.max(0, centerX)
      const y = topY
      const width = Math.min(targetW, vw - x)
      const height = Math.min(targetH, vh - y)
      clip = { x, y, width, height }
      console.log('Clip: including title + main', clip)
    } else if (mainBox) {
      const x = Math.max(
        0,
        Math.floor(mainBox.x + (mainBox.width - targetW) / 2),
      )
      const y = Math.max(0, Math.floor(mainBox.y))
      clip = {
        x: Math.max(0, x),
        y: Math.max(0, y),
        width: Math.min(targetW, vw - x),
        height: Math.min(targetH, vh - y),
      }
      console.log('Clip based on mainBox', clip)
    } else {
      clip = {
        x: Math.max(0, Math.floor((vw - targetW) / 2)),
        y: Math.max(0, Math.floor((vh - targetH) / 2)),
        width: Math.min(targetW, vw),
        height: Math.min(targetH, vh),
      }
      console.log('Fallback central clip', clip)
    }

    await page.screenshot({
      path: outPath,
      type: 'png',
      clip,
      fullPage: false,
    })
    console.log('Screenshot salva em:', outPath)
  } catch (err) {
    console.error('Erro no screenshot:', err)
    process.exitCode = 1
  } finally {
    await browser.close()
  }
}

run()
