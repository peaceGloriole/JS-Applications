function attachEvents() {
  const url = `http://localhost:3030/jsonstore/collections/students`;
  document.getElementById(`submit`).addEventListener(`click`, addStudent);


  async function addStudent(e) {
    e.preventDefault();

    const firstNameRef = document.querySelector("input['name=firstName']");
    const lastNameRef = document.querySelector("input['name=lastName']");
    const facultyNumberRef = document.querySelector("input['name=facultyNumber']");
    const gradeRef = document.querySelector("input['name=grade']");

    const firstName = firstNameRef.value;
    const lastName = lastNameRef.value;
    const facultyNumber = facultyNumberRef.value;
    const grade = gradeRef.value;

    if (firstName === "" || lastName === "" || facultyNumber === "" || grade === "") {
      return;
    }

    const response = await fetch(url, {
      method: `post`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, facultyNumber, grade }),
    });

    if(!response.ok){
      const error = await response.json();
      return alert(error.message);
    }

    firstNameRef.value = "";
    lastNameRef.value = "";
    facultyNumberRef.value = "";
    gradeRef.value = "";

    loadsStudents();
  }

  async function loadsStudents() {
    const response = await fetch(url);
    const data = await response.json();

    const students = Object.values(data).map(createStudent).join("");
    document.querySelector("tbody").innerHTML = students;
  }
}