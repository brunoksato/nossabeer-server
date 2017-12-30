import path from 'path'

export default function Boot () {
  process.env.NODE_CONFIG_DIR = path.join(__dirname, '../config')
  console.log('✅  Environment imported with success')
}
