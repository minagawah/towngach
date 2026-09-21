const { mizuno, kigaku } = require('../index');
const {
  get_solar_term_start,
} = require('../../../solar_term');

const date_before = boundary =>
  new Date(boundary.date.timestamp - 1);
describe('Mizuno-style Kigaku methods', () => {
  it('keeps Mizuno separate from modern Kigaku', () => {
    expect(mizuno.calculate_mizuno_daily).toBeDefined();
    expect(kigaku.calculate_kigaku_daily).toBeDefined();
    expect(mizuno.calculate_mizuno_daily).not.toBe(
      kigaku.calculate_kigaku_daily
    );
  });

  it('switches daily mode at Winter Solstice exactly', () => {
    const boundary = get_solar_term_start('dong_zhi', 2026);
    const before = mizuno.calculate_mizuno_daily(
      date_before(boundary)
    );
    const at = mizuno.calculate_mizuno_daily(boundary.date);

    expect(before.solstice).toBe('xia_zhi');
    expect(at.solstice).toBe('dong_zhi');
    expect(at.solstice_boundary.timestamp).toBe(
      boundary.date.timestamp
    );
  });

  it('switches daily mode at Summer Solstice exactly', () => {
    const boundary = get_solar_term_start('xia_zhi', 2026);
    const before = mizuno.calculate_mizuno_daily(
      date_before(boundary)
    );
    const at = mizuno.calculate_mizuno_daily(boundary.date);

    expect(before.mode).toBe('yang');
    expect(at.mode).toBe('yin');
  });

  it('uses all twelve traditional double-hour indices', () => {
    const date = new Date(Date.UTC(2026, 5, 10, 0));
    const indices = [];

    for (let hour = 0; hour < 24; hour += 2) {
      date.setUTCHours(hour);
      indices.push(
        mizuno.calculate_mizuno_hourly(date).time_index
      );
    }

    expect(indices).toEqual([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    ]);
  });

  it('uses seasonal groups for hourly starting stars', () => {
    const boundary = get_solar_term_start('li_chun', 2026);
    const result = mizuno.calculate_mizuno_hourly(
      boundary.date
    );

    expect(result.solar_term_group).toBe('group_b');
    expect(result.base_star).toBe(7);
    expect(result.method).toBe('mizuno_hourly');
  });
});
