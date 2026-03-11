// 1. INTRO OVERLAY LOGIC
window.addEventListener('load', () => {
    setTimeout(() => {
        const overlay = document.getElementById('intro-overlay');
        if (overlay) overlay.classList.add('intro-hidden');
    }, 2500); 
});

// 2. FLOOR NAVIGATION
function setFloor(imgSrc, element) {
    const activeMap = document.getElementById("activeMap");
    const pin = document.getElementById("pin");
    const pathLine = document.getElementById("pathLine");

    activeMap.src = imgSrc;
    
    // Update Button UI
    document.querySelectorAll(".f-btn").forEach(btn => btn.classList.remove("active"));
    if(element) element.classList.add("active");
    
    // Reset indicators when manually changing floors
    pin.style.display = "none";
    pathLine.style.display = "none";
}

// 3. ROOM DATA (Unified Database)
const roomDatabase = {
  "registrar": { floor:"floor1.jpg", x:21, y:65, line:"line-registrar.png" },
  "cashier": { floor:"floor1.jpg", x:21, y:65, line:"line-registrar.png" },
  "perseverance": { floor:"floor1.jpg", x:27, y:48, line:"line-perseverance.png" },
  "integrity": { floor:"floor1.jpg", x:31, y:33, line:"line-integrity.png" },
  "certitude": { floor:"floor1.jpg", x:35, y:23, line:"line-certitude.png" },
  "taekwondo": { floor:"floor1.jpg", x:68, y:7, line:"line-taekwondo.png" },
  "peace": { floor:"floor1.jpg", x:69, y:19, line:"line-peace.png" },
  "dignity": { floor:"floor1.jpg", x:72, y:29, line:"line-dignity.png" },
  "loyalty": { floor:"floor1.jpg", x:75, y:46, line:"line-loyalty.png" },
  "obedience": { floor:"floor1.jpg", x:78, y:65, line:"line-obedience.png" },
  "restroom 1": { floor:"floor1.jpg", x:38, y:15, line:"line-restroom1.png" },
  "humility": { floor:"floor2.jpg", x:21, y:65, line:"line-humility.png" },
  "honesty": { floor:"floor2.jpg", x:27, y:48, line:"line-honesty.png" },
  "prudence": { floor:"floor2.jpg", x:31, y:33, line:"line-prudence.png" },
  "competence": { floor:"floor2.jpg", x:35, y:23, line:"line-competence.png" },
  "patience": { floor:"floor2.jpg", x:78, y:65, line:"line-patience.png" },
  "discernment": { floor:"floor2.jpg", x:75, y:46, line:"line-discernment.png" },
  "courage": { floor:"floor2.jpg", x:72, y:29, line:"line-courage.png" },
  "wisdom": { floor:"floor2.jpg", x:49, y:74, line:"line-wisdom.png" },
  "faculty": { floor:"floor2.jpg", x:69, y:19, line:"line-faculty.png" },
  "guidance": { floor:"floor2.jpg", x:70, y:7, line:"line-guidance.png" },
  "clinic": { floor:"floor2.jpg", x:63, y:6, line:"line-clinic.png" },
  "restroom 2": { floor:"floor2.jpg", x:38, y:15, line:"line-restroom2.png" },
  "sound": { floor:"floor3.jpg", x:21, y:65, line:"line-sound-eng.png" },
  "tle": { floor:"floor3.jpg", x:31, y:33, line:"line-tle.png" },
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
    const pin = document.getElementById("pin") || document.querySelector('.map-marker');
    if (pin) {
        pin.style.left = `${x}%`;
        pin.style.top = `${y}%`;
        pin.style.display = "block";
    }
}

// 5. UNIFIED SEARCH LOGIC (With Auto-Floor Highlighting)
function handleSearch() {
    const inputField = document.getElementById('searchInput') || document.getElementById('roomInput');
    const query = inputField.value.toLowerCase().trim();

    if (roomDatabase[query]) {
        const roomData = roomDatabase[query];

        // Update Map Image
        const activeMap = document.getElementById("activeMap");
        if (activeMap) activeMap.src = roomData.floor;

        // Update Floor Buttons Highlighting
        const floorNum = roomData.floor.match(/\d/)[0]; 
        document.querySelectorAll(".f-btn").forEach(btn => {
            btn.classList.toggle("active", btn.innerText.includes(floorNum));
        });

        // Show Pin/Marker
        showPin(roomData.x, roomData.y);

        // Update Path Line
        const pathLine = document.getElementById("pathLine") || document.querySelector('.path-line');
        if (pathLine) {
            pathLine.src = roomData.line;
            pathLine.style.display = "block";
        }
    } else {
        alert("Room not found! Please pick from the list.");
    }
}

// 6. INTERACTIVE & DRAGGABLE STREETVIEW
const panoContainer = document.getElementById('streetview-floating');

if (panoContainer) {
    panoContainer.addEventListener('click', function() {
        if (window.innerWidth <= 480) {
            this.style.width = "280px";
            this.style.height = "180px";
        }
    });

    const activeMap = document.getElementById('activeMap');
    if (activeMap) {
        activeMap.addEventListener('click', () => {
            if (window.innerWidth <= 480) {
                panoContainer.style.width = "220px";
                panoContainer.style.height = "140px";
            }
        });
    }

    if (window.innerWidth > 480) {
        dragElement(panoContainer);
    }
}

function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        if (e.target.tagName === "IFRAME") return;
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        elmnt.style.bottom = "auto";
        elmnt.style.right = "auto";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// 7. FULLSCREEN TOGGLE FIX
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        panoContainer.style.width = "100vw";
        panoContainer.style.height = "100vh";
    } else {
        if (window.innerWidth > 480) {
            panoContainer.style.width = "350px";
            panoContainer.style.height = "220px";
        }
    }
});