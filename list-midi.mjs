import glob from "glob";
import fs from "fs/promises";

glob("static/midi/**/*.mid", async (err, files) => {
    const result = {};
    const list = files.map(i => i.replace("static/midi/", "").replace("_symbol_key.mid", "").substr(2));
    list.forEach(file => {
        const [artist,song,section] = file.replace(/-/g, ' ').split("/");
        if (!result[artist]) result[artist] = {};
        if (!result[artist][song]) result[artist][song] = [];
        result[artist][song].push(section);
    })
    await fs.writeFile("assets/songs.json", JSON.stringify(result));
    await fs.writeFile("assets/songlist.txt", list.join("\n"));
    console.log(list.length);
})