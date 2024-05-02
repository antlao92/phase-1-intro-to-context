// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]){
    const timeInEvents = [];
    const timeOutEvents = [];
    let newObj = {
        firstName: firstName, 
        familyName: familyName, 
        title:title, 
        payPerHour:payPerHour, 
        timeInEvents:timeInEvents, 
        timeOutEvents:timeOutEvents}
    return newObj;
}

function createEmployeeRecords(employeeData){
    let employeeRecords = [];
    
    employeeData.forEach(data => {
        let employeeRecord = createEmployeeRecord(data);
        employeeRecords.push(employeeRecord);
      });
    
      return employeeRecords;
    }
    
    function createEmployeeRecord(data) {
      let employeeRecord = {
        firstName: data[0],
        familyName: data[1],
        title: data[2],
        payPerHour: data[3],
        timeInEvents: [],
        timeOutEvents: []
      };
    
      return employeeRecord;
    };

    function createTimeInEvent(employeeRecord, dateStamp) {
        const [date, time] = dateStamp.split(' ');
        const hour = parseInt(time.slice(0, 2) *100); // assuming the hour is always in two-digit format
      
        employeeRecord.timeInEvents.push({
          type: "TimeIn",
          hour,
          date
        });
      
        return employeeRecord;
      }

      function createTimeOutEvent(employeeRecord, dateStamp) {
        const [date, time] = dateStamp.split(' ');
        const hour = parseInt(time.slice(0, 2) *100); // assuming the hour is always in two-digit format
      
        employeeRecord.timeOutEvents.push({
          type: "TimeOut",
          hour,
          date
        });
      
        return employeeRecord;
      }

      function hoursWorkedOnDate(employeeRecord, date){
        const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
        const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

        const hoursWorked = (timeOutEvent.hour - timeInEvent.hour)/100;
        return hoursWorked;
      }

      function wagesEarnedOnDate(employeeRecord, date){
        const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
        const payPerHour = employeeRecord.payPerHour;
        
        const payOwed = hoursWorked * payPerHour;
        
        return payOwed;
      }

      function allWagesFor(employeeRecord){
        const dates = employeeRecord.timeInEvents.map(event => event.date);

        const totalWages = dates.reduce((total, date) => {
          const wagesEarned = wagesEarnedOnDate(employeeRecord, date);
          return total + wagesEarned;
        }, 0);
      
        return totalWages;
      }

      function calculatePayroll(employeeRecords) {
        let totalPay = 0;
      
        for (const employeeRecord of employeeRecords) {
          for (const event of employeeRecord.timeInEvents) {
            const date = event.date;
            const wagesEarned = wagesEarnedOnDate(employeeRecord, date);
            totalPay += wagesEarned;
          }
        }
      
        return totalPay;
      }
      

      