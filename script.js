// CACHE 
var nodes = [];
var textNodes = [];
var offset = window.pageYOffset;
var height = window.innerHeight;

// FUNCTION TO SET NEW POSITION
var setParallax = (obj, height, offset) => {
  const axis = obj.node.classList.contains('left') ? 'top' : 'bottom';
  obj.node.style.top = -((offset - obj.pos) * 0.1) + 'px';
};

document.querySelectorAll('.standard img').forEach(node => {
  nodes = [
  ...nodes,
  { node, pos: node.getBoundingClientRect().top }];

});

document.querySelectorAll('.standard-content.left, .standard-content.right').forEach(node => {
  textNodes = [
  ...textNodes,
  node];

});

const inView = el => {
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 100;
  const horInView = rect.left <= windowWidth && rect.left + rect.width >= -300;
  return vertInView && horInView;
};

nodes.forEach(node => {
  setParallax(node, height, offset);
});

textNodes.forEach(node => {
  if (inView(node)) {
    node.classList.add('show');
  } else {
    node.classList.remove('show');
  }
});

window.addEventListener('scroll', () => {
  window.requestAnimationFrame(() => {
    offset = window.pageYOffset;
    height = window.innerHeight;
    nodes.forEach(node => {
      setParallax(node, height, offset);
    });
  });
  textNodes.forEach(node => {
    if (inView(node)) {
      node.classList.add('show');
    } else {
      node.classList.remove('show');
    }
  });
});

document.querySelector('.menu-button').addEventListener('click', () => {
  document.querySelector('.nav').classList.toggle('active');
});