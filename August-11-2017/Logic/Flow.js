// @flow
/* global fetch */

// The first declaration tells the file to use flow
// The second declaration tells the file 'fetch' is a known global variable
// This is done for the function fetch which is known in browser windows


// We trigger functions we want for the page when it loads.
// There will also be a script tag linking to this file at
// the bottom of the page these functions are designed for.
window.onload = function () {
  AddListener()
  SetNetworkState()
}

// ------------------------------------------------------------
// ---- A FLOW FUNCTION DECLARATION FROM START TO FINISH ------
// ------------------------------------------------------------

// Looking at our params, element_type is required, the rest are nullable.
// So, we expect a String, Maybe String, Maybe String, and those params
// will definitely result in an HTMLElement.
function HtmlFactory (
  element_type: string
  , text: ?string
  , class_name: ?string): HTMLElement {

  // First we create an HTML element. It uses the required string to
  // generate an HTMLElement. We return this in the final line,
  // so flow is confident this function will behave as expect
  // based on our parameter declaration
  const element = document.createElement(element_type)

  // We check if the conditional params were provided and mutate
  // our HTMLElement if either was
  if (class_name) {
    element.className = class_name
  }
  if (text) {
    const text_node = document.createTextNode(text)
    element.appendChild(text_node)
  }

  // We return the HTMLElement as we promised Flow that we would
  return element
}

// ------------------------------------------------------------
// -------------- TYPE DECLARATIONS & OBJECTS -----------------
// ------------------------------------------------------------

// Acts as the 'Single Source of Truth' for our decisions throughout the file
const state = {
  name: ''
  , username: ''
  , results: null
}

// Here is what state looks like:
type State = {
   name: string // Always a String
, username: string // Always a String
, results: ?Array<*> //Nullable: Array of anything
}

// ------------------------------------------------------------
// --------- FLOW TYPE CHANGES & EXCEPTIONS -------------------
// ------------------------------------------------------------

function SetNetworkState () {
  // Get page form - document.forms will return each form on the page
  // In this example, the page has 1 form and we index it. Following that,
  // we acces it's property of .elements so we can search the form contents
  const main_form = document.forms[0].elements

  // $FlowFixMe - [ Add comment as to why flow is being ignored ]
  const network_el: HTMLInputElement = main_form.namedItem('username')
  // DESCRIPTION OF THE DECLARATION ABOVE:
  // We use the function .namedItem to search for the form element
  // that we are using to set our state. We are also explicitly
  // declaring that this process will return an HTMLInputElement.

  // The way Flow is written, it believe namedItem should return an HTMLElement
  // As a result, we use the notation $FlowFixMe to force Flow to ignore
  // The next line. This is the command baked into flow. We believe it is
  // best practice to alias $FlowForce to denote intentional & permanent forces
  // while using $FlowFixMe to denote ones that should eventually be fixed.

  // Note: $FlowFixMe is cool and if it is no longer overriding anything,
  // your linter will yell at you to remove it because it is unused.
  // ---------------------------------------------------------------------------

  // If calling .value on the element declared above results in something,
  // update state.username with value.
  if (network_el.value) { state.username = network_el.value }
}

// This is our event listener for the page. In a complete version of this system,
// any change in state also correspond with a specific action or DOM mutation.
// Here, we'll target a list (ul) header and tell it to do this when someone
// clicks anywhere in it's domain:
// 1) Look at the target of the click
// 2) If the $target isn't an LI, move up a level to the LI for absolute reference
// 3) Grab the username nested in the LI element and update state with the value
function AddListener () {
  const $list = GetList()
  if ($list) {
    $list.addEventListener('click', function (event: Event) {
      let $target = event.target

      // If target of event is not the LI itself, we reset $target to be the LI
      // We have to confirm the instance of the $target because .parentNode
      // may only be called on an HTMLElement, and an event target can be
      // things other than an HTMLElement.
      if ($target.tagName !== 'li' && $target instanceof HTMLElement) {
        $target = $target.parentNode
      }

      // We're forced to verify what $target is yet again because we may have
      // mutated it in the logic condition set forth above. In short, we're
      // verifying the return of .parentNode is an HTMLElement because it needs
      // to be in order for .getElementsByClassName to be called on it.
      if ($target != null && $target instanceof HTMLElement) {
        const username = $target.getElementsByClassName('account-username')[0].innerHTML
        state.account = username
      }
    })
  }
}

// This can always fail if the element doesn't exist in the DOM,
// hence the maybe type
function GetList (): ?HTMLElement {
  return document.getElementById('my-list')
}
