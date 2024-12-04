function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}



// Function to generate the meal plan on a new web page
function generateMealPlan() {
    const name = document.getElementById('name').value; // Fetch user name
    const email = document.getElementById('email').value; // Fetch email
    const goal = document.getElementById('goal').value; // Fetch weekly goal

    // Validate the email address
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Collect meal inputs for each day
    const meals = {};
    for (let day of ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']) {
        meals[day] = {
            breakfast: document.getElementById(`${day}-breakfast`).value,
            snack1: document.getElementById(`${day}-snack1`).value,
            lunch: document.getElementById(`${day}-lunch`).value,
            snack2: document.getElementById(`${day}-snack2`).value,
            dinner: document.getElementById(`${day}-dinner`).value,
        };
    }

    // Generate a new web page with the meal plan
    const newWindow = window.open('', '_blank'); // Open a new browser tab
    newWindow.document.write('<html><head><title>Weekly Meal Plan</title>');
    newWindow.document.write('<style>body { font-family: monospace; margin: 20px; }</style></head><body>');
    newWindow.document.write(`<h1>${name}'s Weekly Meal Plan</h1>`);
    newWindow.document.write(`<p>Email: ${email}</p>`);
    newWindow.document.write(`<p>Weekly Goal: ${goal}</p>`);
    newWindow.document.write('<table border="1" style="width:100%; text-align:left;">');
    newWindow.document.write('<tr><th>Day</th><th>Breakfast</th><th>Snack 1</th><th>Lunch</th><th>Snack 2</th><th>Dinner</th></tr>');

    // Populate the table with the meal data
    for (let day in meals) {
        const { breakfast, snack1, lunch, snack2, dinner } = meals[day];
        newWindow.document.write(
            `<tr><td>${day}</td><td>${breakfast}</td><td>${snack1}</td><td>${lunch}</td><td>${snack2}</td><td>${dinner}</td></tr>`
        );
    }

    newWindow.document.write('</table></body></html>');
    newWindow.document.close(); // Finalize the document
}

// Function to download the meal plan as a .txt file
function downloadMealPlan() {
    const name = document.getElementById('name').value; // Fetch user name
    const email = document.getElementById('email').value; // Fetch email
    const goal = document.getElementById('goal').value; // Fetch weekly goal

    // Validate the email address
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Collect meal inputs and format the meal plan
    let mealPlan = `Weekly Meal Plan for ${name}\nEmail: ${email}\nGoal: ${goal}\n\n`;
    for (let day of ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']) {
        mealPlan += `${day}:\n`;
        mealPlan += `  Breakfast: ${document.getElementById(`${day}-breakfast`).value}\n`;
        mealPlan += `  Snack 1: ${document.getElementById(`${day}-snack1`).value}\n`;
        mealPlan += `  Lunch: ${document.getElementById(`${day}-lunch`).value}\n`;
        mealPlan += `  Snack 2: ${document.getElementById(`${day}-snack2`).value}\n`;
        mealPlan += `  Dinner: ${document.getElementById(`${day}-dinner`).value}\n\n`;
    }

    // Create a Blob object with the meal plan data
    const blob = new Blob([mealPlan], { type: 'text/plain' });

    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'WeeklyMealPlan.txt';
    link.click();

    // Revoke the Blob URL to clean up memory
    URL.revokeObjectURL(link.href);
}



// Function to clear the meal plan form
function clearForm() {
    // Resets all input fields in the form
    const formElements = document.querySelectorAll('input, textarea');
    formElements.forEach((element) => {
        if (element.type === 'text' || element.type === 'email' || element.type === 'textarea') {
            element.value = ''; // Clear text and email fields
        }
    });
}