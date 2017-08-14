// @flow

// ------------------------------------------------------------
// ------------------ Debounce & Fetch ------------------------
// ------------------------------------------------------------
// Timeouts with debounce! This one took me some time to understand.
// We use timeouts to prevent spamming a server with requests.

// In our example, we would be updating the DOM with the results of an API request.
// We would not want to hit the API every single time the user typed a new letter.
// Instead, we would want to intelligently make the request once the user is
// done typing the word of phrase they are really searching on.
// By tracking the requests through the debounce method shown,
// we can accomplish this.
function debounce (fn: Function, wait: number): Function {
  // Set variables
  let timer
  let lastArgs
  // When given a function and a wait duration, debounce will return an
  // annonymous function that taks a spread of arguments -
  // these args are the ones intended for the function set to param 'fn'
  return function (...args) {
    // set arguments to variable
    lastArgs = args

    // clear the timer if there is an existing instance of the tracked process
    clearTimeout(timer)

    // set the variable 'timer' to track an instance of the function passed to
    // debounce with a timeout duration of 'wait'
    timer = setTimeout(
      () => fn(...lastArgs)
      , wait
    )
  }
}

// Made as a const declaration for use with debounce timeout.
// Now when this is called a timer is set. If another call is made within the
// timeout allotment, it will wipe the previous request, replace it with
// this one and reset the timer.

// This function would be called as, say, the result of an event listener.
const GetDetails = debounce(() => {
  const url = `/get-url`
  const _SetResults = function(x) { return 'Does Something Cool with x' }

  // Fetch is a thing! window.fetch() is baked into most modern browsers
  // and can be added to IE and other archaic trash through webpack/bable
  // transcription! It uses promises and is lovely.
  fetch(url)
    .then(response => response.json())
    .then(_SetResults)
}, 400)

// ------------------------------------------------------------
// ---------------- DOM MANIPULATION FUN FACT -----------------
// ------------------------------------------------------------

// Fun fact, faster than doing node.innerHTML = '' to clear child elements
function RemoveAllChildren (node: ?HTMLElement) {
  if (node != null) {
    while (node.firstChild) {
      node.removeChild(node.firstChild)
    }
  }
}
