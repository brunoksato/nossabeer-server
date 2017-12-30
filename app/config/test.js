module.exports = {
  PG_URI: process.env.PG_URI || 'postgres://localhost:5432/nossabeer',
  http: {
    port: 8080
  },
  keys: {
    bearers: {
      api: 'o>TB5#;Lh$?paC9sA^:-;m3_RjHqJAecGSwa/DtYcPB#YFlv?RN!1MDOwhVa'
    }
  },
  baseApi: 'api',
  database: 'nossabeer',
  host: 'localhost',
  dialect: 'postgres'
}
