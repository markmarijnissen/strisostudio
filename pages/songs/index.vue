<template>
    <div>
        <p class="pad">
            Search 10.000+ songs (<a target="_blank" href="https://github.com/wayne391/Lead-Sheet-Dataset">source</a>)
        </p>
        <div class="pure-g">
            <div class="pure-u-20-24">
                <v-select :options="songlist" 
                            v-model="song"
                            label="label" 
                            :dropdown-should-open="dropdownShouldOpen" 
                            @option:selected="onSelect"
                        />
            </div>
            <div class="pure-u-4-24">
                <v-select :options="song ? song.sections : []" v-model="section" :clearable="false"/>
            </div>
            <div class="pure-u-20-24">
                <midi-player class="pad midiplayer" :url="url" output="song" :disable-file-input="true" />
            </div>
            <div class="pure-u-4-24">
                 <a class="pad pure-button pure-button-primary" :href="hookTheoryUrl" v-show="!!url" target="_blank">View TheoryTab</a>
            </div>
        </div>
               
        <striso-board input="song" class="white simple strisoboard" />
    </div>
</template>
<style scoped>
.strisoboard {
    max-height: calc(100vh - 200px);
}
.pad {
    margin: 10px 0 10px 10px;
}
.midiplayer {
    /* min-height: 55px; */
}
</style>
<script>
import songs from "../../assets/songs.json";
import vSelect from "vue-select";
import 'vue-select/dist/vue-select.css';

const cap = (txt = "") => txt.split(' ').map(word => word.length > 0 ? word[0].toUpperCase() + word.slice(1) : '').join(' ');

export default {
    components: {
        'v-select':vSelect
    },
    computed: {
        url() {
            if(this.song && this.section) {
                return `/midi/${this.song.artist[0]}/${this.song.artist.replace(/ /g,'-')}/${this.song.song.replace(/ /g,'-')}/${this.section.replace(/ /g,'-')}_symbol_key.mid`
            }
        },
        hookTheoryUrl(){
            if(this.song) {
                return `https://www.hooktheory.com/theorytab/view/${this.song.artist.replace(/ /g,'-')}/${this.song.song.replace(/ /g,'-').replace(/-+$/,'')}`
            }
        },
        songlist() {
            const list = [];
            Object.entries(this.songs).forEach(([artist, songs]) => {
                Object.entries(songs).forEach(([ song, sections ]) => {
                    list.push({
                        artist,
                        song,
                        label: `${cap(artist)} - ${cap(song)}`,
                        sections
                    });
                });
            });
            return list;
        }
    }, 
    data() {
        return {
            songs,
            song: null,
            section: null
        }
    },
    methods: {
        dropdownShouldOpen(select){
            return select.search.length >= 3;
        },
        onSelect(){
            if(this.song && this.song.sections.indexOf(this.section) < 0) {
                this.section = this.song.sections[0];
            }
            if(!this.song) this.section = null;
        }
    }
}
</script>