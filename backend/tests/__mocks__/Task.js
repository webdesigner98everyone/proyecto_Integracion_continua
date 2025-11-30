export default {
  findAll: jest.fn(),

  create: jest.fn(),

  update: jest.fn(),

  destroy: jest.fn(),

  findByPk: jest.fn().mockResolvedValue({
    id: 1,
    title: "Mocked Task",
    completed: false,
    update: jest.fn().mockResolvedValue(true),
    destroy: jest.fn().mockResolvedValue(true),
  }),
};
