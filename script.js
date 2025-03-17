/* 🏆 トレンド投稿 */
function loadTrending() {
    let posts = ["旅行の思い出", "最近読んだ本", "おすすめの映画"];
    let trendingList = document.getElementById("trendingPosts");
    trendingList.innerHTML = posts.map(post => `<li>${post} ❤️ 100+ いいね</li>`).join("");
}

document.addEventListener("DOMContentLoaded", function() {
    loadPosts();
    loadHistory();
});

/* 📆 日付フォーマット関数 */
function getFormattedDate() {
    const date = new Date();
    return date.toLocaleString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
}

/* ✍ 投稿を追加 */
function submitPost() {
    let name = document.getElementById("username").value.trim() || "匿名";
    let content = document.getElementById("postContent").value.trim();
    if (!content) return;

    let postList = document.getElementById("postList");
    let li = document.createElement("li");
    li.className = "post-item";
    let date = getFormattedDate();

    li.innerHTML = `<strong>${name}さん：</strong> ${content} <span class="date">${date}</span>
        <button class="delete-btn" onclick="deletePost(this)">❌</button>`;
    
    postList.appendChild(li);
    savePosts();
    saveHistory(name, content, date);
    
    document.getElementById("username").value = "";
    document.getElementById("postContent").value = "";
}

/* 💾 投稿履歴を保存 */
function saveHistory(name, content, date) {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.push({ name, content, date });
    localStorage.setItem("history", JSON.stringify(history));
}

/* 📋 投稿履歴を管理ページで表示 */
function loadHistory() {
    let historyList = document.getElementById("historyList");
    historyList.innerHTML = "";

    let history = JSON.parse(localStorage.getItem("history")) || [];

    history.forEach((item, index) => {
        let li = document.createElement("li");
        li.className = "history-item";
        li.innerHTML = `<strong>${item.name}さん：</strong> ${item.content} <span class="date">${item.date}</span>
            <button class="delete-btn" onclick="deleteHistory(${index})">❌</button>`;
        historyList.appendChild(li);
    });
}

/* 🗑 投稿履歴を削除 */
function deleteHistory(index) {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.splice(index, 1);
    localStorage.setItem("history", JSON.stringify(history));
    loadHistory();
}

/* 🗑 投稿削除 */
function deletePost(button) {
    button.parentElement.remove();
    savePosts();
}

/* 💾 投稿をローカルストレージに保存 */
function savePosts() {
    let postList = document.getElementById("postList").innerHTML;
    localStorage.setItem("posts", postList);
}

/* 🔄 投稿をロード */
function loadPosts() {
    document.getElementById("postList").innerHTML = localStorage.getItem("posts") || "";
}
document.addEventListener("DOMContentLoaded", function() {
    loadTrendingPosts();
    loadLatestPosts();
});

/* 📌 ランダムな名前リスト */
const names = ["太郎", "花子", "翔太", "美咲", "健一", "玲奈", "直人", "彩香"];

/* 📌 ランダムな投稿内容リスト */
const topics = [
    "ゲーセンの話", "映画の感想", "今日のランチ", "お気に入りのカフェ", "最近ハマっているゲーム",
    "旅行の思い出", "買い物の戦利品", "カラオケの出来事", "スポーツ観戦", "アニメの話"
];

/* 📆 日付フォーマット関数 */
function getFormattedDate() {
    const date = new Date();
    return date.toLocaleString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
}

/* 🔥 トレンド投稿（ランダム表示） */
function loadTrendingPosts() {
    let list = document.getElementById("trendingPosts");
    list.innerHTML = ""; // クリア

    for (let i = 0; i < 3; i++) {
        let name = names[Math.floor(Math.random() * names.length)];
        let topic = topics[Math.floor(Math.random() * topics.length)];
        let date = getFormattedDate();

        let li = document.createElement("li");
        li.className = "post-item";
        li.innerHTML = `<strong>${name}さん：</strong> ${topic} <span class="date">${date}</span>`;
        list.appendChild(li);
    }
}

/* 🆕 最新投稿（ランダム表示） */
function loadLatestPosts() {
    let list = document.getElementById("latestPosts");
    list.innerHTML = ""; // クリア

    for (let i = 0; i < 5; i++) {
        let name = names[Math.floor(Math.random() * names.length)];
        let topic = topics[Math.floor(Math.random() * topics.length)];
        let date = getFormattedDate();

        let li = document.createElement("li");
        li.className = "post-item";
        li.innerHTML = `<strong>${name}さん：</strong> ${topic} <span class="date">${date}</span>`;
        list.appendChild(li);
    }
}
