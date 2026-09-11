// ==========================================
// 🧠 MOUSE THERAPIST POPUP
// ==========================================


const toggleBtn =
    document.getElementById(
        "toggleBtn"
    );

const status =
    document.getElementById(
        "status"
    );

const distanceDisplay =
    document.getElementById(
        "distance"
    );

const clicksDisplay =
    document.getElementById(
        "clicks"
    );

const dashboardBtn =
    document.getElementById(
        "dashboardBtn"
    );


// ==========================================
// LOAD CURRENT DATA
// ==========================================

function loadPopupData() {

    chrome.storage.local.get(
        [
            "trackingEnabled",
            "mouseDistance",
            "mouseClicks"
        ],
        (data) => {


            const enabled =
                data.trackingEnabled || false;


            const distance =
                data.mouseDistance || 0;


            const clicks =
                data.mouseClicks || 0;


            // ==================================
            // UPDATE BUTTON
            // ==================================

            updateButton(enabled);


            // ==================================
            // UPDATE STATS
            // ==================================

            distanceDisplay.textContent =
                Math.round(distance) +
                " px";


            clicksDisplay.textContent =
                clicks;

        }
    );

}


// ==========================================
// UPDATE BUTTON
// ==========================================

function updateButton(enabled) {

    if (enabled) {

        status.textContent =
            "🧠 Therapist is watching...";

        toggleBtn.textContent =
            "Stop Therapy";

    }

    else {

        status.textContent =
            "😴 Therapy is currently OFF";

        toggleBtn.textContent =
            "Start Therapy";

    }

}


// ==========================================
// START / STOP
// ==========================================

toggleBtn.addEventListener(
    "click",
    () => {

        chrome.storage.local.get(
            ["trackingEnabled"],
            (data) => {


                const newState =
                    !data.trackingEnabled;


                chrome.storage.local.set({

                    trackingEnabled:
                        newState

                });


                updateButton(
                    newState
                );

            }
        );

    }
);


// ==========================================
// OPEN FULL DASHBOARD
// ==========================================

dashboardBtn.addEventListener(
    "click",
    () => {

        chrome.tabs.create({

            url:
                chrome.runtime.getURL(
                    "dashboard.html"
                )

        });

    }
);


// ==========================================
// INITIAL LOAD
// ==========================================

loadPopupData();