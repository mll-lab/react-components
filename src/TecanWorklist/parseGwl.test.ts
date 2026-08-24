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
      { role: 'tubeID', text: '' },
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

  it('marks the barcode of an aspirate without a position', () => {
    const steps = parseGwl('A;FluidX;;96FluidX;;SA00012345;198;;;1');
    const fields = steps[0]?.commands[0]?.fields;

    expect(fields?.[4]).toEqual({ role: 'position', text: '' });
    expect(fields?.[5]).toEqual({ role: 'tubeID', text: 'SA00012345' });
  });

  it('leaves fields plain when a command carries more of them than it serializes', () => {
    const steps = parseGwl('A;MM;;Eppis 32x1.5 ml; Cooled;1;;198;lc;;1');
    const fields = steps[0]?.commands[0]?.fields ?? [];

    expect(fields.filter((field) => field.role !== 'plain')).toEqual([
      { role: 'command', text: 'A' },
    ]);
  });

  it('leaves fields of an unknown command plain', () => {
    const steps = parseGwl('X;21');

    expect(steps[0]?.commands[0]?.fields).toEqual([
      { role: 'command', text: 'X' },
      { role: 'plain', text: '21' },
    ]);
  });

  it('strips the carriage return MLL\\Utils\\Tecan writes', () => {
    const steps = parseGwl('C;Transfer\r\nS;21\r\n');

    expect(steps[0]?.comment).toBe('Transfer');
    expect(steps[0]?.commands[0]?.fields[1]).toEqual({
      role: 'plain',
      text: '21',
    });
  });

  // Fails the day the expected field counts drift from what MLL\Utils\Tecan
  // writes, which the fallback to plain fields would otherwise hide.
  it('highlights a volume in every pipetting command of a worklist', () => {
    const unhighlighted = parseGwl(DILUTION_RUN_WORKLIST)
      .flatMap((step) => step.commands)
      .filter((command) =>
        ['A', 'D', 'R'].includes(command.fields[0]?.text ?? ''),
      )
      .filter(
        (command) => !command.fields.some((field) => field.role === 'volume'),
      )
      .map((command) => command.lineNumber);

    expect(unhighlighted).toEqual([]);
  });
});
