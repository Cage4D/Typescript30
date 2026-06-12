const hero = document.querySelector<HTMLElement>('.hero');
const text = hero?.querySelector<HTMLHeadingElement>('h1');

if (!hero || !text) {
  throw new Error('Required elements not found');
}

const walk = 500;

function shadow(this: HTMLElement, e: MouseEvent): void {
  const width = hero!.offsetWidth;
  const height = hero!.offsetHeight;

  let x = e.offsetX;
  let y = e.offsetY;

  const target = e.target as HTMLElement;

  if (this !== target) {
    x += target.offsetLeft;
    y += target.offsetTop;
  }

  const xWalk = Math.round((x / width) * walk - walk / 2);
  const yWalk = Math.round((y / height) * walk - walk / 2);

  text!.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
    ${-xWalk}px ${yWalk}px 0 rgba(0,255,255,0.7),
    ${yWalk}px ${-xWalk}px 0 rgba(0,255,0,0.7),
    ${-yWalk}px ${xWalk}px 0 rgba(0,0,255,0.7)
  `;
}

hero.addEventListener('mousemove', shadow);