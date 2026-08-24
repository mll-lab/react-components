/** Structurally realistic, with placeholder user, timestamp and run number. */
export const DILUTION_RUN_WORKLIST = `C;Created by mll-lab/php-utils v6.14.0
C;Date: 2000-01-01 00:00:00
C;User: mustermann
C;Protocol name: 2000-01-01_00-00-00_DilutionRun1.gwl
C;Transfer von 990 µl von MM-Rack (A1) nach MM-Rack (Q2)
B;
S;21
A;MM;;Eppis 32x1.5 ml Cooled;1;;198;Dilution_Run_No_Mix;;1
D;MM;;Eppis 32x1.5 ml Cooled;32;;198;Dilution_Run_No_Mix;;1
W;
A;MM;;Eppis 32x1.5 ml Cooled;1;;198;Dilution_Run_No_Mix;;2
D;MM;;Eppis 32x1.5 ml Cooled;32;;198;Dilution_Run_No_Mix;;2
W;
C;Transfer von 110 µl von MM-Rack (B1) nach MM-Rack (Q2)
A;MM;;Eppis 32x1.5 ml Cooled;2;;110;Dilution_Run_Mix_High_Dispense;;32
D;MM;;Eppis 32x1.5 ml Cooled;32;;110;Dilution_Run_Mix_High_Dispense;;32
W;
B;
S;21
C;Verteilen von je 250 µl von MM-Rack (Q2) nach FluidX-Rack (A1, B1, C1, D1)
R;MM;;Eppis 32x1.5 ml Cooled;32;32;FluidX;;96FluidX;1;4;125;Dilution_Run_No_Mix;6;1;0;
R;MM;;Eppis 32x1.5 ml Cooled;32;32;FluidX;;96FluidX;1;4;125;Dilution_Run_No_Mix;6;1;0;
W;
B;
`;
