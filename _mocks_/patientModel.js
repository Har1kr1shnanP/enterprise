const mockPatientModel = {
    find: jest.fn().mockResolvedValue([]), // Mocks find method to return an empty array by default
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    save: jest.fn().mockResolvedValue({ _id: "12345", name: "John Doe", age: 30, gender: "Male" }),
    create: jest.fn(),
    deleteOne: jest.fn(),
    updateOne: jest.fn(),
  };


  export default mockPatientModel;
  