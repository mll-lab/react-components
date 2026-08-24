import { DILUTION_RUN_WORKLIST } from './exampleWorklist';
import { parseGwl } from './parseGwl';

describe('parseGwl', () => {
  it('groups commands under the comment preceding them', () => {
    const steps = parseGwl('C;Transfer\nW;\nB;\nC;Verteilen\nW;');

    expect(steps.map((step) => [step.comment, step.commands.length])).toEqual([
      ['Transfer', 2],
      ['Verteilen', 1],
    ]);
  });

  it('keeps commands preceding the first comment', () => {
    const steps = parseGwl('W;\nC;Transfer');

    expect(steps[0]?.comment).toBeNull();
    expect(steps[0]?.commands).toHaveLength(1);
  });

  it('numbers lines as they appear in the source, blank lines skipped', () => {
    const steps = parseGwl('C;Transfer\n\nW;');

    expect(steps[0]?.lineNumber).toBe(1);
    expect(steps[0]?.commands[0]?.lineNumber).toBe(3);
  });

  it('keeps separators inside a comment', () => {
    expect(parseGwl('C;Transfer;von;990 µl')[0]?.comment).toBe(
      'Transfer;von;990 µl',
    );
  });

  it('marks volume and position of an aspirate command', () => {
    const steps = parseGwl(
      'A;MM;;Eppis 32x1.5 ml Cooled;1;;198;Dilution_Run_No_Mix;;1',
    );

    expect(steps[0]?.commands[0]?.fields).toEqual([
      { role: 'command', text: 'A' },
      { role: 'plain', text: 'MM' },
      { role: 'plain', text: '' },
      { role: 'plain', text: 'Eppis 32x1.5 ml Cooled' },
      { role: 'position', text: '1' },
      { role: 'plain', text: '' },
      { role: 'volume', text: '198' },
      { role: 'plain', text: 'Dilution_Run_No_Mix' },
      { role: 'plain', text: '' },
      { role: 'plain', text: '1' },
    ]);
  });

  it('marks source and target positions of a reagent distribution', () => {
    const steps = parseGwl(
      'R;MM;;Eppis 32x1.5 ml Cooled;32;32;FluidX;;96FluidX;1;4;125;Dilution_Run_No_Mix;6;1;0;',
    );
    const fields = steps[0]?.commands[0]?.fields;

    expect(fields?.[4]).toEqual({ role: 'position', text: '32' });
    expect(fields?.[5]).toEqual({ role: 'position', text: '32' });
    expect(fields?.[9]).toEqual({ role: 'position', text: '1' });
    expect(fields?.[10]).toEqual({ role: 'position', text: '4' });
    expect(fields?.[11]).toEqual({ role: 'volume', text: '125' });
  });

  it('leaves commands without volume or position unmarked', () => {
    const steps = parseGwl('S;21');

    expect(steps[0]?.commands[0]?.fields).toEqual([
      { role: 'command', text: 'S' },
      { role: 'plain', text: '21' },
    ]);
  });

  it('reads a full worklist as one step per comment', () => {
    const steps = parseGwl(DILUTION_RUN_WORKLIST);

    expect(steps.map((step) => step.comment)).toEqual([
      'Created by mll-lab/php-utils v6.14.0',
      'Date: 2000-01-01 00:00:00',
      'User: mustermann',
      'Protocol name: 2000-01-01_00-00-00_DilutionRun1.gwl',
      'Transfer von 990 µl von MM-Rack (A1) nach MM-Rack (Q2)',
      'Transfer von 110 µl von MM-Rack (B1) nach MM-Rack (Q2)',
      'Verteilen von je 250 µl von MM-Rack (Q2) nach FluidX-Rack (A1, B1, C1, D1)',
    ]);
    expect(steps.map((step) => step.commands.length)).toEqual([
      0, 0, 0, 0, 8, 5, 4,
    ]);
  });
});
