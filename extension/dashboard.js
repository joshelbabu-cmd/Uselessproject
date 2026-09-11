// ==========================================
// 🧠 MOUSE MOVEMENT THERAPIST
// CHAOS ENGINE + DASHBOARD
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
// MEMORY
// ==========================================

let lastTherapistComment = "";

let lastCharacterReaction = "";

let lastReactionTime = 0;

let previousAchievementState = {};


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
// 🎬 BOUNCE CHARACTER
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
// 👀 EYES FOLLOW MOUSE
// ==========================================

document.addEventListener(
    "mousemove",
    (event) => {

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

    }
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
        Math.atan2(dy, dx);


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
// 🌡️ CHAOS ENGINE
// ==========================================

function calculateChaos(
    distance,
    clicks,
    movements,
    directions,
    averageSpeed
) {

    let score = 0;


    // ======================================
    // 🖱️ CLICK CHAOS
    // ======================================

    score +=
        Math.min(
            25,
            clicks * 1.25
        );


    // ======================================
    // 🌀 DIRECTION CHAOS
    // ======================================

    score +=
        Math.min(
            25,
            directions * 1.5
        );


    // ======================================
    // 🏎️ SPEED CHAOS
    // ======================================

    score +=
        Math.min(
            25,
            averageSpeed / 40
        );


    // ======================================
    // 🌍 DISTANCE CHAOS
    // ======================================

    score +=
        Math.min(
            25,
            distance / 800
        );


    // ======================================
    // 🧠 MOVEMENT BONUS
    // ======================================

    if (movements > 1000) {

        score += 5;

    }


    // ======================================
    // LIMIT SCORE
    // ======================================

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
    distance,
    clicks,
    movements,
    directions,
    averageSpeed,
    chaos
) {

    const achievements = {

        clicker:
            clicks >= 10,

        speed:
            averageSpeed >= 500,

        distance:
            distance >= 5000,

        lost:
            directions >= 15,

        chaos:
            chaos >= 90,

        zen:
            movements >= 10 &&
            distance < 800 &&
            clicks < 8 &&
            directions < 7

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


            if (!element) return;


            if (unlockedState) {

                unlocked++;


                element.classList.add(
                    "unlocked"
                );

                element.classList.remove(
                    "locked"
                );


                // ==================================
                // NEW ACHIEVEMENT
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
// 🏆 ACHIEVEMENT ANNOUNCER
// ==========================================

function announceAchievement(
    achievement
) {

    const messages = {

        clicker:
            "🏆 ACHIEVEMENT! You have officially abused the mouse button.",

        speed:
            "🏆 ACHIEVEMENT! Your cursor has discovered speed.",

        distance:
            "🏆 ACHIEVEMENT! Your mouse just completed a marathon.",

        lost:
            "🏆 ACHIEVEMENT! Your cursor is officially lost.",

        chaos:
            "🏆 ACHIEVEMENT! THIS IS NO LONGER A CURSOR. THIS IS CHAOS.",

        zen:
            "🏆 ACHIEVEMENT! Your cursor has achieved enlightenment."

    };


    characterSpeak(
        messages[achievement]
    );


    bounceCharacter();

}


// ==========================================
// 📊 LOAD STATISTICS
// ==========================================

function loadStats() {

    chrome.storage.local.get(
        [
            "trackingEnabled",
            "mouseDistance",
            "mouseClicks",
            "mouseMovements",
            "directionChanges",
            "totalSpeed",
            "speedSamples"
        ],
        (data) => {


            const distance =
                data.mouseDistance || 0;

            const clicks =
                data.mouseClicks || 0;

            const movements =
                data.mouseMovements || 0;

            const directions =
                data.directionChanges || 0;

            const totalSpeed =
                data.totalSpeed || 0;

            const speedSamples =
                data.speedSamples || 0;


            const averageSpeed =
                speedSamples > 0
                    ? totalSpeed /
                      speedSamples
                    : 0;


            // ==================================
            // UPDATE NUMBERS
            // ==================================

            distanceDisplay.textContent =
                Math.round(distance) +
                " px";


            clicksDisplay.textContent =
                clicks;


            movementsDisplay.textContent =
                movements;


            directionsDisplay.textContent =
                directions;


            speedDisplay.textContent =
                Math.round(
                    averageSpeed
                ) +
                " px/s";


            // ==================================
            // THERAPY STATUS
            // ==================================

            if (
                data.trackingEnabled
            ) {

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


            // ==================================
            // CALCULATE CHAOS
            // ==================================

            const chaos =
                calculateChaos(
                    distance,
                    clicks,
                    movements,
                    directions,
                    averageSpeed
                );


            updateChaosMeter(
                chaos
            );


            // ==================================
            // ACHIEVEMENTS
            // ==================================

            updateAchievements(
                distance,
                clicks,
                movements,
                directions,
                averageSpeed,
                chaos
            );


            // ==================================
            // COMMENTARY
            // ==================================

            therapistComment(
                distance,
                clicks,
                movements,
                directions,
                averageSpeed
            );


            // ==================================
            // CHARACTER
            // ==================================

            characterReaction(
                distance,
                clicks,
                movements,
                directions,
                averageSpeed,
                chaos
            );

        }
    );

}


// ==========================================
// INITIAL LOAD
// ==========================================

loadStats();


// ==========================================
// LIVE UPDATES
// ==========================================

chrome.storage.onChanged.addListener(
    () => {

        loadStats();

    }
);


// ==========================================
// 🧠 CHARACTER REACTION ENGINE
// ==========================================

function characterReaction(
    distance,
    clicks,
    movements,
    directions,
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


    // ======================================
    // 🤯 EXTREME
    // ======================================

    if (chaos >= 90) {

        reaction = {

            emotion:
                "panic",

            message:
                "🤯 I'M A THERAPIST, NOT A MIRACLE WORKER!",

            status:
                "🤯 THERAPIST HAS LEFT THE CHAT."

        };

    }


    // ======================================
    // 😡 HIGH CHAOS
    // ======================================

    else if (chaos >= 70) {

        reaction = {

            emotion:
                "angry",

            message:
                "😡 THIS CURSOR NEEDS TO CALM DOWN.",

            status:
                "😡 Chaos levels are unacceptable."

        };

    }


    // ======================================
    // 😳 MEDIUM CHAOS
    // ======================================

    else if (chaos >= 50) {

        reaction = {

            emotion:
                "worried",

            message:
                "😳 Okay... this is getting concerning.",

            status:
                "😳 Therapist is taking notes."

        };

    }


    // ======================================
    // 🌀 DIRECTION CHAOS
    // ======================================

    else if (directions >= 15) {

        reaction = {

            emotion:
                "confused",

            message:
                "🌀 WHERE ARE WE GOING?!",

            status:
                "🌀 Your cursor has no life plan."

        };

    }


    // ======================================
    // 🏎️ SPEED
    // ======================================

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


    // ======================================
    // 😡 CLICKS
    // ======================================

    else if (
        clicks >= 10
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


    // ======================================
    // 🧘 CALM
    // ======================================

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


    // ======================================
    // PREVENT SPAM
    // ======================================

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
// 🧠 ANALYZE BUTTON
// ==========================================

analyzeBtn.addEventListener(
    "click",
    () => {

        chrome.storage.local.get(
            [
                "mouseDistance",
                "mouseClicks",
                "mouseMovements",
                "directionChanges",
                "totalSpeed",
                "speedSamples"
            ],
            (data) => {


                const distance =
                    data.mouseDistance || 0;

                const clicks =
                    data.mouseClicks || 0;

                const movements =
                    data.mouseMovements || 0;

                const directions =
                    data.directionChanges || 0;

                const totalSpeed =
                    data.totalSpeed || 0;

                const speedSamples =
                    data.speedSamples || 0;


                const averageSpeed =
                    speedSamples > 0
                        ? totalSpeed /
                          speedSamples
                        : 0;


                const chaos =
                    calculateChaos(
                        distance,
                        clicks,
                        movements,
                        directions,
                        averageSpeed
                    );


                analyzeCursor(
                    distance,
                    clicks,
                    movements,
                    directions,
                    averageSpeed,
                    chaos
                );

            }
        );

    }
);


// ==========================================
// 🧠 PERSONALITY ANALYZER
// ==========================================

function analyzeCursor(
    distance,
    clicks,
    movements,
    directions,
    averageSpeed,
    chaos
) {

    let personality;

    let score;


    // ======================================
    // 😡 RAGE CLICKER
    // ======================================

    if (clicks >= 8) {

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
                60 + clicks * 2
            );

    }


    // ======================================
    // 🏎️ SPEED DEMON
    // ======================================

    else if (
        averageSpeed >= 500 ||
        distance >= 3000
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
                    distance / 200
                )
            );

    }


    // ======================================
    // 🌀 LOST SOUL
    // ======================================

    else if (
        directions >= 15
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
                directions * 2
            );

    }


    // ======================================
    // 🤔 HESITATOR
    // ======================================

    else if (
        directions >= 7
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
                directions * 3
            );

    }


    // ======================================
    // 🧘 ZEN
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
    // DISPLAY
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


    // ======================================
    // CHARACTER
    // ======================================

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


    if (score >= 90) {

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
// 🧠 THERAPIST COMMENTARY
// ==========================================

function therapistComment(
    distance,
    clicks,
    movements,
    directions,
    averageSpeed
) {

    const comments = [];


    if (averageSpeed > 900) {

        comments.push(
            "🚨 WHY ARE YOU RUNNING? THE MOUSE IS NOT ESCAPING."
        );

        comments.push(
            "🏎️ Your cursor is moving faster than your actual productivity."
        );

    }


    if (clicks >= 20) {

        comments.push(
            "😡 You have clicked " +
            clicks +
            " times. The button is not going to apologize."
        );

        comments.push(
            "🖱️ At this point you're not clicking. You're negotiating."
        );

    }

    else if (clicks >= 8) {

        comments.push(
            "👀 That's a suspicious amount of clicking."
        );

    }


    if (directions >= 50) {

        comments.push(
            "🌀 Your cursor has changed its mind " +
            directions +
            " times."
        );

        comments.push(
            "🤔 Pick a direction. Any direction."
        );

    }

    else if (directions >= 15) {

        comments.push(
            "🌀 Your cursor seems slightly lost."
        );

    }


    if (distance >= 20000) {

        comments.push(
            "🌍 You've traveled " +
            Math.round(distance) +
            " pixels. Congratulations on your expedition."
        );

        comments.push(
            "😐 That's a lot of movement for a stationary human."
        );

    }

    else if (distance >= 5000) {

        comments.push(
            "👀 I'm starting to think your mouse gets more exercise than you."
        );

    }


    if (
        distance < 500 &&
        movements > 10
    ) {

        comments.push(
            "🧘 Very little movement. Your cursor has entered meditation mode."
        );

    }


    if (comments.length === 0) {

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