let completedTasks = parseInt(localStorage.getItem("completedTasks") || 0);
let referrals = parseInt(localStorage.getItem("referrals") || 0);
let earnedPoints = parseFloat(localStorage.getItem("earnedPoints") || 0.00);

document.getElementById('completed-tasks').textContent = completedTasks;
document.getElementById('referrals').textContent = referrals;

function updateProgress() {
    const progress = (completedTasks % 100) + "%";
    document.getElementById('progress').style.width = progress;
    document.getElementById('progress').textContent = progress;
}

document.getElementById('watch-ad-btn').addEventListener('click', function () {
    if (typeof show_9084770 === 'function') {
        show_9084770().then(() => {
            completedTasks++;
            earnedPoints += 0.5;
            localStorage.setItem('completedTasks', completedTasks);
            localStorage.setItem('earnedPoints', earnedPoints.toFixed(2));
            document.getElementById('completed-tasks').textContent = completedTasks;
            updateProgress();
            alert("✅ Ad Watched! Earned 0.5 Points.");
        }).catch(err => console.error("Ad failed to load", err));
    } else {
        console.warn("Ad function is not available.");
    }
});

document.getElementById('invite-btn').addEventListener('click', function () {
    referrals++;
    earnedPoints += 1.0;
    localStorage.setItem('referrals', referrals);
    localStorage.setItem('earnedPoints', earnedPoints.toFixed(2));
    document.getElementById('referrals').textContent = referrals;
    alert("🎉 Friend Invited! Earned 1 Point.");
});

document.getElementById('withdraw-btn').addEventListener('click', function () {
    const amount = prompt("Enter amount to withdraw:");
    if (amount > earnedPoints) {
        alert("❌ Insufficient balance!");
    } else {
        earnedPoints -= amount;
        localStorage.setItem('earnedPoints', earnedPoints.toFixed(2));

        // ✅ Telegram Mini App Message System
        const botToken = "YOUR_BOT_TOKEN"; // 🛑 Replace with your actual bot token
        const chatId = "YOUR_CHAT_ID"; // 🛑 Replace with your Telegram Chat ID

        const message = `📢 Withdrawal Request:\n💰 Amount: ${amount} BDT\n👤 User: ${chatId}`;
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`)
            .then(response => response.json())
            .then(data => alert("✅ Withdraw Request Sent to Admin!"))
            .catch(error => console.error("Telegram API Error:", error));
    }
});

updateProgress();
