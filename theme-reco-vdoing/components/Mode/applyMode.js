import modeOptions from './modeOptions'

function render (mode) {
  const rootElement = document.querySelector(':root')
  const options = modeOptions[mode]

  for (const k in options) {
    rootElement.style.setProperty(k, options[k])
  }
  if(mode === 'dark') {
    rootElement.classList.remove('light');
    rootElement.classList.remove('read');
  } else if(mode === 'light') {
    rootElement.classList.remove('dark');
    rootElement.classList.remove('read');
  } else if(mode === 'read') {
    rootElement.classList.remove('dark');
    rootElement.classList.remove('light');
  }
  rootElement.classList.add(mode)
}

/**
 * Sets a color scheme for the website.
 * If browser supports "prefers-color-scheme", 'light' mode will respect the setting for light or dark mode
 * otherwise it will set a dark theme during night time
 */
export default function applyMode (mode) {
  if (mode !== 'light') {
    render(mode)
    return
  }

  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches

  if (isDarkMode) render('dark')
  if (isLightMode) render('light')

  if (!isDarkMode && !isLightMode) {
    console.log('You specified no preference for a color scheme or your browser does not support it. I schedule dark mode during night time.')
    const hour = new Date().getHours()
    if (hour < 6 || hour >= 18) render('dark')
    else render('light')
  }
}
