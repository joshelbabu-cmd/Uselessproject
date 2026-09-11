// ==========================================
// 🧠 MOUSE MOVEMENT THERAPIST
// ADVANCED WEBPAGE TRACKER
// ==========================================

let trackingEnabled = false;

let lastX = null;
let lastY = null;
let lastTime = null;
let lastDirection = null;


// ==========================================
// CHECK THERAPY STATE
// ==========================================

chrome.storage.local.get(
    ["trackingEnabled"],
    (data) => {

        trackingEnabled =
            data.trackingEnabled || false;

    }
);


// ==========================================
// WATCH FOR START / STOP
// ==========================================

chrome.storage.onChanged.addListener(
    (changes) => {

        if (changes.trackingEnabled) {

            trackingEnabled =
                changes.trackingEnabled.newValue;

            // Reset local movement state
            // when therapy starts/stops

            lastX = null;
            lastY = null;
            lastTime = null;
            lastDirection = null;

        }

    }
);


// ==========================================
// 🖱️ TRACK MOUSE
// ==========================================

document.addEventListener(
    "mousemove",
    (event) => {

        if (!trackingEnabled) return;


        const x = event.clientX;
        const y = event.clientY;

        const now = Date.now();


        // First position
        if (lastX === null) {

            lastX = x;
            lastY = y;
            lastTime = now;

            return;

        }


        const dx = x - lastX;
        const dy = y - lastY;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        const timeDifference =
            now - lastTime;


        // ==================================
        // SPEED
        // ==================================

        let speed = 0;

        if (timeDifference > 0) {

            speed =
                distance /
                (timeDifference / 1000);

        }


        // ==================================
        // DIRECTION
        // ==================================

        const direction =
            Math.atan2(dy, dx);


        if (
            lastDirection !== null &&
            Math.abs(
                direction - lastDirection
            ) > 1
        ) {

            chrome.runtime.sendMessage({

                type: "directionChange"

            });

        }


        // ==================================
        // SEND MOVEMENT DATA
        // ==================================

        chrome.runtime.sendMessage({

            type: "mouseMove",

            distance: distance,

            speed: speed

        });


        // ==================================
        // SAVE POSITION
        // ==================================

        lastX = x;
        lastY = y;

        lastTime = now;

        lastDirection = direction;

    },
    true
);


// ==========================================
// 🖱️ CLICK TRACKING
// ==========================================

document.addEventListener(
    "click",
    () => {

        if (!trackingEnabled) return;


        chrome.runtime.sendMessage({

            type: "mouseClick"

        });

    },
    true
);