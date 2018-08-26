const z80 = {
    //Time clock: Z80 chip holds two types of clock (m and t)
    _clock: {m: 0, t: 0},

    //Register set
    _r: {
        a: 0, b: 0, c: 0, d: 0, e: 0, h: 0, l: 0, f: 0, //8-bit register
        pc: 0, sp: 0, //16-bit registers
        m: 0, t: 0  //Clock for the last instruction
    },

    ADDr_e: () => {
        z80._r.a += z80._r.e  //Perform Addition
        z80._r.f = 0 //Clear flags

        if(!(z80._r.a & 255)) z80._r.f |= 0x80 //Check for zero
        if(z80._r.a > 255) z80._r.f |= 0x10 //Check for carry

        z80._r.a &= 255 //Mask to 8-bits
        z80._r.m = 1
        z80._r.t = 4 //1 M-time taken
    },

    CPr_b: () => {
        const i = z80._r.a                          //Temp copy of A
        i -= z80._r.b                               //Subtract B
        z80._r.f |= 0x40                            //Set subtraction flag
        if(!(i & 255)) z80._r.f |= 0x80             //Check for zero
        if(i < 0) Z80._r.f |= 0x10;                 // Check for underflow
        Z80._r.m = 1; Z80._r.t = 4;                 // 1 M-time taken
    },

    NOP: () => {
        z80._r.m = 1
        z80._r.t = 4 //1 M-time taken
    }

}