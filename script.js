// 1. INTRO OVERLAY LOGIC
window.addEventListener('load', function() {
    setTimeout(function() {
        const overlay = document.getElementById('intro-overlay');
        if (overlay) {
            overlay.classList.add('intro-hidden');
        }
    }, 2500); // 2.5 seconds for the dark professional intro
});

// 2. FLOOR NAVIGATION
function setFloor(imgSrc, element) {
    document.getElementById("activeMap").src = imgSrc;
    
    // Update Button UI
    document.querySelectorAll(".f-btn").forEach(btn => btn.classList.remove("active"));
    if(element) element.classList.add("active");
    
    // HIDE pin and path when manually changing floors
    document.getElementById("pin").style.display = "none";
    document.getElementById("pathLine").style.display = "none";
}

// 3. ROOM DATA
const rooms = {
  // FLOOR 1
  "registrar": { floor:"floor1.jpg", x:21, y:65, line:"line-registrar.png" },
  "cashier": { floor:"floor1.jpg", x:21, y:65, line:"line-registrar.png" },
  "perseverance": { floor:"floor1.jpg", x:27, y:48, line:"line-perseverance.png" },
  "integrity": { floor:"floor1.jpg", x:31, y:33, line:"line-integrity.png" },
  "certitude": { floor:"floor1.jpg", x:35, y:23, line:"line-certitude.png" },
  "taekwando": { floor:"floor1.jpg", x:68, y:7, line:"line-taekwondo.png" },
  "peace": { floor:"floor1.jpg", x:67, y:63, line:"line-peace.png" },
  "dignity": { floor:"floor1.jpg", x:58, y:69, line:"line-dignity.png" },
  "loyalty": { floor:"floor1.jpg", x:49, y:74, line:"line-loyalty.png" },
  "obedience": { floor:"floor1.jpg", x:78, y:65, line:"line-obedience.png" },
  "restroom 1": { floor:"floor1.jpg", x:38, y:15, line:"line-restroom1.png" },

  // FLOOR 2
  "humility": { floor:"floor2.jpg", x:21, y:65, line:"line-humility.png" },
  "honesty": { floor:"floor2.jpg", x:27, y:48, line:"line-honesty.png" },
  "prudence": { floor:"floor2.jpg", x:31, y:33, line:"line-prudence.png" },
  "competence": { floor:"floor2.jpg", x:35, y:23, line:"line-competence.png" },
  "patience": { floor:"floor2.jpg", x:68, y:7, line:"line-patience.png" },
  "discernment": { floor:"floor2.jpg", x:67, y:63, line:"line-discernment.png" },
  "courage": { floor:"floor2.jpg", x:58, y:69, line:"line-courage.png" },
  "wisdom": { floor:"floor2.jpg", x:49, y:74, line:"line-wisdom.png" },
  "faculty": { floor:"floor2.jpg", x:78, y:65, line:"line-faculty.png" },
  "guidance": { floor:"floor2.jpg", x:38, y:13, line:"line-guidance.png" },
  "clinic": { floor:"floor2.jpg", x:38, y:13, line:"line-clinic.png" },
  "restroom 2": { floor:"floor2.jpg", x:38, y:15, line:"line-restroom2.png" },

  // FLOOR 3
  "sound": { floor:"floor3.jpg", x:21, y:65, line:"line-sound-eng.png" },
  "robotics": { floor:"floor3.jpg", x:31, y:33, line:"line-robotics.png" },
  "gratitude": { floor:"floor3.jpg", x:27, y:50, line:"line-gratitude-unity.png" },
  "unity": { floor:"floor3.jpg", x:27, y:50, line:"line-gratitude-unity.png" },
  "grace": { floor:"floor3.jpg", x:35, y:25, line:"line-grace.png" },
  "tranquility": { floor:"floor3.jpg", x:78, y:67, line:"line-tranquility.png" },
  "righteousness": { floor:"floor3.jpg", x:75, y:48, line:"line-righteousness.png" },
  "fortitude": { floor:"floor3.jpg", x:72, y:33, line:"line-fortitude-excellence.png" },
  "excellence": { floor:"floor3.jpg", x:72, y:33, line:"line-fortitude-excellence.png" },
  "justice": { floor:"floor3.jpg", x:69, y:21, line:"line-justice-frugality.png" },
  "frugality": { floor:"floor3.jpg", x:69, y:21, line:"line-justice-frugality.png" },
  "industry": { floor:"floor3.jpg", x:68, y:10, line:"line-industry.png" },
  "restroom 3": { floor:"floor3.jpg", x:38, y:15, line:"line-restroom3.png" }
};

// 4. HELPERS
function showPin(x, y) {
    const pin = document.getElementById("pin");
    pin.style.left = x + "%";
    pin.style.top = y + "%";
    pin.style.display = "block";
}

function normalize(str) {
    return str.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g,"");
}

// 5. SEARCH LOGIC
function handleSearch() {
    let input = normalize(document.getElementById("roomInput").value);
    if (!input) return;

    const pathLine = document.getElementById("pathLine");
    const activeMap = document.getElementById("activeMap");

    for (let key in rooms) {
        if (normalize(key).includes(input)) {
            // Switch to correct floor image
            activeMap.src = rooms[key].floor;

            // Auto-highlight the correct floor button
            const floorNum = rooms[key].floor.match(/\d/)[0]; // gets "1", "2", or "3"
            document.querySelectorAll(".f-btn").forEach(btn => {
                btn.classList.toggle("active", btn.innerText.includes(floorNum));
            });

            // Show Pin & Path
            showPin(rooms[key].x, rooms[key].y);
            pathLine.src = rooms[key].line;
            pathLine.style.display = "block";
            return;
        }
    }
    alert("Room not found. Try typing the section name.");
}