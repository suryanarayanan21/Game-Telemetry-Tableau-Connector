import Connector from '@tableau/taco-toolkit'

let connectorInitialized = false
let pageLoaded = false

const connector = new Connector(() => {
  connectorInitialized = true
  enableButtonWhenReady()
})

function submit() {
  connector.handlerInputs = [
    {
      fetcher: 'MyFetcher',
      parser: 'MyParser',
      data: {
        url: 'https://game-telemetry-default-rtdb.firebaseio.com/telemetry_sodifaposid93roj94ek9923oij.json',
      },
    },
  ]
  connector.submit()
}

function handleSubmit() {
  const button = getSubmitButton()

  button.toggleAttribute('disabled')
  button.innerText = 'Processing...'

  submit()
}

function enableButtonWhenReady() {
  if (connectorInitialized && pageLoaded) {
    const button = getSubmitButton()

    button.innerText = 'Get Telemetry Data!'
    button.removeAttribute('disabled')
    button.addEventListener('click', handleSubmit, { once: true })
  }
}

function getSubmitButton(): HTMLElement {
  const button = document.getElementById('submitButton')
  if (!button) {
    throw new Error('Submit button is not present on the page.')
  }

  return button
}

window.addEventListener('load', function () {
  pageLoaded = true
  enableButtonWhenReady()
})
