const draggableElements = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

draggableElements.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
  });

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
  });
});

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getdragAfterElement(container, e.clientY);
    const draggable = document.querySelector('.dragging'); // Define draggable here
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

function getdragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > (closest ? closest.offset : Number.NEGATIVE_INFINITY)) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, null)?.element; // Use optional chaining to handle null case
}
