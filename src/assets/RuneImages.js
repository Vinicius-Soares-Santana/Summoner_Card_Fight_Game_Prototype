const runeImages = import.meta.glob('./Images/Runes/*.png', {
    eager: true,
    query: '?url',
    import: 'default',
});

export function getRuneImage(name) {
    return runeImages[`./Images/Runes/${name}.png`];
}