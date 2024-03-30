(async function () {
    try {
      const data = await fetch(
        "http://127.0.0.1:5500/Employee%20DB/src/data.json"
      );
      let employees = await data.json();
  
      console.log(employees);
  
      let selectedEmployeeId = employees[0] ? employees[0].id : null;
      let selectedEmployeeInfo = employees[0] ? employees[0] : null;
        
      const employeeList = document.querySelector(".employees__names--list");
      const singleEmployeeInfo = document.querySelector(
        ".employees__single--info"
      );
      // Add employee logic
      const createEmployee = document.querySelector('.createEmployee')
      const addEmployeeModal = document.querySelector('.addEmployee')
      const addEmployeeForm = document.querySelector('.addEmployee_create')

      createEmployee.addEventListener("click",()=>{
        addEmployeeModal.style.display="flex"
      })

      addEmployeeModal.addEventListener("click",(e)=>{
        if(e.target.className === "addEmployee"){
          addEmployeeModal.style.display="none"
        }
      })

      // check dob greater than 18
      const dobInput = document.querySelector(".addEmployee_create--dob");
  dobInput.max = `${new Date().getFullYear() - 18}-${new Date().toISOString().slice(5, 10)}` 


      addEmployeeForm.addEventListener("submit",(e)=>{
        e.preventDefault()

        const formData = new FormData(addEmployeeForm)
        const values = [...formData.entries()]
        console.log(values);

        let empData = {}

        values.forEach(val=>{
          empData[val[0]]=val[1]
        })

        empData.id = employees[employees.length -1 ].id + 1
        empData.age = new Date().getFullYear() - parseInt(empData.dob.slice(0.4),10)
        empData.imageUrl = empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png"

        employees.push(empData)

        renderEmployeeInfo()
        addEmployeeForm.reset()
        addEmployeeModal.style.display="none"
      })
  
      employeeList.addEventListener("click", (e) => {
        const clickedElement = e.target;
        if (clickedElement.tagName === "SPAN") {
          const clickedEmployeeId = parseInt(clickedElement.id);
          const clickedEmployee = employees.find(
            (emp) => emp.id === clickedEmployeeId
          );
          if (clickedEmployee) {
            selectedEmployeeId = clickedEmployeeId;
            selectedEmployeeInfo = clickedEmployee;
            renderEmployeeInfo();
            renderSingleEmployeeInfo();
          }
        }
        if (clickedElement.tagName==="I") {
          const employeeIdToRemove = parseInt(
            clickedElement.parentElement.id
          );
          employees = employees.filter(
            (emp) => emp.id !== employeeIdToRemove
          );
          if (employees.length === 0) {
            selectedEmployeeId = null;
            selectedEmployeeInfo = null;
            renderSingleEmployeeInfo();

          } else if (selectedEmployeeId === employeeIdToRemove) {
            selectedEmployeeId = employees[0].id;
            selectedEmployeeInfo = employees[0];
            renderSingleEmployeeInfo();
          }
          renderEmployeeInfo();
        }
      });
  
      const renderEmployeeInfo = () => {
        employeeList.innerHTML = "";
  
        employees.forEach((emp) => {
          const employee = document.createElement("span");
          employee.classList.add("employees__names--item");
          if (emp.id === selectedEmployeeId) {
            employee.classList.add("selected");
          }
          employee.setAttribute("id", emp.id);
          employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="remove-emp">❌</i>`;
          employeeList.appendChild(employee);
        });
      };
  
      const renderSingleEmployeeInfo = () => {
        if (selectedEmployeeInfo) {
          singleEmployeeInfo.innerHTML = `
            <img src="${selectedEmployeeInfo.imageUrl}"/>
            <span class="employees__single--heading">
              ${selectedEmployeeInfo.firstName} ${selectedEmployeeInfo.lastName} (${selectedEmployeeInfo.age})
            </span>
            <span>${selectedEmployeeInfo.address}</span>
            <span>${selectedEmployeeInfo.email}</span>
            <span>Mobile - ${selectedEmployeeInfo.contactNumber}</span>
            <span>DOB - ${selectedEmployeeInfo.dob}</span>
          `;
        } else {
          singleEmployeeInfo.innerHTML = ""; 
        }
      };
      
  
      renderEmployeeInfo();
      renderSingleEmployeeInfo();
    } catch (error) {
      console.log(error);
    }
  })();
  