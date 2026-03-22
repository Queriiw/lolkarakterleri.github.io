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

const izinliKullanicilar = ["queri", "zecron", "amkench"]; 

const replikler = [
    { metin: "Anakin tv kalp krizi AHHH AHHHH!", sampiyon: "Queri" },
    { metin: "Ya ölümcül tempo ne kanka ya.", sampiyon: "AmKench" },
    { metin: "Tabi sitelerle oynamayı biliyor.", sampiyon: "Zecron" },
    { metin: "Ne mutlu Türküm diyene!", sampiyon: "Atatürk" },
    { metin: "Zırla lan zırla.", sampiyon: "O Adam İşte" },
    { metin: "Kesinkin sagaKAN is good to tnask.", sampiyon: "Queri" },
    { metin: "Şerefsiz ya.", sampiyon: "Elraenn" },
    { metin: "Bip Bip.", sampiyon: "Delusion" },
    { metin: "The winner takes it all, the loser has to fall.", sampiyon: "ABBA" },
    { metin: "Tuvalet tıkandı.", sampiyon: "Mete" },
    { metin: "ShotMini.", sampiyon: "AmKench" },
    { metin: " ", sampiyon: "Klavyem" },
    { metin: "Aishite aishite.", sampiyon: "Ado" },
    { metin: "Ses yankıları.", sampiyon: "Zecron ve AmKench" },
    { metin: "Öleceğim öleceğim öleceğim.", sampiyon: "Mimic Köpek" },
    { metin: "Klavye vurma sesi.", sampiyon: "Queri" },
    { metin: "AHH kitabını.", sampiyon: "Zecron" },
    { metin: "İstiyorum istiyorum seninle lol girmeyi her şeyden çok istiyorum sıdkı-chan.", sampiyon: "Zecron" },
    { metin: "Samira bana kızdın mı sen?", sampiyon: "AmKench" },
    { metin: "Peyami safanın bıyığı", sampiyon: "Queri" },
    { metin: "Goryus atar mısın?", sampiyon: "Queri" },
    { metin: "SUUUS!", sampiyon: "AmKench" },
    { metin: "Herkes kendine yakışanı yapsın usta.", sampiyon: "Taksici Musa" },
];

const loginArea = document.getElementById('login-area');
const backBtn = document.getElementById('back-btn');
const statsPanel = document.getElementById('stats-panel');
const searchInput = document.getElementById('search-input');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const mainTitle = document.getElementById('main-title');
const welcomeMsg = document.getElementById('welcome-msg');
const listeDiv = document.getElementById('liste');
const quoteDiv = document.getElementById('quote-container');
const refreshBtn = document.getElementById('refresh-quote');

let aktifKullanici = "";
let toplamKarakter = 0;
let aktifSes = null;
let unsubscribe = null; 

function sesCal(dosyaYolu) {
    if (aktifSes) {
        aktifSes.pause();
        aktifSes.currentTime = 0;
    }
    aktifSes = new Audio(dosyaYolu);
    aktifSes.play().catch(e => {});
}

document.getElementById('start-btn').addEventListener('click', () => {
    const inputIsim = document.getElementById('username').value.trim().toLowerCase();
    
    if (!izinliKullanicilar.includes(inputIsim)) {
        sesCal('sf/dscnt.mp3');
        alert("Listeye girmek için yaz bana dc:queriiw");
        return;
    }

    if (unsubscribe) unsubscribe();

    sesCal('sf/click.mp3');
    
    aktifKullanici = inputIsim;
    document.body.classList.add('logged-in');
    
    loginArea.style.display = "none";
    mainTitle.style.display = "none";
    if (quoteDiv) quoteDiv.style.display = "none";
    if (refreshBtn) refreshBtn.style.display = "none";
    
    const mesajlar = {
        "queri": "QUERI BEY HOŞGELDINIZ, KRALIN YERİ HAZIR.",
        "zecron": "Z-ZECRON-CHAN!! BAKA! YİNE Mİ SEN?",
        "amkench": "YİNE FEEDLİCEK...  "
    };
    welcomeMsg.innerText = mesajlar[aktifKullanici] || `HOŞGELDİN ${aktifKullanici.toUpperCase()}!`;
    
    welcomeMsg.style.display = "block";
    statsPanel.style.display = "flex";
    listeDiv.style.display = "grid";
    backBtn.style.display = "block";

    tumKarakterleriGetir();
});

document.getElementById('username').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('start-btn').click();
    }
});

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll('.char-item').forEach(item => {
        const name = item.querySelector('.char-name').innerText.toLowerCase();
        item.style.display = name.includes(term) ? "flex" : "none";
    });
});

backBtn.addEventListener('click', () => {
    if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
    }
    listeDiv.innerHTML = ""; 

    window.scrollTo(0, 0);
    document.body.classList.remove('logged-in');
    
    listeDiv.style.display = "none";
    welcomeMsg.style.display = "none";
    statsPanel.style.display = "none";
    backBtn.style.display = "none"; 

    mainTitle.style.display = "";
    loginArea.style.display = "";
    if (quoteDiv) quoteDiv.style.display = "";
    if (refreshBtn) refreshBtn.style.display = "";

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
        console.error(error);
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

            if (e.target.checked) {
                sesCal('sf/done.mp3');
            }

            await setDoc(doc(db, "kullanici_listeleri", aktifKullanici), {
                [isim]: e.target.checked
            }, { merge: true });
        });
    });
}

function takipBaslat() {
    unsubscribe = onSnapshot(doc(db, "kullanici_listeleri", aktifKullanici), (snapshot) => {
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

const videoElement = document.getElementById('bg-video');
const videoListesi = ["img/tahm-kench.mp4", "img/xerath.mp4", "img/twitch.mp4", "img/lucian.mp4", "img/zoe.mp4", "img/masteryi.mp4", "img/ryze.mp4"];

function rastgeleVideoOynat() {
    const rastgeleIndex = Math.floor(Math.random() * videoListesi.length);
    videoElement.src = videoListesi[rastgeleIndex];
    videoElement.play().catch(e => {});
}

videoElement.onended = rastgeleVideoOynat;

document.querySelector('.user-box').addEventListener('mouseenter', () => {
    if (videoElement.paused) {  
        videoElement.play();
    }
});

rastgeleVideoOynat();

function rastgeleReplikYaz() {
    if (quoteDiv) {
        const secilen = replikler[Math.floor(Math.random() * replikler.length)];
        quoteDiv.innerHTML = `"${secilen.metin}" — <strong>${secilen.sampiyon}</strong>`;
    }
}

if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
        rastgeleReplikYaz();
    });
}

rastgeleReplikYaz();