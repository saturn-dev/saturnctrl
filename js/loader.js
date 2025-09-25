document.addEventListener("DOMContentLoaded", function() {
    const messages = [
        "Unlocking endless fun on Syft!",
        "Bypassing boredom, just for you!",
        "Preparing your ultimate gaming escape!",
        "Loading Syft – where games never stop!",
        "Getting ready to break the limits!",
        "Unblocking entertainment, stay tuned!",
        "Almost there, gaming freedom awaits!",
        "Setting up Syft, no restrictions included!",
        "Just a sec, fun incoming!",
        "Optimizing your experience – hang tight!",
        "Bringing you the best unblocked games!",
        "Clearing the way for non-stop play!",
        "Hold on, we're making Syft even better!",
        "Loading up endless possibilities!",
        "No firewalls can stop this fun!",
        "Gaming with no limits, just how you like it!",
        "Hang tight, adventure is about to begin!",
        "Pushing past restrictions for you!",
        "No blocks, just pure entertainment!",
        "Breaking barriers, launching Syft!",
        "Stay put, your escape is loading!",
        "A few more seconds to ultimate freedom!"
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const messageElement = document.createElement('p');
    messageElement.textContent = randomMessage;
    messageElement.id = 'random-message';

    const loader = document.getElementById('loader');
    loader.appendChild(messageElement);

    function hideLoader() {
        setTimeout(() => {
            loader.classList.add('fade-out');
            loader.addEventListener('transitionend', () => {
                loader.style.display = 'none';
                document.getElementById('content').style.display = 'block';
            });
        }, 1000);
    }

    window.addEventListener('load', hideLoader);
});
