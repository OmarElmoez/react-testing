describe('msw', () => {
  it('should return categories respones', async () => {
    const res = await fetch('/categories');
    const data = await res.json();
    console.log(data);
    expect(data).toHaveLength(3)
  })
})