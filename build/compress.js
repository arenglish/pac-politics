const brotli = require('brotli')
const fs = require('fs')

const brotliSettings = {
    extension: 'br',
    skipLarger: true,
    mode: 1, // 0 = generic, 1 = text, 2 = font (WOFF2)
    quality: 10, // 0 - 11,
    lgwin: 12 // default
}

const builds = [
    'pac-politics',
    'portfolio'
]

builds.forEach(build => {
    const path = `dist/${build}`
    if (fs.existsSync(path)) {
        console.log(`compressing ${build}`)
        fs.readdirSync(path).forEach(file => {
            if (file.endsWith('.js') || file.endsWith('.scss') || file.endsWith('.html')) {
                const result = brotli.compress(fs.readFileSync(`${path}/${file}`), brotliSettings)
                fs.writeFileSync(`${path}/${file}.br`, result)
            }
        })
    }

})
