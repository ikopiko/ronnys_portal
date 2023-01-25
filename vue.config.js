module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/~ccyvsvam/portal/" : "/",
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
