import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB_FWYzohCfQvVvqqu1IwjLGv5iG2xphz0",
    authDomain: "lolkarakter-73f7a.firebaseapp.com",
    projectId: "lolkarakter-73f7a",
    storageBucket: "lolkarakter-73f7a.firebasestorage.app",
    messagingSenderId: "331087578640",
    appId: "1:331087578640:web:d4422cff93abb5447eec95"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const izinliKullanicilar = ["queri", "zecron"]; 

const loginArea = document.getElementById('login-area');
const backBtn = document.getElementById('back-btn');
const statsPanel = document.getElementById('stats-panel');
const searchInput = document.getElementById('search-input');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const mainTitle = document.getElementById('main-title');
const welcomeMsg = document.getElementById('welcome-msg');
const listeDiv = document.getElementById('liste');

let aktifKullanici = "";
let toplamKarakter = 0;

document.getElementById('start-btn').addEventListener('click', () => {
    const inputIsim = document.getElementById('username').value.trim().toLowerCase();
    
    if (!izinliKullanicilar.includes(inputIsim)) {
        alert("Listeye girmek için yaz bana dc:queriiw");
        return;
    }

    aktifKullanici = inputIsim;
    
    document.body.classList.add('logged-in');
    loginArea.style.display = "none";
    mainTitle.style.display = "none";
    
    welcomeMsg.innerText = (aktifKullanici === "queri") ? "QUERI BEY HOŞGELDINIZ." : "Z-ZECRON-CHAN!! BAKA!";
    
    welcomeMsg.style.display = "block";
    statsPanel.style.display = "flex";
    listeDiv.style.display = "grid";
    backBtn.style.display = "block";

    tumKarakterleriGetir();
});

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll('.char-item').forEach(item => {
        const name = item.querySelector('.char-name').innerText.toLowerCase();
        item.style.display = name.includes(term) ? "flex" : "none";
    });
});

backBtn.addEventListener('click', () => {
    document.body.classList.remove('logged-in');
    listeDiv.style.display = "none";
    welcomeMsg.style.display = "none";
    statsPanel.style.display = "none";
    backBtn.style.display = "none"; 
    mainTitle.style.display = "block";
    loginArea.style.display = "flex";
    aktifKullanici = ""; 
    document.getElementById('username').value = "";
    searchInput.value = ""; 
});

async function tumKarakterleriGetir() {
    try {
        const response = await fetch('https://ddragon.leagueoflegends.com/cdn/16.6.1/data/tr_TR/champion.json');
        const data = await response.json();
        const karakterler = Object.keys(data.data).sort();
        toplamKarakter = karakterler.length;
        listeyiYukle(karakterler);
        takipBaslat();
    } catch (error) {
        console.error("Veri çekme hatası oldu yaz bana:", error);
    }
}

function listeyiYukle(karakterler) {
    listeDiv.innerHTML = ""; 
    karakterler.forEach(isim => {
        const label = document.createElement('label');
        label.className = 'char-item';
        label.id = `card-${isim}`;
        const iconUrl = `https://ddragon.leagueoflegends.com/cdn/16.6.1/img/champion/${isim}.png`;
        
        label.innerHTML = `
            <div class="char-info">
                <img src="${iconUrl}" class="char-icon" onerror="this.src='https://via.placeholder.com/40'">
                <span class="char-name">${isim}</span>
            </div>
            <input type="checkbox" id="check-${isim}">
            <div class="checkmark"></div>
        `;
        listeDiv.appendChild(label);

        label.querySelector('input').addEventListener('change', async (e) => {
            if (!aktifKullanici) return;
            await setDoc(doc(db, "kullanici_listeleri", aktifKullanici), {
                [isim]: e.target.checked
            }, { merge: true });
        });
    });
}

function takipBaslat() {
    onSnapshot(doc(db, "kullanici_listeleri", aktifKullanici), (snapshot) => {
        if (snapshot.exists() && aktifKullanici) {
            const data = snapshot.data();
            let tamamlanan = 0;

            document.querySelectorAll('.char-item').forEach(card => {
                const isim = card.querySelector('.char-name').innerText;
                const checkbox = card.querySelector('input');
                const durum = data[isim] || false;

                checkbox.checked = durum;
                if(durum) {
                    card.classList.add('checked');
                    tamamlanan++;
                } else {
                    card.classList.remove('checked');
                }
            });

            const yuzde = Math.round((tamamlanan / toplamKarakter) * 100);
            progressFill.style.width = yuzde + "%";
            progressText.innerText = `${tamamlanan} / ${toplamKarakter} Şampiyon (%${yuzde})`;
        }
    });
}