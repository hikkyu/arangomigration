module.exports = function createAnalyzer(analyzer, db) {
  const { name, ...restOfAnalyzer } = analyzer

  return db.createAnalyzer(name, analyzer).then(() => {
    console.info(`    ✅ Analyzer ${analyzer.name.cyan} created`)
  })
}
