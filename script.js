// ==========================================
// 🧠 MOUSE MOVEMENT THERAPIST
// WEB VERSION ENGINE
// ==========================================


// ==========================================
// HTML ELEMENTS
// ==========================================

const distanceDisplay =
    document.getElementById("distance");

const clicksDisplay =
    document.getElementById("clicks");

const movementsDisplay =
    document.getElementById("movements");

const directionsDisplay =
    document.getElementById("directions");

const speedDisplay =
    document.getElementById("speed");

const therapyState =
    document.getElementById("therapyState");

const statusDisplay =
    document.getElementById("status");

const therapyBtn =
    document.getElementById("therapyBtn");

const resetBtn =
    document.getElementById("resetBtn");

const analyzeBtn =
    document.getElementById("analyzeBtn");

const result =
    document.getElementById("result");

const personalityIcon =
    document.getElementById("personalityIcon");

const personalityName =
    document.getElementById("personalityName");

const personalityDescription =
    document.getElementById(
        "personalityDescription"
    );

const chaosScore =
    document.getElementById("chaosScore");

const therapistMessage =
    document.getElementById(
        "therapistMessage"
    );


// ==========================================
// CHAOS ELEMENTS
// ==========================================

const liveChaosScore =
    document.getElementById(
        "liveChaosScore"
    );

const chaosFill =
    document.getElementById(
        "chaosFill"
    );

const chaosLabel =
    document.getElementById(
        "chaosLabel"
    );

const achievementCount =
    document.getElementById(
        "achievementCount"
    );


// ==========================================
// CHARACTER ELEMENTS
// ==========================================

const character =
    document.getElementById(
        "therapistCharacter"
    );

const speechBubble =
    document.getElementById(
        "speechBubble"
    );

const characterStatus =
    document.getElementById(
        "characterStatus"
    );

const characterMouth =
    document.getElementById(
        "characterMouth"
    );

const leftPupil =
    document.getElementById(
        "leftPupil"
    );

const rightPupil =
    document.getElementById(
        "rightPupil"
    );


// ==========================================
// SESSION DATA
// ==========================================

let mouseDistance = 0;

let mouseClicks = 0;

let mouseMovements = 0;

let directionChanges = 0;

let totalSpeed = 0;

let speedSamples = 0;


// ==========================================
// TRACKING STATE
// ==========================================

let trackingEnabled = false;

let lastX = null;

let lastY = null;

let lastTime = null;

let lastDirection = null;


// ==========================================
// THERAPIST MEMORY
// ==========================================

let lastTherapistComment = "";

let lastCharacterReaction = "";

let lastReactionTime = 0;

let previousAchievementState = {};


// ==========================================
// 🧠 LOAD SAVED SESSION
// ==========================================

function loadSavedData() {

    const saved =
        localStorage.getItem(
            "mouseTherapistData"
        );


    if (!saved) {

        return;

    }


    try {

        const data =
            JSON.parse(saved);


        mouseDistance =
            data.mouseDistance || 0;

        mouseClicks =
            data.mouseClicks || 0;

        mouseMovements =
            data.mouseMovements || 0;

        directionChanges =
            data.directionChanges || 0;

        totalSpeed =
            data.totalSpeed || 0;

        speedSamples =
            data.speedSamples || 0;

    }

    catch (error) {

        console.log(
            "Unable to load saved session."
        );

    }

}


// ==========================================
// 💾 SAVE SESSION
// ==========================================

function saveData() {

    const data = {

        mouseDistance,

        mouseClicks,

        mouseMovements,

        directionChanges,

        totalSpeed,

        speedSamples

    };


    localStorage.setItem(
        "mouseTherapistData",
        JSON.stringify(data)
    );

}


// ==========================================
// 🧠 CHARACTER SPEECH
// ==========================================

function characterSpeak(message) {

    speechBubble.textContent =
        message;

}


// ==========================================
// 🧍 CHARACTER EMOTION
// ==========================================

function setCharacterEmotion(
    emotion
) {

    character.classList.remove(
        "angry"
    );


    if (emotion === "normal") {

        characterMouth.textContent =
            "─";

        characterStatus.textContent =
            "😐 Emotionally stable.";

    }


    if (emotion === "happy") {

        characterMouth.textContent =
            "⌣";

        characterStatus.textContent =
            "😊 Surprisingly pleased.";

    }


    if (emotion === "worried") {

        characterMouth.textContent =
            "︵";

        characterStatus.textContent =
            "😳 Slightly concerned.";

    }


    if (emotion === "angry") {

        characterMouth.textContent =
            "╰︿╯";

        characterStatus.textContent =
            "😡 Therapist is losing patience.";

        character.classList.add(
            "angry"
        );

    }


    if (emotion === "confused") {

        characterMouth.textContent =
            "?";

        characterStatus.textContent =
            "🌀 Therapist is confused.";

    }


    if (emotion === "panic") {

        characterMouth.textContent =
            "O";

        characterStatus.textContent =
            "🤯 THERAPIST HAS HAD ENOUGH.";

        character.classList.add(
            "angry"
        );

    }

}


// ==========================================
// 🎬 BOUNCE
// ==========================================

function bounceCharacter() {

    character.classList.remove(
        "bounce"
    );


    void character.offsetWidth;


    character.classList.add(
        "bounce"
    );

}


// ==========================================
// 👀 EYE TRACKING
// ==========================================

document.addEventListener(
    "mousemove",
    (event) => {


        // ==================================
        // CHARACTER EYES
        // ==================================

        const eyeMovement =
            calculateEyeMovement(
                event.clientX,
                event.clientY
            );


        leftPupil.style.transform =
            `translate(
                ${eyeMovement.x}px,
                ${eyeMovement.y}px
            )`;


        rightPupil.style.transform =
            `translate(
                ${eyeMovement.x}px,
                ${eyeMovement.y}px
            )`;


        // ==================================
        // THERAPY TRACKING
        // ==================================

        if (!trackingEnabled) {

            return;

        }


        trackMouseMovement(
            event
        );

    },
    true
);


// ==========================================
// 👀 CALCULATE EYE MOVEMENT
// ==========================================

function calculateEyeMovement(
    mouseX,
    mouseY
) {

    const characterRect =
        character.getBoundingClientRect();


    const centerX =
        characterRect.left +
        characterRect.width / 2;


    const centerY =
        characterRect.top +
        120;


    const dx =
        mouseX - centerX;

    const dy =
        mouseY - centerY;


    const angle =
        Math.atan2(
            dy,
            dx
        );


    const distance =
        Math.min(
            6,
            Math.sqrt(
                dx * dx +
                dy * dy
            ) / 80
        );


    return {

        x:
            Math.cos(angle) *
            distance,

        y:
            Math.sin(angle) *
            distance

    };

}


// ==========================================
// 🖱️ TRACK MOUSE MOVEMENT
// ==========================================

function trackMouseMovement(
    event
) {

    const x =
        event.clientX;

    const y =
        event.clientY;

    const now =
        Date.now();


    // ======================================
    // FIRST POSITION
    // ======================================

    if (lastX === null) {

        lastX = x;

        lastY = y;

        lastTime = now;

        return;

    }


    const dx =
        x - lastX;

    const dy =
        y - lastY;


    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    const timeDifference =
        now - lastTime;


    // Ignore impossible jumps

    if (
        distance > 0 &&
        distance < 1000
    ) {

        mouseDistance +=
            distance;

        mouseMovements++;


        // ==================================
        // SPEED
        // ==================================

        if (
            timeDifference > 0
        ) {

            const speed =
                distance /
                (
                    timeDifference /
                    1000
                );


            // Ignore unrealistic browser
            // event spikes

            if (speed < 5000) {

                totalSpeed +=
                    speed;

                speedSamples++;

            }

        }


        // ==================================
        // DIRECTION
        // ==================================

        const direction =
            Math.atan2(
                dy,
                dx
            );


        if (
            lastDirection !== null
        ) {

            let difference =
                Math.abs(
                    direction -
                    lastDirection
                );


            if (
                difference >
                Math.PI
            ) {

                difference =
                    2 * Math.PI -
                    difference;

            }


            if (
                difference > 1
            ) {

                directionChanges++;

            }

        }


        lastDirection =
            direction;


        saveData();

        updateDashboard();

    }


    lastX = x;

    lastY = y;

    lastTime = now;

}


// ==========================================
// 🖱️ CLICK TRACKING
// ==========================================

document.addEventListener(
    "click",
    () => {

        if (!trackingEnabled) {

            return;

        }


        mouseClicks++;


        saveData();

        updateDashboard();

    },
    true
);


// ==========================================
// 🌡️ CHAOS ENGINE
// ==========================================

function calculateChaos() {

    const averageSpeed =
        speedSamples > 0
            ? totalSpeed /
              speedSamples
            : 0;


    let score = 0;


    // ======================================
    // CLICK CHAOS
    // ======================================

    score +=
        Math.min(
            25,
            mouseClicks * 1.25
        );


    // ======================================
    // DIRECTION CHAOS
    // ======================================

    score +=
        Math.min(
            25,
            directionChanges * 1.5
        );


    // ======================================
    // SPEED CHAOS
    // ======================================

    score +=
        Math.min(
            25,
            averageSpeed / 40
        );


    // ======================================
    // DISTANCE CHAOS
    // ======================================

    score +=
        Math.min(
            25,
            mouseDistance / 800
        );


    // ======================================
    // MOVEMENT BONUS
    // ======================================

    if (
        mouseMovements > 1000
    ) {

        score += 5;

    }


    return Math.round(
        Math.min(
            100,
            score
        )
    );

}


// ==========================================
// 🌡️ UPDATE CHAOS METER
// ==========================================

function updateChaosMeter(
    chaos
) {

    liveChaosScore.textContent =
        chaos;


    chaosFill.style.width =
        chaos + "%";


    if (chaos < 20) {

        chaosLabel.textContent =
            "🧘 Peaceful";

    }

    else if (chaos < 40) {

        chaosLabel.textContent =
            "😐 Mildly Suspicious";

    }

    else if (chaos < 60) {

        chaosLabel.textContent =
            "😳 Getting Weird";

    }

    else if (chaos < 80) {

        chaosLabel.textContent =
            "😡 Serious Chaos";

    }

    else if (chaos < 90) {

        chaosLabel.textContent =
            "🚨 Highly Unstable";

    }

    else {

        chaosLabel.textContent =
            "🤯 ABSOLUTE UNHINGED CHAOS";

    }

}


// ==========================================
// 🏆 ACHIEVEMENTS
// ==========================================

function updateAchievements(
    chaos
) {

    const averageSpeed =
        speedSamples > 0
            ? totalSpeed /
              speedSamples
            : 0;


    const achievements = {

        clicker:
            mouseClicks >= 10,

        speed:
            averageSpeed >= 500,

        distance:
            mouseDistance >= 5000,

        lost:
            directionChanges >= 15,

        chaos:
            chaos >= 90,

        zen:
            mouseMovements >= 10 &&
            mouseDistance < 800 &&
            mouseClicks < 8 &&
            directionChanges < 7

    };


    let unlocked = 0;


    Object.entries(
        achievements
    ).forEach(
        ([name, unlockedState]) => {


            const element =
                document.getElementById(
                    "achievement-" +
                    name
                );


            if (!element) {

                return;

            }


            if (unlockedState) {

                unlocked++;


                element.classList.add(
                    "unlocked"
                );

                element.classList.remove(
                    "locked"
                );


                // ==================================
                // NEW UNLOCK
                // ==================================

                if (
                    previousAchievementState[
                        name
                    ] === false ||
                    previousAchievementState[
                        name
                    ] === undefined
                ) {

                    element.classList.add(
                        "just-unlocked"
                    );


                    setTimeout(
                        () => {

                            element.classList.remove(
                                "just-unlocked"
                            );

                        },
                        900
                    );


                    announceAchievement(
                        name
                    );

                }

            }

            else {

                element.classList.add(
                    "locked"
                );

                element.classList.remove(
                    "unlocked"
                );

            }


            previousAchievementState[
                name
            ] =
                unlockedState;

        }
    );


    achievementCount.textContent =
        unlocked +
        " / 6";

}


// ==========================================
// 🏆 ACHIEVEMENT MESSAGE
// ==========================================

function announceAchievement(
    achievement
) {

    const messages = {

        clicker:
            "🏆 You unlocked Button Abuser. I'm concerned.",

        speed:
            "🏆 Speed Demon unlocked. Please slow down.",

        distance:
            "🏆 Mouse Marathon unlocked. Your mouse deserves a medal.",

        lost:
            "🏆 Completely Lost unlocked. Nobody knows where we're going.",

        chaos:
            "🏆 ABSOLUTE CHAOS unlocked. I am resigning.",

        zen:
            "🏆 Cursor Zen unlocked. Finally, some peace."

    };


    characterSpeak(
        messages[achievement]
    );


    bounceCharacter();

}


// ==========================================
// 📊 UPDATE DASHBOARD
// ==========================================

function updateDashboard() {

    const averageSpeed =
        speedSamples > 0
            ? totalSpeed /
              speedSamples
            : 0;


    const chaos =
        calculateChaos();


    distanceDisplay.textContent =
        Math.round(
            mouseDistance
        ) +
        " px";


    clicksDisplay.textContent =
        mouseClicks;


    movementsDisplay.textContent =
        mouseMovements;


    directionsDisplay.textContent =
        directionChanges;


    speedDisplay.textContent =
        Math.round(
            averageSpeed
        ) +
        " px/s";


    if (trackingEnabled) {

        therapyState.textContent =
            "ON";

        statusDisplay.textContent =
            "🧠 Therapist is watching you...";

    }

    else {

        therapyState.textContent =
            "OFF";

        statusDisplay.textContent =
            "😴 Therapy is currently inactive.";

    }


    updateChaosMeter(
        chaos
    );


    updateAchievements(
        chaos
    );


    therapistComment(
        averageSpeed
    );


    characterReaction(
        averageSpeed,
        chaos
    );

}


// ==========================================
// 🧠 THERAPIST COMMENTARY
// ==========================================

function therapistComment(
    averageSpeed
) {

    const comments = [];


    if (
        averageSpeed > 900
    ) {

        comments.push(
            "🚨 WHY ARE YOU RUNNING? THE MOUSE IS NOT ESCAPING."
        );

        comments.push(
            "🏎️ Your cursor is moving faster than your actual productivity."
        );

    }


    if (
        mouseClicks >= 20
    ) {

        comments.push(
            "😡 You clicked " +
            mouseClicks +
            " times. The button is not going to apologize."
        );

        comments.push(
            "🖱️ At this point you're not clicking. You're negotiating."
        );

    }

    else if (
        mouseClicks >= 8
    ) {

        comments.push(
            "👀 That's a suspicious amount of clicking."
        );

    }


    if (
        directionChanges >= 50
    ) {

        comments.push(
            "🌀 Your cursor has changed its mind " +
            directionChanges +
            " times."
        );

        comments.push(
            "🤔 Pick a direction. Any direction."
        );

    }

    else if (
        directionChanges >= 15
    ) {

        comments.push(
            "🌀 Your cursor seems slightly lost."
        );

    }


    if (
        mouseDistance >= 20000
    ) {

        comments.push(
            "🌍 You've traveled " +
            Math.round(
                mouseDistance
            ) +
            " pixels. Congratulations on your expedition."
        );

    }

    else if (
        mouseDistance >= 5000
    ) {

        comments.push(
            "👀 I'm starting to think your mouse gets more exercise than you."
        );

    }


    if (
        mouseDistance < 500 &&
        mouseMovements > 10
    ) {

        comments.push(
            "🧘 Very little movement. Your cursor has entered meditation mode."
        );

    }


    if (
        comments.length === 0
    ) {

        comments.push(
            "👀 Interesting... keep going."
        );

        comments.push(
            "🧠 I'm collecting evidence."
        );

        comments.push(
            "😐 Your cursor is behaving suspiciously normally."
        );

    }


    let message;


    do {

        message =
            comments[
                Math.floor(
                    Math.random() *
                    comments.length
                )
            ];

    }

    while (
        message ===
        lastTherapistComment &&
        comments.length > 1
    );


    lastTherapistComment =
        message;


    therapistMessage.textContent =
        message;

}


// ==========================================
// 🎭 CHARACTER REACTION
// ==========================================

function characterReaction(
    averageSpeed,
    chaos
) {

    const now =
        Date.now();


    if (
        now - lastReactionTime <
        1500
    ) {

        return;

    }


    let reaction;


    if (
        chaos >= 90
    ) {

        reaction = {

            emotion:
                "panic",

            message:
                "🤯 I'M A THERAPIST, NOT A MIRACLE WORKER!",

            status:
                "🤯 THERAPIST HAS LEFT THE CHAT."

        };

    }

    else if (
        chaos >= 70
    ) {

        reaction = {

            emotion:
                "angry",

            message:
                "😡 THIS CURSOR NEEDS TO CALM DOWN.",

            status:
                "😡 Chaos levels are unacceptable."

        };

    }

    else if (
        chaos >= 50
    ) {

        reaction = {

            emotion:
                "worried",

            message:
                "😳 Okay... this is getting concerning.",

            status:
                "😳 Therapist is taking notes."

        };

    }

    else if (
        directionChanges >= 15
    ) {

        reaction = {

            emotion:
                "confused",

            message:
                "🌀 WHERE ARE WE GOING?!",

            status:
                "🌀 Your cursor has no life plan."

        };

    }

    else if (
        averageSpeed >= 500
    ) {

        reaction = {

            emotion:
                "worried",

            message:
                "🏎️ SLOW DOWN! THIS ISN'T FORMULA 1.",

            status:
                "😳 Cursor velocity is concerning."

        };

    }

    else if (
        mouseClicks >= 10
    ) {

        reaction = {

            emotion:
                "angry",

            message:
                "😡 STOP CLICKING EVERYTHING!",

            status:
                "😡 The mouse button needs therapy."

        };

    }

    else {

        reaction = {

            emotion:
                "normal",

            message:
                "👀 I'm collecting evidence...",

            status:
                "😐 Emotionally stable."

        };

    }


    if (
        reaction.message ===
        lastCharacterReaction
    ) {

        return;

    }


    lastCharacterReaction =
        reaction.message;

    lastReactionTime =
        now;


    setCharacterEmotion(
        reaction.emotion
    );


    characterSpeak(
        reaction.message
    );


    characterStatus.textContent =
        reaction.status;


    if (
        reaction.emotion !==
        "normal"
    ) {

        bounceCharacter();

    }

}


// ==========================================
// 🧠 ANALYZE CURSOR
// ==========================================

function analyzeCursor() {

    const averageSpeed =
        speedSamples > 0
            ? totalSpeed /
              speedSamples
            : 0;


    let personality;

    let score;


    // ======================================
    // RAGE CLICKER
    // ======================================

    if (
        mouseClicks >= 8
    ) {

        personality = {

            icon:
                "😡",

            name:
                "Rage Clicker",

            description:
                "You clicked so many times that I'm starting to believe the website personally offended you."

        };


        score =
            Math.min(
                100,
                60 +
                mouseClicks * 2
            );

    }


    // ======================================
    // SPEED DEMON
    // ======================================

    else if (
        averageSpeed >= 500 ||
        mouseDistance >= 3000
    ) {

        personality = {

            icon:
                "🏎️",

            name:
                "Speed Demon",

            description:
                "Your cursor moves like it has somewhere extremely important to be. It doesn't."

        };


        score =
            Math.min(
                100,
                55 +
                Math.floor(
                    mouseDistance /
                    200
                )
            );

    }


    // ======================================
    // LOST SOUL
    // ======================================

    else if (
        directionChanges >= 15
    ) {

        personality = {

            icon:
                "🌀",

            name:
                "Lost Soul",

            description:
                "Your cursor changed direction so many times that even it has forgotten where it was going."

        };


        score =
            Math.min(
                100,
                50 +
                directionChanges * 2
            );

    }


    // ======================================
    // HESITATOR
    // ======================================

    else if (
        directionChanges >= 7
    ) {

        personality = {

            icon:
                "🤔",

            name:
                "Professional Hesitator",

            description:
                "You approach things confidently, reconsider everything, and then move somewhere completely different."

        };


        score =
            Math.min(
                100,
                40 +
                directionChanges * 3
            );

    }


    // ======================================
    // ZEN
    // ======================================

    else {

        personality = {

            icon:
                "🧘",

            name:
                "Zen Cursor",

            description:
                "Calm. Precise. Minimal movement. Your cursor has achieved enlightenment."

        };


        score =
            15;

    }


    // ======================================
    // DISPLAY RESULT
    // ======================================

    personalityIcon.textContent =
        personality.icon;


    personalityName.textContent =
        personality.name;


    personalityDescription.textContent =
        personality.description;


    chaosScore.textContent =
        score;


    result.classList.remove(
        "hidden"
    );


    reactToPersonality(
        personality,
        score
    );

}


// ==========================================
// 🎭 PERSONALITY REACTION
// ==========================================

function reactToPersonality(
    personality,
    score
) {

    if (
        personality.name ===
        "Rage Clicker"
    ) {

        setCharacterEmotion(
            "angry"
        );

        characterSpeak(
            "😡 We need to talk about your clicking."
        );

    }


    else if (
        personality.name ===
        "Speed Demon"
    ) {

        setCharacterEmotion(
            "worried"
        );

        characterSpeak(
            "🏎️ Please stop racing your mouse."
        );

    }


    else if (
        personality.name ===
        "Lost Soul"
    ) {

        setCharacterEmotion(
            "confused"
        );

        characterSpeak(
            "🌀 I'm also lost now."
        );

    }


    else if (
        personality.name ===
        "Professional Hesitator"
    ) {

        setCharacterEmotion(
            "confused"
        );

        characterSpeak(
            "🤔 You sure about that? ...No? Okay."
        );

    }


    else {

        setCharacterEmotion(
            "happy"
        );

        characterSpeak(
            "🧘 Finally. A cursor with inner peace."
        );

    }


    bounceCharacter();


    if (
        score >= 90
    ) {

        setTimeout(
            () => {

                characterSpeak(
                    "🚨 I'm recommending therapy... for ME."
                );

                setCharacterEmotion(
                    "panic"
                );

            },
            1800
        );

    }

}


// ==========================================
// 🧠 START / STOP THERAPY
// ==========================================

therapyBtn.addEventListener(
    "click",
    () => {

        trackingEnabled =
            !trackingEnabled;


        if (
            trackingEnabled
        ) {

            therapyBtn.textContent =
                "🛑 Stop Therapy";

            therapyBtn.classList.add(
                "active"
            );


            characterSpeak(
                "👀 Okay... I'm watching."
            );


            setCharacterEmotion(
                "normal"
            );


            lastX = null;

            lastY = null;

            lastTime = null;

            lastDirection = null;

        }

        else {

            therapyBtn.textContent =
                "🧠 Start Therapy";

            therapyBtn.classList.remove(
                "active"
            );


            characterSpeak(
                "😴 Therapy paused. I saw everything."
            );


            setCharacterEmotion(
                "normal"
            );

        }


        updateDashboard();

    }
);


// ==========================================
// 🔄 RESET SESSION
// ==========================================

resetBtn.addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "Reset your entire mouse therapy session?"
            );


        if (!confirmed) {

            return;

        }


        mouseDistance = 0;

        mouseClicks = 0;

        mouseMovements = 0;

        directionChanges = 0;

        totalSpeed = 0;

        speedSamples = 0;


        lastX = null;

        lastY = null;

        lastTime = null;

        lastDirection = null;


        localStorage.removeItem(
            "mouseTherapistData"
        );


        previousAchievementState =
            {};


        result.classList.add(
            "hidden"
        );


        characterSpeak(
            "🔄 Fresh session. Let's make questionable decisions again."
        );


        setCharacterEmotion(
            "normal"
        );


        updateDashboard();

    }
);


// ==========================================
// 🧠 ANALYZE BUTTON
// ==========================================

analyzeBtn.addEventListener(
    "click",
    () => {

        analyzeCursor();

    }
);


// ==========================================
// INITIALIZATION
// ==========================================

loadSavedData();

updateDashboard();

characterSpeak(
    "👀 I'm watching your cursor..."
);

setCharacterEmotion(
    "normal"
);