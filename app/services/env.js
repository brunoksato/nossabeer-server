import path from 'path'

export default function Boot () {
  process.env.NODE_CONFIG_DIR = path.join(__dirname, '../config')
  if (process.env.NODE_ENV !== 'test') {
    console.log('✅  Environment imported with success')
  }
}
