export default class TestData {
    static makeAppointmentTestData(){
        return [
            { testId: "TC001", facility: "Tokyo CURA Healthcare Center", hcp: "Medicare", visitDate: "05/10/2025"},
            { testId: "TC001", facility: "Hongkong CURA Healthcare Center", hcp: "Medicaid", visitDate: "05/11/2025"},
            { testId: "TC001", facility: "Seoul CURA Healthcare Center", hcp: "None", visitDate: "05/12/2025"}
        ]
    }
}