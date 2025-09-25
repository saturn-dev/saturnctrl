function setTheme(theme) {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme !== theme) {
        localStorage.setItem('theme', theme);
        localStorage.setItem('showThemeNotification', 'true');
        localStorage.setItem('selectedThemeName', theme);
        location.reload();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const shouldShowNotif = localStorage.getItem('showThemeNotification');
    const rawThemeName = localStorage.getItem('selectedThemeName');

    if (shouldShowNotif === 'true' && rawThemeName) {
                const themename = rawThemeName
            .replace(/-/g, ' ')
            .replace(/9/g, '.')
            .replace(/\b\w/g, char => char.toUpperCase());

        setTimeout(() => {
            showNotification('Theme', `Successfully changed theme to ${themename}`, 4000, '#4ADE80');
            localStorage.removeItem('showThemeNotification');
            localStorage.removeItem('selectedThemeName');
        }, 1000);
    }
});


navigator.getBattery().then(battery => {
    const batteryLevel = Math.floor(battery.level * 100);
    const batteryIcon = document.getElementById("battery-icon");
    const batteryText = batteryLevel + "%";
    document.getElementById("battery-level").textContent = batteryText;

    batteryIcon.className = 'fa-solid'; 
    if (batteryLevel >= 75) {
        batteryIcon.classList.add("fa-battery-full");
    } else if (batteryLevel >= 50) {
        batteryIcon.classList.add("fa-battery-three-quarters");
    } else if (batteryLevel >= 25) {
        batteryIcon.classList.add("fa-battery-half");
    } else if (batteryLevel > 0) {
        batteryIcon.classList.add("fa-battery-quarter");
    } else {
        batteryIcon.classList.add("fa-battery-empty");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('theme', savedTheme);

        // Get the video element
        const video = document.getElementById('themeBackgroundVideo');
        
        // Handle video background based on the selected theme
        if (video) {
            if (savedTheme === "liquidmetal") {
                video.src = "/images/backgrounds/liquid-metal.mp4"; // Video for liquidmetal theme
                video.style.display = "block";
            } else if (savedTheme === "hacker2") {
                video.src = "/images/backgrounds/matrix.mp4"; // Video for hacker2 theme
                video.style.display = "block";
            } else {
                video.style.display = "none"; // Hide video for non-video themes
            }
        }
        if (savedTheme === "cosmic") {
            document.querySelectorAll("*").forEach(el => {
                if (window.getComputedStyle(el).backgroundColor === getComputedStyle(document.body).getPropertyValue("--background").trim()) {
                    el.style.background = "rgba(0, 0, 0, 0.5)";
                    el.style.backdropFilter = "blur(13px)";
                }
            });
            document.body.style.backgroundImage = "url('/images/backgrounds/dark.jpg')";
            document.body.style.backgroundSize = "cover"; // Ensure the image covers the entire page
            document.body.style.backgroundPosition = "center"; // Center the background image
            document.body.style.backgroundAttachment = "fixed"; // Prevent the image from scrolling with the page
            
        }

        if (savedTheme === "neo") {
            document.querySelectorAll("*").forEach(el => {
                if (window.getComputedStyle(el).backgroundColor === getComputedStyle(document.body).getPropertyValue("--background").trim()) {
                    el.style.background = "rgba(26, 29, 67, 0.5)";
                    el.style.backdropFilter = "blur(13px)";
                }
            });
            document.body.style.backgroundImage = "url('/images/backgrounds/neo.gif')";
            document.body.style.backgroundSize = "cover"; // Ensure the image covers the entire page
            document.body.style.backgroundPosition = "center"; // Center the background image
        }

        // Handle backdrop filter for liquidmetal theme
        if (savedTheme === "liquidmetal") {
            document.querySelectorAll("*").forEach(el => {
                if (window.getComputedStyle(el).backgroundColor === getComputedStyle(document.body).getPropertyValue("--background").trim()) {
                    el.style.background = "rgba(0, 0, 0, 0.5)";
                    el.style.backdropFilter = "blur(13px)";
                }
            });
        }

        // Handle backdrop filter for hacker2 theme
        if (savedTheme === "hacker2") {
            document.querySelectorAll("*").forEach(el => {
                if (window.getComputedStyle(el).backgroundColor === getComputedStyle(document.body).getPropertyValue("--background").trim()) {
                    el.style.background = "rgba(0, 0, 0, 0.5)";
                    el.style.backdropFilter = "blur(8px)";
                }
            });
        }
    }
});








const tabData = JSON.parse(localStorage.getItem('tab') || '{}');
if (tabData.title) document.title = tabData.title;
if (tabData.icon) document.querySelector('link[rel="icon"]').href = tabData.icon;

function setTitle(title = "Syft") {
    document.title = title;
    tabData.title = title;
    localStorage.setItem("tab", JSON.stringify(tabData));
}

function setFavicon(icon = "/icon.png") {
    document.querySelector("link[rel='icon']").href = icon;
    tabData.icon = icon;
    localStorage.setItem("tab", JSON.stringify(tabData));
}

function resetTab() {
    document.title = "Syft";
    document.querySelector("link[rel='icon']").href = "/icon.png";

    const titleInput = document.getElementById("title");
    const iconInput = document.getElementById("icon");
    if (titleInput) titleInput.value = "";
    if (iconInput) iconInput.value = "";
    localStorage.removeItem("tab");
    localStorage.setItem("showTabResetNotification", "true");
    location.reload();
}
window.addEventListener('DOMContentLoaded', () => {

    if (localStorage.getItem('showTabResetNotification') === 'true') {
        setTimeout(() => {
            showNotification('Reset Tab', 'Tab title and icon have been reset.', 4000, '#4ADE80'); // blue tone
            localStorage.removeItem('showTabResetNotification');
        }, 1000); 
    }
});



document.getElementById('settings')?.addEventListener('click', function(e) {
    e.preventDefault();
    const setting = document.getElementById('setting');
    const settingsIcon = document.getElementById('settings');
    
    if (!setting) return;
 settingsIcon.classList.toggle('open');
    
    setting.style.animation = 'none';
    setTimeout(() => {
        const isHidden = setting.style.display === 'none' || setting.style.display === '';
        setting.style.animation = isHidden ? 'slideIn 0.5s forwards' : 'slideOut 0.5s forwards';
        setting.style.display = isHidden ? 'block' : 'none';
        document.body.style.overflow = isHidden ? 'hidden' : 'auto';
    }, 10);
});



function setCloak(cloak) {
    const cloaks = {
        "canvas": ["Dashboard", "/images/cloak/canvas.png"],
        "google-classroom": ["Home", "/images/cloak/google-classroom.png"],
        "google": ["Google", "/images/cloak/google.png"],
        "google-drive": ["Home - Google Drive", "/images/googledrive.png"],
        "nearpod": ["Nearpod: You'll wonder how you taught without it", "/images/cloak/near-pod.png"]
    };

    if (cloaks[cloak]) {
        setTitle(cloaks[cloak][0]);
        setFavicon(cloaks[cloak][1]);

        localStorage.setItem("selectedCloak", cloak);
        localStorage.setItem("showCloakNotification", "true");

        location.reload();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const cloakKey = localStorage.getItem('selectedCloak');
    if (localStorage.getItem('showCloakNotification') === 'true' && cloakKey) {
        const formattedCloak = cloakKey
            .replace(/-/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());

        setTimeout(() => {
            showNotification('Enabled', `Successfully cloaked as ${formattedCloak}`, 4000, '#4ADE80'); // green
            localStorage.removeItem('showCloakNotification');
            localStorage.removeItem('selectedCloak');
        }, 1000);
    }
});


function showNotification(title, description, duration = 3000, color = '#ffffff') {
    const container = document.getElementById('notification-container');

    const notif = document.createElement('div');
    notif.className = 'notification';

    const fill = document.createElement('div');
    fill.className = 'fill-background';
    fill.style.animation = `shrink ${duration}ms linear forwards`;

    const bar = document.createElement('div');
    bar.className = 'left-bar';
    bar.style.backgroundColor = color;

    const content = document.createElement('div');
    content.className = 'notification-content';
    content.innerHTML = `
      <div class="notification-title">${title}</div>
      <div class="notification-desc">${description}</div>
    `;

    notif.appendChild(fill);
    notif.appendChild(bar);
    notif.appendChild(content);
    container.appendChild(notif);

    void notif.offsetWidth;
    notif.classList.add('show');

    const timeout = setTimeout(() => dismissNotification(notif), duration);

    notif.addEventListener('click', () => {
      clearTimeout(timeout);
      setTimeout(() => dismissNotification(notif), 400);
    });

    function dismissNotification(el) {
      el.classList.remove('show');
      setTimeout(() => el.remove(), 300);
    }
  }

  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes shrink {
      from { width: 100%; }
      to { width: 0%; }
    }
  `;
  document.head.appendChild(styleSheet);

  let sidebarVisible = localStorage.getItem('sidebarVisible') === 'true';
const openIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
       viewBox="0 0 24 24" fill="none" stroke="currentColor" 
       stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
       class="lucide lucide-panel-right-open-icon lucide-panel-right-open">
    <rect width="18" height="18" x="3" y="3" rx="2"/>
    <path d="M15 3v18"/>
    <path d="m10 15-3-3 3-3"/>
  </svg>`;

const closeIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
       viewBox="0 0 24 24" fill="none" stroke="currentColor" 
       stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
       class="lucide lucide-panel-right-close-icon lucide-panel-right-close">
    <rect width="18" height="18" x="3" y="3" rx="2"/>
    <path d="M15 3v18"/>
    <path d="m8 9 3 3-3 3"/>
  </svg>`;

window.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  const iconBtn = document.getElementById('sidebarToggle');

  sidebar.classList.toggle('hidden', !sidebarVisible);
  document.body.style.paddingLeft = sidebarVisible ? '200px' : '0px';
  iconBtn.innerHTML = sidebarVisible ? openIcon : closeIcon;
});
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const iconBtn = document.getElementById('sidebarToggle');

  sidebarVisible = !sidebarVisible;
  sidebar.classList.toggle('hidden', !sidebarVisible);
  document.body.style.paddingLeft = sidebarVisible ? '200px' : '0px';
  iconBtn.innerHTML = sidebarVisible ? openIcon : closeIcon;

  localStorage.setItem('sidebarVisible', sidebarVisible);
}
function home() {
    window.location.href = '/';
}



setInterval(showTime, 1000);

function showTime() {
  let time = new Date();
  let hour = time.getHours();
  let min = time.getMinutes();
  let ampm = hour >= 12 ? "" : "";

  hour = hour % 12;
  hour = hour ? hour : 12; // The hour '0' should be '12'
  min = min < 10 ? "0" + min : min;

  let currentTime = hour + ":" + min + " " + ampm;

  document.getElementById("clock").innerHTML = currentTime;
}

showTime();


setInterval(showDate, 1000);

function showDate() {
  let time = new Date();
  let month = time.getMonth(); 
  let day = time.getDate();   

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let currentDate = months[month] + " " + day;

  document.getElementById("date").innerHTML = currentDate;
}

showDate();
