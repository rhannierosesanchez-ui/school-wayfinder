// Handle floor buttons
function setFloor(imgSrc, element) {
    document.getElementById("activeMap").src = imgSrc;
    document.querySelectorAll(".f-btn").forEach(btn => btn.classList.remove("active"));
    if(element) element.classList.add("active");
    const pin = document.getElementById("pin");
    pin.style.display = "none"; // hide pin when changing floor
}

// Red pin function
function showPin(x, y) {
    const pin = document.getElementById("pin");
    pin.style.left = x + "%";
    pin.style.top = y + "%";
    pin.style.display = "block";
}

// Rooms with coordinates
const pin = document.getElementById("pin");

const rooms = {
  // FLOOR 1
  "registrar": {floor:"floor1.jpg", x:21, y:65},
  "cashier": {floor:"floor1.jpg", x:21, y:65},
  "perseverance": {floor:"floor1.jpg", x:27, y:48},
  "integrity": {floor:"floor1.jpg", x:31, y:33},
  "certitude": {floor:"floor1.jpg", x:35, y:23},
  "taekwando": {floor:"floor1.jpg", x:68, y:7},
  "peace": {floor:"floor1.jpg", x:67, y:63},
  "dignity": {floor:"floor1.jpg", x:58, y:69},
  "loyalty": {floor:"floor1.jpg", x:49, y:74},
  "obedience": {floor:"floor1.jpg", x:78, y:65},
  "restroom 1": {floor:"floor1.jpg", x:38, y:15},

  // FLOOR 2
  "humility": {floor:"floor2.jpg", x:21, y:65},
  "honesty": {floor:"floor2.jpg", x:27, y:48},
  "prudence": {floor:"floor2.jpg", x:31, y:33},
  "competence": {floor:"floor2.jpg", x:35, y:23},
  "patience": {floor:"floor2.jpg", x:68, y:7},
  "discernment": {floor:"floor2.jpg", x:67, y:63},
  "courage": {floor:"floor2.jpg", x:58, y:69},
  "wisdom": {floor:"floor2.jpg", x:49, y:74},
  "faculty": {floor:"floor2.jpg", x:78, y:65},
  "guidance": {floor:"floor2.jpg", x:38, y:13},
  "clinic": {floor:"floor2.jpg", x:38, y:13},
  "restroom 2": {floor:"floor2.jpg", x:38, y:15},

  // FLOOR 3
  "sound": {floor:"floor3.jpg", x:21, y:65},
  "robotics": {floor:"floor3.jpg", x:31, y:33},
  "gratitude": {floor:"floor3.jpg", x:27, y:50},
  "unity": {floor:"floor3.jpg", x:27, y:50},
  "grace": {floor:"floor3.jpg", x:35, y:25},
  "tranquility": {floor:"floor3.jpg", x:78, y:67},
  "righteousness": {floor:"floor3.jpg", x:75, y:48},
  "fortitude": {floor:"floor3.jpg", x:72, y:33},
  "excellence": {floor:"floor3.jpg", x:72, y:33},
  "justice": {floor:"floor3.jpg", x:69, y:21},
  "frugality": {floor:"floor3.jpg", x:69, y:21},
  "industry": {floor:"floor3.jpg", x:68, y:10},
  "restroom 3": {floor:"floor3.jpg", x:38, y:15}
};

// HELPER TO SHOW PIN
function showPin(x, y) {
  pin.style.left = x + "%";
  pin.style.top = y + "%";
  pin.style.display = "block";
}

// NORMALIZE STRINGS (remove spaces, lowercase)
function normalize(str) {
  return str.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g,"");
}

// SEARCH FUNCTION
function handleSearch() {
  let input = normalize(document.getElementById("roomInput").value);
  if (!input) return;

  for (let key in rooms) {
    if (normalize(key).includes(input)) {
      document.getElementById("activeMap").src = rooms[key].floor;
      showPin(rooms[key].x, rooms[key].y);
      return;
    }
  }

  alert("Room not found. Try typing the section name, e.g., 'perseverance', 'guidance', or 'justice'.");
}


// Search function
function handleSearch() {
    let input = document.getElementById("roomInput").value.toLowerCase().trim();
    if (!input) return;

    for (let key in rooms) {
        if (input.includes(key)) {
            document.getElementById("activeMap").src = rooms[key].floor;
            showPin(rooms[key].x, rooms[key].y);

            // activate correct floor button
            document.querySelectorAll(".f-btn").forEach(btn => btn.classList.remove("active"));
            if (rooms[key].floor === "floor1.jpg") document.querySelector(".f-btn:nth-child(1)").classList.add("active");
            else if (rooms[key].floor === "floor2.jpg") document.querySelector(".f-btn:nth-child(2)").classList.add("active");
            else if (rooms[key].floor === "floor3.jpg") document.querySelector(".f-btn:nth-child(3)").classList.add("active");

            return;
        }
    }
    alert("Room not found. Please try again!");
}
