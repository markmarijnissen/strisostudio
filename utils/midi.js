import JZZ from "jzz";

const INPUT_MAP = {};
const OUTPUT_MAP = {};

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const getInfo = async () => {
    let deviceCount = 0, i = 0, info = null;
    while (deviceCount === 0 && i < 100) {
        info = await JZZ().refresh().info();
        i++;
        deviceCount = info.inputs.length + info.outputs.length;
        if (deviceCount === 0) await wait(100);
    };
    return info;
}

export const getInputs = async () => {
    return (await getInfo()).inputs;
}

export const getOutputs = async () => {
    return (await getInfo()).outputs;
}

export const getInput = async (id, name) => {
    if (INPUT_MAP[id]) {
        console.log('disconnect input', id);
        INPUT_MAP[id].disconnect();
        INPUT_MAP[id].close();
        delete INPUT_MAP[id];
    }
    if (name) {
        INPUT_MAP[id] = await JZZ().openMidiIn(name);
        return INPUT_MAP[id];
    }
    return null;
}

export const getOutput = async (id, name) => {
    if (OUTPUT_MAP[id]) {
        OUTPUT_MAP[id].disconnect();
        OUTPUT_MAP[id].close();
        delete OUTPUT_MAP[id];
    }
    if (name) {
        OUTPUT_MAP[id] = await JZZ().openMidiOut(name);
        return OUTPUT_MAP[id];
    }
    return null;
}

export const kk = (mm,ll) => (mm << 7) + ll;
export const ll = kk => kk & 0x7F;
export const mm = kk => kk >> 7;
export const scale = (val, a = -1, b = 1, x = 0, y = 127) => {
    return Math.max(x, Math.min((val - a) / (b - a) * (y - x) + x, y))
}

export default { getInputs, getOutputs, getInput, getOutput };
