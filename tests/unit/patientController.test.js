import { 
    addPatient, 
    getAllPatients, 
    getPatientById, 
    deletePatient,
    updatePatient,
    addTestForPatient, 
    getTestsForPatient, 
    getPatientHistory, 
    getCriticalPatients, 
    updatePatientCriticalCondition 
  } from "../../controller/patientController.js";


  import mockPatientModel from "../../_mocks_/patientModel.js";
  import Test from "../../model/testsModel.js";
  import Patient from "../../model/patientModel.js";
  
  jest.mock("../../model/testsModel.js");
  jest.mock("../../model/patientModel.js");
  
  describe("Patient Controller Unit Tests", () => {

    

    it("should retrieve all patients", async () => {
      const patients = [{ name: "Jane Doe", age: 40 }];
      Patient.find.mockResolvedValue(patients);
  
      const req = {};
      const res = { json: jest.fn() };
  
      await getAllPatients(req, res);
  
      expect(res.json).toHaveBeenCalledWith(patients);
    });

    
    it("should retrieve a patient by ID", async () => {
      const patient = { name: "John Doe", age: 30, gender: "Male" };
      Patient.findById.mockResolvedValue(patient);
  
      const req = { params: { id: "12345" } };
      const res = { json: jest.fn() };
  
      await getPatientById(req, res);
  
      expect(res.json).toHaveBeenCalledWith(patient);
    });
  

      it("should delete a patient by ID", async () => {
        const req = {
          params: {
            id: "12345", // ID of the patient to be deleted
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      
        // Mock the delete operation in Mongoose
        Patient.findByIdAndDelete.mockResolvedValue({ 
          _id: "12345", 
          name: "John Doe", 
          age: 30, 
          gender: "Male" 
        });
      
        await deletePatient(req, res);
      
        // Assertions
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          message: "Patient deleted successfully",
          deletedPatient: { 
            _id: "12345", 
            name: "John Doe", 
            age: 30, 
            gender: "Male" 
          },
        });
      });

      describe("updatePatient", () => {
        let req, res;
      
        beforeEach(() => {
          req = {
            params: { id: "12345" },
            body: { name: "John Doe", age: 40 },
          };
      
          res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
        });
      
        it("should update the patient details successfully", async () => {
          // Mock successful update
          Patient.findByIdAndUpdate.mockResolvedValue({
            _id: "12345",
            name: "John Doe",
            age: 40,
          });
      
          await updatePatient(req, res);
      
          expect(Patient.findByIdAndUpdate).toHaveBeenCalledWith(
            "12345",
            { name: "John Doe", age: 40 },
            { new: true }
          );
          expect(res.status).not.toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith({
            _id: "12345",
            name: "John Doe",
            age: 40,
          });
        });
      
        it("should return 404 if patient is not found", async () => {
          // Mock patient not found
          Patient.findByIdAndUpdate.mockResolvedValue(null);
      
          await updatePatient(req, res);
      
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith({ message: "Patient not found" });
        });
      
        it("should return 500 if an error occurs", async () => {
          // Mock an error
          Patient.findByIdAndUpdate.mockRejectedValue(new Error("Database error"));
      
          await updatePatient(req, res);
      
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ error: "Database error" });
        });
      });
      
  
    it("should retrieve tests for a patient", async () => {
      const tests = [
        { type: "Blood Pressure", value: "120/80" },
        { type: "Respiratory Rate", value: "20" },
      ];
      
      Test.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(tests),
      });
      
  
      const req = { params: { id: "12345" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      await getTestsForPatient(req, res);
  
      expect(res.json).toHaveBeenCalledWith(tests);
    });
  
    it("should retrieve a patient's history", async () => {
      const patient = { name: "Jane Doe", age: 40 };
      const tests = [{ type: "Blood Pressure", value: "120/80" }];
      Patient.findById.mockResolvedValue({ name: "Jane Doe", age: 40 });
      Test.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue([{ type: "Blood Pressure", value: "120/80" }]),
      });
  
      const req = { params: { id: "12345" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      await getPatientHistory(req, res);
  
      expect(res.json).toHaveBeenCalledWith({
        patient: { name: "Jane Doe", age: 40 },
        tests: [{ type: "Blood Pressure", value: "120/80" }],
      });
    });
  
    it("should retrieve patients in critical condition", async () => {
      const criticalPatients = [{ name: "John Doe", criticalCondition: true }];
      Patient.find.mockResolvedValue(criticalPatients);
  
      const req = {};
      const res = { json: jest.fn() };
  
      await getCriticalPatients(req, res);
  
      expect(res.json).toHaveBeenCalledWith(criticalPatients);
    });
  });
  