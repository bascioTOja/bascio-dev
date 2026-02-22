/**
 * Suppresses a known Nuxt DevTools internal Vue warning:
 * "Extraneous non-props attributes (style) were passed to component but could not be
 * automatically inherited because component renders fragment or text or teleport root nodes."
 *
 * This warning is caused by a fragment root inside the DevTools VueElement custom element
 * (identified by props: mouse, hasParent, matched). It is a bug in Nuxt DevTools itself
 * and does not affect application functionality.
 *
 * Can be removed when the upstream issue is fixed:
 * https://github.com/nuxt/devtools/issues
 */
export default defineNuxtPlugin((nuxtApp) => {
  const originalWarnHandler = nuxtApp.vueApp.config.warnHandler

  nuxtApp.vueApp.config.warnHandler = (msg, instance, trace) => {
    // Suppress only the specific DevTools VueElement fragment warning
    if (
      msg.includes('Extraneous non-props attributes') &&
      msg.includes('style') &&
      trace.includes('VueElement')
    ) {
      return
    }

    // Forward all other warnings to the original handler (or default Vue output)
    if (originalWarnHandler) {
      originalWarnHandler(msg, instance, trace)
    } else {
      console.warn(`[Vue warn]: ${msg}${trace}`)
    }
  }
})

