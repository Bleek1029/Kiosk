/* ---------------------------------------------------------
   OmniKiosk Terminal — behavior
--------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------
     Proximity Diagnostics — mouseenter / mouseleave
     Unlike mouseover/mouseout, these don't bubble from child
     elements, so the card only reacts to the cursor crossing
     its own boundary.
  ------------------------------------------------------- */
  const hoverCard = document.getElementById('card-hover');

  hoverCard.addEventListener('mouseenter', () => {
    hoverCard.classList.add('is-active');
  });

  hoverCard.addEventListener('mouseleave', () => {
    hoverCard.classList.remove('is-active');
  });

  /* -------------------------------------------------------
     Scroll Wheel Stream — wheel
     Reports scroll delta and direction while the pointer is
     over the card.
  ------------------------------------------------------- */
  const scrollCard = document.getElementById('card-scroll');
  const scrollOutput = document.getElementById('scroll-output');

  scrollCard.addEventListener('wheel', (e) => {
    e.preventDefault();
    const direction = e.deltaY > 0 ? 'down' : 'up';
    scrollOutput.textContent = `deltaY: ${e.deltaY.toFixed(0)} | Direction: ${direction}`;
  }, { passive: false });

  /* -------------------------------------------------------
     User Authentication Prompt — input / change
     "input" fires on every keystroke for live feedback;
     "change" fires once the field is committed (loses focus
     with a new value).
  ------------------------------------------------------- */
  const authInput = document.getElementById('auth-input');
  const authStatus = document.getElementById('auth-status');

  authInput.addEventListener('input', () => {
    authStatus.textContent = authInput.value
      ? `Typing… ${authInput.value.length} character(s) entered.`
      : 'Field is idle.';
  });

  authInput.addEventListener('change', () => {
    authStatus.textContent = authInput.value.trim()
      ? `Value committed: "${authInput.value.trim()}"`
      : 'Field is idle.';
  });

  /* -------------------------------------------------------
     Drag & Drop Zone — dragstart / dragover / drop
     The chip is draggable; dropping it on the zone triggers
     the custom action.
  ------------------------------------------------------- */
  const dragChip = document.getElementById('drag-chip');
  const dropZone = document.getElementById('drop-zone');
  const dragDropStatus = document.getElementById('dragdrop-status');

  dragChip.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', 'chip');
    e.dataTransfer.effectAllowed = 'move';
  });

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault(); // required to allow a drop
    dropZone.classList.add('is-dragover');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('is-dragover');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('is-dragover');
    dropZone.classList.add('is-dropped');
    dropZone.textContent = 'Chip received!';
    dragDropStatus.textContent = 'Custom action triggered — drop event handled.';
  });

  /* -------------------------------------------------------
     Runtime Event Controller — pointerdown + removeEventListener
     Counts pointer presses, then permanently detaches the
     listener after a threshold to demonstrate
     removeEventListener.
  ------------------------------------------------------- */
  const runtimeBtn = document.getElementById('runtime-btn');
  const runtimeStatus = document.getElementById('runtime-status');
  const MAX_PRESSES = 5;
  let pressCount = 0;

  function handlePointerDown() {
    pressCount += 1;
    runtimeStatus.textContent = `Presses registered: ${pressCount}`;

    if (pressCount >= MAX_PRESSES) {
      runtimeBtn.removeEventListener('pointerdown', handlePointerDown);
      runtimeBtn.classList.add('is-disabled');
      runtimeBtn.textContent = 'Listener Removed';
      runtimeStatus.textContent = `Presses registered: ${pressCount} — listener detached via removeEventListener().`;
    }
  }

  runtimeBtn.addEventListener('pointerdown', handlePointerDown);

});