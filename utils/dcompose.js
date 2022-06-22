const DCOMPOSE_SCALE_FACTOR = 2.268;
const START_OCTAVE = 2;

const OCTAVE_LAYOUT = {
  // x  (circle of fith):  y (semitone)
    "Gb": 6,
    "Db": 1,
    "Ab": 8,
    "Eb": 3,
    "Bb": 10,
    "F": 5,
    "C": 0,
    "G": 7,
    "D": 2,
    "A": 9,
    "E": 4,
    "B": 11,
    "F#": 6,
    "C#": 1,
    "G#": 8,
    "D#": 3,
    "A#": 10,
}

const createOctave = (currentOctave = START_OCTAVE, startOctave = START_OCTAVE) => {
    const dx = 1;
    const dy = (DCOMPOSE_SCALE_FACTOR * dx) / 6;
    return Object.keys(OCTAVE_LAYOUT).map((noteLetter,x) => {
        const note = `${noteLetter}${currentOctave}`;
        return {
            note,
            noteLetter,
            octave: currentOctave,
            x: x * dx,
            y: (48 - (OCTAVE_LAYOUT[noteLetter] + (currentOctave - startOctave) * 12)) * dy,
            color: noteLetter.length > 1 ? "black" : "white"
        }
    });
}

export const createDCompose = (octave = START_OCTAVE) => {
    return [
        createOctave(octave, octave).filter(i => OCTAVE_LAYOUT[i.noteLetter] >= 5),
        createOctave(octave + 1, octave),
        createOctave(octave + 2, octave),
        createOctave(octave + 3, octave)
    ].flat();
}

export default createDCompose;
