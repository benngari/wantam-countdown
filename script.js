/* ---------------------------------------------------------
   WANTAM COUNTDOWN
   Target: Tuesday, 10 August 2027, 00:00 Nairobi time (EAT, UTC+3)
--------------------------------------------------------- */

const TARGET = new Date("2027-08-10T00:00:00+03:00");

const dEl = document.getElementById("d");
const hEl = document.getElementById("h");
const mEl = document.getElementById("m");
const sEl = document.getElementById("s");

function pad(n){ return String(n).padStart(2, "0"); }

function tick(){
  const now = new Date();
  const diff = TARGET - now;

  if (diff <= 0){
    dEl.textContent = "00";
    hEl.textContent = "00";
    mEl.textContent = "00";
    sEl.textContent = "00";
    document.title = "WANTAM — it's here";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days  = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const mins  = Math.floor((totalSeconds % 3600) / 60);
  const secs  = totalSeconds % 60;

  dEl.textContent = days;
  hEl.textContent = pad(hours);
  mEl.textContent = pad(mins);
  sEl.textContent = pad(secs);

  // small pulse on the seconds digit each tick
  sEl.classList.remove("tick");
  void sEl.offsetWidth; // restart animation
  sEl.classList.add("tick");

  // tab title updates too, so you can see it without the tab in focus
  document.title = `${days}d ${pad(hours)}:${pad(mins)}:${pad(secs)} — WANTAM`;
}

tick();
setInterval(tick, 1000);

/* ---------------------------------------------------------
   THE WALL — gallery of stamps/stencils
   Add more images: drop the file in /assets, then add a
   line below. rotate is in degrees, tape true/false.
--------------------------------------------------------- */
const stamps = [
  { src: "assets/fist-01.png", caption: "Stamp 01", rotate: -4, tape: true },
  // { src: "assets/next-image.png", caption: "Stamp 02", rotate: 3, tape: true },
];

const patchesEl = document.getElementById("patches");

stamps.forEach((stamp, i) => {
  const patch = document.createElement("div");
  patch.className = "patch";
  patch.style.transform = `rotate(${stamp.rotate}deg)`;

  if (stamp.tape){
    const tape = document.createElement("div");
    tape.className = "tape";
    patch.appendChild(tape);
  }

  const img = document.createElement("img");
  img.src = stamp.src;
  img.alt = stamp.caption || `Stamp ${i + 1}`;
  patch.appendChild(img);

  const caption = document.createElement("div");
  caption.className = "caption";
  caption.textContent = stamp.caption || `Stamp ${String(i + 1).padStart(2, "0")}`;
  patch.appendChild(caption);

  patchesEl.appendChild(patch);
});
