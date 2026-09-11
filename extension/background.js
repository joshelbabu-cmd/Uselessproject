// ==========================================
// 🧠 MOUSE MOVEMENT THERAPIST
// CENTRAL DATA MANAGER
// ==========================================


// ==========================================
// INITIAL SETUP
// ==========================================

chrome.runtime.onInstalled.addListener(() => {

    chrome.storage.local.set({

        trackingEnabled: false,

        mouseDistance: 0,

        mouseClicks: 0,

        mouseMovements: 0,

        directionChanges: 0,

        totalSpeed: 0,

        speedSamples: 0

    });

});


// ==========================================
// RECEIVE DATA FROM WEBPAGES
// ==========================================

chrome.runtime.onMessage.addListener((message) => {


    // ======================================
    // 🖱️ MOUSE MOVEMENT
    // ======================================

    if (message.type === "mouseMove") {

        chrome.storage.local.get(
            [
                "mouseDistance",
                "mouseMovements",
                "totalSpeed",
                "speedSamples"
            ],
            (data) => {

                const distance =
                    data.mouseDistance || 0;

                const movements =
                    data.mouseMovements || 0;

                const totalSpeed =
                    data.totalSpeed || 0;

                const speedSamples =
                    data.speedSamples || 0;


                chrome.storage.local.set({

                    mouseDistance:
                        distance + message.distance,

                    mouseMovements:
                        movements + 1,

                    totalSpeed:
                        totalSpeed + message.speed,

                    speedSamples:
                        speedSamples + 1

                });

            }
        );

    }


    // ======================================
    // 🌀 DIRECTION CHANGE
    // ======================================

    if (message.type === "directionChange") {

        chrome.storage.local.get(
            ["directionChanges"],
            (data) => {

                const changes =
                    data.directionChanges || 0;


                chrome.storage.local.set({

                    directionChanges:
                        changes + 1

                });

            }
        );

    }


    // ======================================
    // 🖱️ CLICK
    // ======================================

    if (message.type === "mouseClick") {

        chrome.storage.local.get(
            ["mouseClicks"],
            (data) => {

                const clicks =
                    data.mouseClicks || 0;


                chrome.storage.local.set({

                    mouseClicks:
                        clicks + 1

                });

            }
        );

    }

});