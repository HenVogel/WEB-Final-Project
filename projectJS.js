// Function to validate an email address
// This function uses a regular expression (regex) to check if the given email is in a valid format
// It returns `true` if the email is valid, otherwise `false`
function validateEmail(email) {
    // Regular expression to match standard email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Test the input email against the regex and return the result
    return emailRegex.test(email);
}

// Function to generate the meal plan on a new web page
// This function collects user inputs for their meal plan, validates the email, and opens a new tab displaying the plan
function generateMealPlan() {
    // Fetch user-provided name, email, and weekly goal from the form fields
    const name = document.getElementById('name').value; // The user's name
    const email = document.getElementById('email').value; // The user's email address
    const goal = document.getElementById('goal').value; // The user's weekly fitness goal

    // Validate the email address using the `validateEmail` function
    if (!validateEmail(email)) {
        // Show an alert message if the email is invalid
        alert('Please enter a valid email address.');
        return; // Stop further execution if validation fails
    }

    // Create an object to store meal information for each day of the week
    const meals = {};
    // Array of days to iterate through
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    for (let day of days) {
        // Populate the meals object with inputs for each meal of the day
        meals[day] = {
            breakfast: document.getElementById(`${day}-breakfast`).value, // User's breakfast for the day
            snack1: document.getElementById(`${day}-snack1`).value, // User's first snack
            lunch: document.getElementById(`${day}-lunch`).value, // User's lunch
            snack2: document.getElementById(`${day}-snack2`).value, // User's second snack
            dinner: document.getElementById(`${day}-dinner`).value, // User's dinner
        };
    }

    // Open a new browser tab to display the meal plan
    const newWindow = window.open('', '_blank'); // Opens a new blank tab
    newWindow.document.write('<html><head><title>Weekly Meal Plan</title>'); // Add title to the new page
    newWindow.document.write('<style>body { font-family: monospace; margin: 20px; }</style></head><body>'); // Add basic styles
    newWindow.document.write(`<h1>${name}'s Weekly Meal Plan</h1>`); // Display the user's name as a heading
    newWindow.document.write(`<p>Email: ${email}</p>`); // Display the user's email
    newWindow.document.write(`<p>Weekly Goal: ${goal}</p>`); // Display the user's weekly goal
    newWindow.document.write('<table border="1" style="width:100%; text-align:left;">'); // Start the meal plan table
    newWindow.document.write('<tr><th>Day</th><th>Breakfast</th><th>Snack 1</th><th>Lunch</th><th>Snack 2</th><th>Dinner</th></tr>'); // Table headers

    // Loop through each day and populate the table with the user's meals
    for (let day in meals) {
        const { breakfast, snack1, lunch, snack2, dinner } = meals[day]; // Destructure meal information for the day
        newWindow.document.write(
            `<tr><td>${day}</td><td>${breakfast}</td><td>${snack1}</td><td>${lunch}</td><td>${snack2}</td><td>${dinner}</td></tr>` // Add a row with meal data
        );
    }

    newWindow.document.write('</table></body></html>'); // Close the table and complete the document
    newWindow.document.close(); // Finalize the new web page
}

// Function to download the meal plan as a .txt file
// This function collects user inputs, formats them into a text structure, and triggers a download
function downloadMealPlan() {
    // Fetch user-provided name, email, and weekly goal from the form fields
    const name = document.getElementById('name').value; // The user's name
    const email = document.getElementById('email').value; // The user's email address
    const goal = document.getElementById('goal').value; // The user's weekly fitness goal

    // Validate the email address using the `validateEmail` function
    if (!validateEmail(email)) {
        // Show an alert message if the email is invalid
        alert('Please enter a valid email address.');
        return; // Stop further execution if validation fails
    }

    // Create a formatted string to represent the meal plan
    let mealPlan = `Weekly Meal Plan for ${name}\nEmail: ${email}\nGoal: ${goal}\n\n`; // Header information
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; // Array of days
    for (let day of days) {
        mealPlan += `${day}:\n`; // Add the day as a header
        mealPlan += `  Breakfast: ${document.getElementById(`${day}-breakfast`).value}\n`; // Add breakfast
        mealPlan += `  Snack 1: ${document.getElementById(`${day}-snack1`).value}\n`; // Add snack 1
        mealPlan += `  Lunch: ${document.getElementById(`${day}-lunch`).value}\n`; // Add lunch
        mealPlan += `  Snack 2: ${document.getElementById(`${day}-snack2`).value}\n`; // Add snack 2
        mealPlan += `  Dinner: ${document.getElementById(`${day}-dinner`).value}\n\n`; // Add dinner
    }

    // Create a Blob object to store the text data
    const blob = new Blob([mealPlan], { type: 'text/plain' }); // Define the content type as plain text

    // Create a link element to trigger the download
    const link = document.createElement('a'); // Create a hidden anchor element
    link.href = URL.createObjectURL(blob); // Set the href to a blob URL
    link.download = 'WeeklyMealPlan.txt'; // Set the file name for the download
    link.click(); // Programmatically click the link to start the download

    // Revoke the blob URL to free up memory
    URL.revokeObjectURL(link.href); // Clean up resources
}

// Function to clear the form inputs
// This function resets all input fields (text, email, and textarea) in the form
function clearForm() {
    // Select all input and textarea elements inside the form
    const formElements = document.querySelectorAll('input, textarea');
    formElements.forEach((element) => {
        // Check if the element is a text, email, or textarea field
        if (element.type === 'text' || element.type === 'email' || element.type === 'textarea') {
            element.value = ''; // Clear the value of the field
        }
    });
}
