export function shuffle(array: string[]) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

export function convert(string: string) {
    string = string.replace(/(&quot;)/g, "\"")
    return string.replace(/&#(?:x([\da-f]+)|(\d+));/ig, function (_, hex, dec) {
        return String.fromCharCode(dec || +('0x' + hex))
    })
}

export function removeDuplicates(arr: string[]) {
    return arr.filter((item,
                       index) => arr.indexOf(item) === index);
}