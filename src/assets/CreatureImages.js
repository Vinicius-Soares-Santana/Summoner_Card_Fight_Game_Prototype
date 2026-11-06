const creatureImages = import.meta.glob(
    ['./Images/Vertical/*.png', './Images/Horizontal/*.png'],
    { eager: true, query: '?url', import: 'default' }
);

export function getCreatureImage(name, orientation = 'Vertical') {
    return creatureImages[`./Images/${orientation}/${name}.png`];
}