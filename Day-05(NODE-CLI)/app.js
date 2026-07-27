const fs = require("fs");

// Read tasks.json
fs.readFile("tasks.json", "utf8", (err, data) => {

    if (err) {
        console.log("Error reading file:", err);
        return;
    }

    const tasks = JSON.parse(data);

    // Transform Data
    const updatedTasks = tasks.map(task => {

        let newStatus = task.status;

        if (task.status === "Pending") {
            newStatus = "In Progress";
        }

        return {
            ...task,
            status: newStatus
        };

    });

    // Write output.json
    fs.writeFile(
        "output.json",
        JSON.stringify(updatedTasks, null, 2),
        (err) => {

            if (err) {
                console.log("Error writing file:", err);
                return;
            }

            console.log("✅ output.json created successfully!");

        }
    );

});