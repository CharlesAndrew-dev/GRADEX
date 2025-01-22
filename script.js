document.addEventListener("DOMContentLoaded", () => {
    const addRowButton = document.getElementById("addRow");
    const calculateButton = document.getElementById("calculate");
    const rowsContainer = document.getElementById("rowsContainer");
    const resultContainer = document.getElementById("result");

    function addRow() {
        const row = document.createElement("div");
        row.classList.add("flex", "flex-wrap", "items-center", "justify-center", "text-center", "m-0","-mt-5","p-0", "gap-0");  
        
        row.innerHTML = `
            <div class="flex flex-col items-center w-1/4 m-3">
                <input class="units text-center p-1 w-full font-semibold border rounded-lg" type="number" placeholder="Units" min="1" required/>
            </div>
            <div class="flex flex-col items-center w-1/4 m-3">
                <input class="grades text-center p-1 m-1 w-full font-semibold border rounded-lg" type="number" placeholder="Grade" min="1" max="5" step="0.01" required/>
            </div>
        `;
        rowsContainer.appendChild(row);
    }

    function calculateGwa() {
        const unitsInputs = document.querySelectorAll(".units");
        const gradesInputs = document.querySelectorAll(".grades");

        const unitsArr = Array.from(unitsInputs).map(input => {
            const value = parseFloat(input.value);
            console.log(`Units input value: ${value}`); 
            return isNaN(value) ? 0 : value;  
        });

        const gradesArr = Array.from(gradesInputs).map(input => {
            const value = parseFloat(input.value);
            console.log(`Grades input value: ${value}`);  
            return isNaN(value) ? 0 : value; 
        });

        if (unitsArr.includes(0) || gradesArr.includes(0)) {
            resultContainer.textContent = "Please fill in all fields correctly.";
            return;
        }

        const totalWeightedGrades = unitsArr.reduce((sum, units, i) => sum + units * gradesArr[i], 0);
        const totalUnits = unitsArr.reduce((sum, units) => sum + units, 0);
        const gwa = totalWeightedGrades / totalUnits;

        resultContainer.textContent = `Your GWA is: ${gwa.toFixed(2)}`;
    }

    addRowButton.addEventListener("click", () => {
        console.log("Add Row clicked");  
        addRow();
    });
    calculateButton.addEventListener("click", calculateGwa);
});
