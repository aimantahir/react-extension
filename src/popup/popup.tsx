import React from 'react' //React is the core library for building user interfaces,
import ReactDOM from 'react-dom' // ReactDOM is the library responsible for rendering React components in the browser.

const test = <p>Hello World!</p> //The next line creates a variable named test and assigns it a JSX expression. JSX is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript. In this case, the JSX expression represents a <p> element containing the text "Hello World!".
const root = document.createElement('div') // The following line creates a new HTML div element using the document.createElement method. This element will serve as the root container for the React component.
document.body.appendChild(root)//The next line appends the root element to the document.body, which means it will be added as a child element of the <body> tag in the HTML document.


ReactDOM.render(test,root) //Finally, the ReactDOM.render function is called to render the test JSX expression inside the root element. This function takes two arguments: the JSX expression to be rendered (test) and the DOM element where it should be rendered (root).
