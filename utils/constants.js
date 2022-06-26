// MIDI Status bytes
export const MIDI_NOTE_OFF = 0x80;
export const MIDI_NOTE_ON = 0x90;
export const MIDI_POLY_PRESSURE = 0xa0;
export const MIDI_CONTROL_CHANGE = 0xb0;
export const MIDI_PROGRAM_CHANGE = 0xc0;
export const MIDI_CHANNEL_PRESSURE = 0xd0;
export const MIDI_PITCH_BEND = 0xe0;
export const MIDI_SYSEX_START = 0xf0;
export const MIDI_MTC = 0xf1;
export const MIDI_SONG_POSITION = 0xf2;
export const MIDI_SONG_SELECT = 0xf3;
export const MIDI_TUNE_REQUEST = 0xf6;
export const MIDI_SYSEX_END = 0xf7;
export const MIDI_RESET = 0xff; // 0xff never used as reset in a MIDIMessage
export const MIDI_META_EVENT = 0xff; //	0xff  is for non MIDI messages

// MIDI Real Time Messages
export const MIDI_TIMING_CLOCK = 0xf8;
export const MIDI_MEASURE_END = 0xf9; // proposed measure end byte
export const MIDI_START = 0xfa;
export const MIDI_CONTINUE = 0xfb;
export const MIDI_STOP = 0xfc;
export const MIDI_ACTIVE_SENSE = 0xfe;

// Controller Numbers
export const MIDI_C_LSB = 0x20; // add this to a non-switch controller to access the LSB.
export const MIDI_C_GM_BANK = 0x00; // general midi bank select
export const MIDI_C_MODULATION = 0x01; // modulation
export const MIDI_C_BREATH = 0x02; // breath controller
export const MIDI_C_FOOT = 0x04; // foot controller
export const MIDI_C_PORTA_TIME = 0x05; // portamento time
export const MIDI_C_DATA_ENTRY = 0x06; // data entry value
export const MIDI_C_MAIN_VOLUME = 0x07; // main volume control
export const MIDI_C_BALANCE = 0x08; // balance control
export const MIDI_C_PAN = 0x0a; // panpot stereo control
export const MIDI_C_EXPRESSION = 0x0b; // expression control
export const MIDI_C_GENERAL_1 = 0x10; // general purpose controller 1
export const MIDI_C_GENERAL_2 = 0x11; // general purpose controller 2
export const MIDI_C_GENERAL_3 = 0x12; // general purpose controller 3
export const MIDI_C_GENERAL_4 = 0x13; // general purpose controller 4
export const MIDI_C_DAMPER = 0x40; // hold pedal (sustain)
export const MIDI_C_PORTA = 0x41; // portamento switch
export const MIDI_C_SOSTENUTO = 0x42; // sostenuto switch
export const MIDI_C_SOFT_PEDAL = 0x43; // soft pedal
export const MIDI_C_HOLD_2 = 0x45; // hold pedal 2
export const MIDI_C_MPE_AFTERTOUCH = 0x46; // MPE aftertouch
export const MIDI_C_TIMBRE = 0x4a; // timbre
export const MIDI_C_GENERAL_5 = 0x50; // general purpose controller 5
export const MIDI_C_GENERAL_6 = 0x51; // general purpose controller 6
export const MIDI_C_GENERAL_7 = 0x52; // general purpose controller 7
export const MIDI_C_GENERAL_8 = 0x53; // general purpose controller 8
export const MIDI_C_EFFECT_DEPTH = 0x5b; // external effects depth
export const MIDI_C_TREMELO_DEPTH = 0x5c; // tremelo depth
export const MIDI_C_CHORUS_DEPTH = 0x5d; // chorus depth
export const MIDI_C_CELESTE_DEPTH = 0x5e; // celeste (detune) depth
export const MIDI_C_PHASER_DEPTH = 0x5f; // phaser effect depth 
export const MIDI_C_DATA_INC = 0x60; // increment data value
export const MIDI_C_DATA_DEC = 0x61; // decrement data value
export const MIDI_C_NONRPN_LSB = 0x62; // non registered parameter LSB
export const MIDI_C_NONRPN_MSB = 0x63; // non registered parameter MSB
export const MIDI_C_RPN_LSB = 0x64; // registered parameter LSB
export const MIDI_C_RPN_MSB = 0x65; // registered parameter MSB
export const MIDI_C_RESET = 0x79; // reset all controllers
export const MIDI_C_LOCAL = 0x7a; // local control on/off
export const MIDI_C_ALL_NOTES_OFF = 0x7b; // all notes off
export const MIDI_C_OMNI_OFF = 0x7c; // omni off all notes off
export const MIDI_C_OMNI_ON = 0x7d; // omni on all notes off
export const MIDI_C_MONO = 0x7e; // mono on all notes off
export const MIDI_C_POLY = 0x7f; // poly on all notes off

// Custom Striso events
export const STRISO_MOVE = MIDI_CONTROL_CHANGE;
export const STRISO_ON = MIDI_NOTE_ON;
export const STRISO_OFF = MIDI_NOTE_OFF;
export const STRISO_MOTION = MIDI_CHANNEL_PRESSURE;
export const STRISO_SET_VELOCITY = MIDI_C_MAIN_VOLUME; // set velocity for all buttons as the web app does not support pressure/velocity
export const STRISO_CONTROLLER = 100;

export const STRISO_GLISSANDO = 1;
export const STRISO_UP = 2;
export const STRISO_DOWN = 3;
export const STRISO_OPTIONS = 4;