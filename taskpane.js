function App() {
  return React.createElement('h1', null, 'Hello World');
}

Office.onReady(function() {
  ReactDOM.render(React.createElement(App), document.getElementById('root'));
});
