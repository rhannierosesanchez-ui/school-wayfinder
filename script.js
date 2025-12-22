const directory = [
    // --- MAIN / HIGH SCHOOL BUILDING ---
    { name: "AV Theater", location: "HS Bldg, Ground Floor", info: "Left side, 10 steps from the main gate", tags: "theater, audio visual, events" },
    { name: "HS Principal's Office", location: "HS Bldg, Ground Floor", info: "Left side, before the stairs", tags: "principal, office, head" },
    { name: "High School Lobby", location: "HS Bldg, 2nd Floor", info: "Right after going upstairs from the left side", tags: "lobby, waiting area" },
    { name: "Registrar & Cashier", location: "HS Bldg, Ground Floor", info: "Left side, beside the stairs at the corner", tags: "payment, enrollment, records" },
    { name: "Clinic", location: "HS Bldg, 2nd Floor", info: "Near CR and VP/Guidance Office", tags: "nurse, medical, first aid" },
    { name: "HS Faculty", location: "HS Bldg, 2nd Floor", info: "Right side, near Clinic and VP Office", tags: "teachers, faculty" },
    { name: "Sound Engineering Room", location: "HS Bldg, 3rd Floor", info: "Top floor via corner stairs", tags: "sound, tech, engineering" },
    { name: "Science Laboratories", location: "HS Bldg, 3rd Floor", info: "Top floor facility", tags: "science, lab, biology, chemistry" },
    { name: "Comfort Rooms (CR)", location: "All Floors", info: "North side, near the stairs at each floor", tags: "cr, toilet, bathroom, restroom" },

    // --- EXTERNAL FACILITIES & NAVIGATION ---
    { name: "School Canteen", location: "Main Campus", info: "Way 1: North via stairs beside Principal's Office. Way 2: Via Grade School Bldg entrance.", tags: "food, lunch, snacks, cafeteria" },
    { name: "School Library", location: "Main Campus", info: "Path going down at the right side (in front of canteen stairs)", tags: "books, study, research" },
    { name: "Gymnasium", location: "Main Campus", info: "Past the Library/Grade School doorway, head North", tags: "sports, basketball, gym, court" },
    { name: "Grade School Department", location: "GS Building", info: "North from main gate through the archway/doorway", tags: "gs, elementary" },

    // --- ESTELLE PLAZA (SHS) ---
    { name: "Senior High Classrooms", location: "Estelle Plaza, 3rd Floor", info: "Located outside the main school gate", tags: "shs, grade 11, grade 12, senior high" }
];

function searchFunction() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = "";

    if (input.trim() === "") {
        resultsDiv.style.display = "none";
        return;
    }

    const filtered = directory.filter(item => 
        item.name.toLowerCase().includes(input) || 
        item.tags.toLowerCase().includes(input)
    );

    if (filtered.length > 0) {
        resultsDiv.style.display = "block";
        filtered.forEach(item => {
            resultsDiv.innerHTML += `
                <div class="result-item">
                    <div class="result-header">
                        <strong>${item.name}</strong>
                        <span class="location-tag">📍 ${item.location}</span>
                    </div>
                    <p class="directions">${item.info}</p>
                </div>
            `;
        });
    } else {
        resultsDiv.style.display = "block";
        resultsDiv.innerHTML = `<div class="result-item">No matches found for "${input}". Check your spelling or try "CR" or "Office".</div>`;
    }
}