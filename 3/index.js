document.getElementById('calculateBtn').addEventListener('click', calculateGPA);
document.getElementById('resetBtn').addEventListener('click', resetForm);
document.getElementById('addRowBtn').addEventListener('click', addRow);

const gradePoints = {
    'A+': 4.3,
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'D-': 0.7,
    'F': 0.0
};

function calculateGPA() {
    const rows = document.querySelectorAll('#gpaTable tbody tr');
    let totalGradePoints = 0;
    let totalCredits = 0;
    let hasError = false;

    rows.forEach((row, index) => {
        const checkbox = row.querySelector('input[type="checkbox"]');
        if (!checkbox.checked) {
            return;
        }

        const gradeInput = row.querySelector('select').value;
        const creditsInput = row.querySelector('input[type="number"]').value.trim(); 

        console.log(`Row ${index + 1}: Grade Input = "${gradeInput}", Credits Input = "${creditsInput}"`);

        if (gradeInput === '' || creditsInput === '') {
            console.error(`Row ${index + 1}: Missing grade or credits.`);
            hasError = true;
            return;
        }

        const gradePointsValue = gradePoints[gradeInput.toUpperCase()];
        const credits = parseFloat(creditsInput);

        if (gradePointsValue === undefined || isNaN(credits) || credits <= 0) {
            console.error(`Row ${index + 1}: Invalid grade or credits.`);
            hasError = true;
            return;
        }

        totalGradePoints += gradePointsValue * credits;
        totalCredits += credits;

        console.log(`Row ${index + 1}: Total Grade Points = ${totalGradePoints}, Total Credits = ${totalCredits}`);
    });

    if (hasError || totalCredits === 0) {
        showError();
        document.getElementById('gpaResult').value = '';
        console.log('Error detected. GPA calculation failed.');
    } else {
        const gpa = totalGradePoints / totalCredits;
        document.getElementById('gpaResult').value = gpa.toFixed(2);
        hideError();
        console.log(`GPA calculated: ${gpa.toFixed(2)}`);
    }
}

function addRow() {
    const table = document.querySelector('#gpaTable tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="course">
            <input type="checkbox" checked>
            <input type="text" placeholder="Course Name">
        </td>
        <td>
            <select>
                <option value=""></option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="B-">B-</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="C-">C-</option>
                <option value="D+">D+</option>
                <option value="D">D</option>
                <option value="D-">D-</option>
                <option value="F">F</option>
            </select>
        </td>
        <td><input type="number" placeholder="Credits" min="0" step="0.1"></td>
        <td><button class="deleteBtn">&times;</button></td>
    `;
    table.appendChild(newRow);
    attachDeleteEvent(newRow);
}

function attachDeleteEvent(row) {
    const deleteBtn = row.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', () => row.remove());
}

function resetForm() {
    const rows = document.querySelectorAll('#gpaTable tbody tr');

    rows.forEach((row, index) => {
        const courseInput = row.querySelector('input[type="text"]:nth-child(2)');
        courseInput.value = '';
        
        const gradeSelect = row.querySelector('select');
        gradeSelect.value = '';
        
        const creditsInput = row.querySelector('input[type="number"]');
        creditsInput.value = '';

        const checkbox = row.querySelector('input[type="checkbox"]');
        checkbox.checked = true;
    });

    document.getElementById('gpaResult').value = ''; 

    hideError();
}

function showError() {
    document.getElementById('error').classList.remove('hidden');
}

function hideError() {
    document.getElementById('error').classList.add('hidden');
}

document.querySelectorAll('.deleteBtn').forEach(button => {
    button.addEventListener('click', function() {
        this.closest('tr').remove();
    });
});
