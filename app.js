import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, setDoc, onSnapshot, collection, addDoc, deleteDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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
    { metin: "Sana söylediğim 5 şeyi say lan.", sampiyon: "Queri" },
    { metin: "Discord ip'nden bulurum seni.", sampiyon: "Mahmut Yıldırım" },
    { metin: "Bebek ağlama sesleri.", sampiyon: "Bebekler" },
    { metin: "/kiss queri.", sampiyon: "Discord" },
    { metin: "Queri maçında iyi gidiyormuş?.", sampiyon: "Zecron" },
    { metin: "Conquest ile savaştım.", sampiyon: "Oliver" },
    { metin: "I woke up in the middle of the night.", sampiyon: "Akon" }
];

const kullaniciHikayeleri = {
    queri: [
        "Runeterra sisinin içinden gelen stratejist bu gece yine harita üstünde ince ince iz bırakıyor. Rakipler sadece minyon dalgasını görürken o, adeta Better Call Saul'daki Jimmy gibi en zayıf noktayı bulup oyunu oradan yıkıyor; yavaş, sabırlı ve geri dönülmez bir planla.",
        "Koridorda sakin, draft ekranında kesin. Queri bazen bir hamleyi o kadar geciktiriyor ki herkes unuttu sanırken bir anda Breaking Bad finalindeki o soğuk netlikle perdeyi kapatıyor; ne bağırış ne gösteriş, sadece kusursuz zamanlama.",
        "Bazı geceler totemin gölgesi bile bilgi verir, Queri bunu herkesten iyi bilir. Dexter'ın sahneye çıktığındaki o sessiz dikkatle etrafı okur, sonra bir anda görünmez bir çizgi çeker: bu çizginin ötesinde oyun artık onun hikayesidir.",
        "Takım savaşı başlamadan saniyeler önce bir sessizlik olur ya, işte orada Queri'nin zihni Invincible'daki büyük çarpışmalar gibi çalışır; sert, acımasız ama net. Kim nerede duracak, kim neyi feda edecek, hepsi daha o an yazılmıştır.",
        "Rakipler skora bakıp önde olduğunu sanar, Queri ise ritme bakar. Cowboy Bebop'taki o melankolik ama karizmatik hava gibi oyunun temposunu tersine çevirir; bir anda her şey aynı ama sonuç tamamen farklıdır.",
        "Herkes mekaniğe odaklandığında o hikayeye odaklanır. Bir lane'in neden düşmesi gerektiğini, hangi objective'in neden şimdi alınacağını açıklamasa da hissettirir; adeta bir satranç tahtasında Gojo'nun özgüveniyle ama Lelouch'un sabrıyla yürür.",
        "Queri bazen hiç konuşmadan takımı yönetir. Sadece bir ping, bir geri çekilme, bir bekleme. Sonra Naruto'daki savaş anları gibi herkes doğru anda doğru yerde olur ve izleyenler bunu şans sanır.",
        "Bu gece Rift'te hava ağır, ama Queri için bu sadece bir avantaj. Sezonlarca biriken alışkanlıklarla, Saul'un mahkeme salonundaki ince manevraları gibi, kaosu düzene çevirip rakibin tüm güvenini adım adım eritir.",
        "Kimi oyuncu öne çıkmak ister, Queri oyunun kendisini öne çıkarır. Bir kule, bir ejder, bir reset; hepsi tek zincirin halkaları olur. Finalde ise sadece sonuç kalır: kimse nasıl olduğunu tam anlayamaz ama herkes ne olduğunu bilir.",
        "Rift'in ortasında bir an gelir, herkes aynı anda karar vermek zorunda kalır. Queri o anda blink atmaz, acele etmez; Bleach'teki kaptanlar gibi önce nabzı ölçer, sonra tek hamlede tüm dengeyi kendi tarafına çeker.",
        "Bazen tam bir retro anime finali gibidir: düşük canlar, karışık sesler, her yerde efekt. Ama Queri'nin kamerası hiç titremez; hedef bellidir, rota bellidir, son çizgiye giden yol bellidir.",
        "Plan yaparken duyguyu değil zamanı takip eder. Dexter'ın karanlık sabrı ile Invincible'ın sert gerçekliği arasında bir yerde, hatayı affetmeyen ama gereksiz riske de girmeyen bir disiplinle ilerler.",
        "Queri için maç, sadece kazanılıp çıkılan bir ekran değil; adım adım kurulan bir gerilim dizisidir. Better Call Saul'un yavaş yavaş tırmandıran temposu gibi önce alan açar, sonra o alanı rakibin nefes alamadığı bir kafese çevirir.",
        "Dakikalar ilerledikçe Queri'nin sakinliği daha da ağırlaşır. Rakip ani kararlarla hızlanmaya çalışırken o, Breaking Bad'deki o meşhur soğuklukla her detayı aynı masaya koyar ve en doğru hamleyi bekler.",
        "Bir anime finalinde olduğu gibi herkes bağırıp çağırırken Queri'nin en büyük gücü susup okumak olur. Fight başlamadan önce kimin nerede düşeceğini tahmin eder, sonra sadece sahnenin gerçeğe dönüşmesini izler.",
        "Takım dağılıyor gibi göründüğünde bile Queri'nin pusulası şaşmıyor. Bir objective etrafında kurduğu kontrol, Dexter'ın laboratuvar disiplini kadar net; bir gram eksik, bir gram fazla değil.",
        "Queri bazen hiç öne çıkmadan en büyük etkiyi bırakır. Arcane'in sahne geçişleri gibi, görünmeyen bağlantılar kurar; bir lane'deki baskıyı diğer lane'deki avantaja çevirip oyunu tek parçaya dönüştürür."
    ],
    zecron: [
        "Gece queue'sunun asi savaşçısı Zecron oyuna girdiğinde her şey bir tık daha hızlanır. Invincible'daki savaşlar gibi sert, ani ve acımasız bir tempoyla rakibin rahat nefes alacağı tek bir boşluk bile bırakmaz.",
        "Ping sesi gelir gelmez Zecron'un zihni açılır; mekanikler bir anda Attack on Titan'daki manevra setleri gibi keskinleşir. Her hareketinde risk vardır ama o riski bir korku değil, yakıt gibi kullanır.",
        "Tiltin kıyısından dönmeyi bilir çünkü o kaosla kavga etmez, kaosla anlaşır. Breaking Bad'deki 'i am the one who knocks' hissiyle fight'a girer ve oyunun ritmini kendi yumruğunun temposuna göre değiştirir.",
        "Koridor darsa onun için sorun değildir; dar alan Zecron'un oyun alanıdır. Jujutsu Kaisen'deki alan genişletme sahneleri gibi bir anda herkesin seçeneklerini kapatır, kendi seçeneğini tek yol haline getirir.",
        "Rakipler haritayı okuyorum sanırken Zecron sahnenin arkasında başka bir senaryo yazar. Better Call Saul'daki beklenmedik dönüşler gibi, en güvenli görünen pozisyonu bir anda en tehlikeli noktaya çevirir.",
        "Zecron için fight bir refleks testi değil, bir karakter testi. Baskı anında kim dağılacak kim ayakta kalacak çok iyi bilir; sonra bir dash, bir skill, bir flash ve tablo tamamen değişir.",
        "Bazen oyunu kazanmak için kusursuz olman gerekmez, cesur olman gerekir. Zecron bu çizgide yürür; Tokyo Revengers tadında kırık ama inatçı bir enerjiyle geri döner ve maçın merkezine oturur.",
        "Herkes kontrollü oynarken Zecron'un cesareti rahatsız eder. Dexter'ın soğuk sakinliğiyle değil, tam tersine bir fırtına gibi gelir; ama o fırtınada bile kendi açısını bulur ve asla rotasını kaybetmez.",
        "Bu gece mekanikler açık, özgüven yüksek, kalp hızı sabit. Zecron bir hamle önce hissettirir, iki hamle sonra cezalandırır; izleyenler rastgele sanır ama bu kaosun bile bir geometrisi olduğunu anlamaz.",
        "Ne zaman oyun kırılsa adını orada görürsün. Bazen tek bir pozisyonla, bazen üst üste gelen delice kararlarla Zecron 'olmaz' deneni oldurur ve Rift'e kendi imzasını atar.",
        "Sahne karanlıkken en parlak olan bazen en sessiz olan değildir. Zecron sesli oynar, sert oynar, hızlı oynar; ama her hamlesinde bir anime finalindeki kararlılık vardır.",
        "Bir fight başlar ve bir an gelir: herkes geri çekilmeyi düşünür. Zecron o anda ileri gider, çünkü bazen oyunu kazanan şey mekanik değil inat olur; o inat da onda fazlasıyla vardır.",
        "Zecron'un oyunu bir aksiyon filmi gibi açılır: önce hızlı bir giriş, sonra keskin bir kovalamaca, sonunda da kimsenin beklemediği bir ters köşe. Rakip onun temposuna ayak uyduramadığında oyun kendiliğinden kırılır.",
        "Bazı anlarda Zecron, Attack on Titan'ın dar sokaklarındaki manevra hissini Rift'e taşır. Daracık alanda bile alan açmayı bilir, sonra tek bir pencere bulup tüm savaşı oradan içeri sokar.",
        "Kötü giden bir maçın ortasında bile özgüvenini kaybetmez; bu da onu tehlikeli yapar. Breaking Bad'deki geri dönüş anları gibi, önce sessizce toparlar sonra bir anda kontrolü tümden ele geçirir.",
        "Harita karanlık olduğunda pek çok kişi beklemeyi seçer, Zecron ise bilgi toplar. Küçük bir hareketten büyük sonuç çıkarır ve Better Call Saul'daki ince manipülasyon gibi oyunu yumuşak ama kesin bir şekilde döndürür.",
        "Sahnede gerilim arttıkça Zecron daha net görür. Bu yüzden en kritik fight'ta elleri titremez; bir anime turnuva finalindeki gibi tüm gürültü susar ve sadece içgüdü ile mekanik kalır."
    ],
    amkench: [
        "Amkench oyuna girdiğinde skor tahtası tek başına hiçbir şey anlatmaz. Çünkü o, bir bölüm boyunca dağınık gidip finalde herkesi ters köşede bırakan diziler gibi, en gerekli anda sahnenin merkezine oturmayı iyi bilir.",
        "Moral düştüğünde ses açılır ve kahkaha gelir; tam o anda enerji değişir. Invincible'ın kırık ama güçlü tonu gibi, sertlik ve mizah aynı çizgide birleşir ve takım savaşı bir anda başka bir hikayeye döner.",
        "Erken oyunda riskli, orta oyunda inatçı, geç oyunda beklenmedik derecede etkili. Amkench bazen Dexter'ın disiplininden uzak görünür ama kriz anında şaşırtıcı bir soğukkanlılıkla doğru hedefe kilitlenir.",
        "Rakip onun hangi hamleyi yapacağını çözdüğünü sanır, o sırada Amkench yeni bir çılgınlıkla oyunu canlandırır. Bu çılgınlık bazen hatadır, bazen dahiyane bir açıdır; ama asla sıradan değildir.",
        "Bir lane'de düşüp bir lane'de kalkar, sonra bir anda takımın taşıyıcı gücüne dönüşür. Breaking Bad'deki Walter gibi değişimini adım adım değil, bir anda hissettirir: artık başka bir mod açılmıştır.",
        "Amkench'in oyunu bazen bir komedi, bazen bir gerilim bölümü gibidir. Bir saniye gülersin, diğer saniye herkesin kaderini belirleyen hamleyi yapar ve ses kanalında tam bir kaos konseri başlar.",
        "Baskı altında dağılmak yerine daha çok dener, daha çok zorlar. Better Call Saul'un asla bitmeyen savunma refleksi gibi, kötü pozisyonu iyi bir fırsata çevirene kadar vazgeçmez.",
        "Fight'a girerken matematik değil sezgi konuşur. Bu yüzden izleyenler bazen 'niye girdi' der ama iki saniye sonra kill feed değişince herkesin tonu bir anda yumuşar.",
        "Onunla oynanan maçlarda düz bir çizgi yoktur; sadece iniş, çıkış ve bir yerde patlayan o büyük geri dönüş vardır. Anime turnuva arc'ı gibi, son ana kadar hikaye kapanmaz.",
        "Amkench bazen fazla cesur, bazen fazla inatçı, bazen de tam gereken kadar delidir. Ama bir şey hep aynı kalır: oyunu bırakmaz ve bırakmadığı için de bir ihtimal hep yaşar.",
        "Takım savaşının en karışık anında bir ses duyulur: 'giriyorum'. O an herkesin kalp ritmi değişir çünkü Amkench'in o cümlesi bazen felaketin bazen efsanenin açılış cümlesidir.",
        "Rift'te çizgiler net değilse Amkench kendine yeni bir çizgi çizer. Hata yapabilir ama asla dönüp beklemez; old-school aksiyon filmleri gibi hep ileride, hep gazda kalır.",
        "Maç uzadıkça Amkench'in enerjisi düşmez, tersine yükselir. Bir an gelir ve başta kimsenin ciddiye almadığı o delice karar, oyunun kırıldığı en kritik hamleye dönüşür.",
        "Bazen bir anime yan karakteri gibi görünür, sonra finalde ana karakterin spotunu çalar. Amkench'in en sevdiği şey budur: beklentiyi düşürmek, sonra herkesi şaşırtmak.",
        "Herkesin 'bu iş bitti' dediği anda gülerek oyuna döner. Invincible'daki sert darbelerden sonra ayağa kalkma hissi gibi, ne kadar vurulursa vurulsun yeniden ileri adım atar.",
        "Rakip planlıysa o plansızlığın gücünü kullanır, rakip kaotikse bu kez beklenmedik bir disiplinle oynar. Bu yüzden Amkench'i okumak zordur; çünkü o hep bir önceki halinin tersidir.",
        "Mikrofon açıldığında takımın nabzı değişir. Biraz mizah, biraz küfür, biraz da 'hadi bir fight daha' gazıyla oynamayı sürdürür; ve çoğu zaman maçın kaderini de bu ısrar belirler."
    ],
    default: [
        "Bu hikaye yeni başlıyor. Biraz Runeterra, biraz anime finali, biraz da gece yarısı dizilerinin o acı tatlı gerilimi; hepsi bir araya geliyor ve bugünün maçını sadece skor değil karakter yazıyor.",
        "Gece uzun, ekran parlak, müzik arkada usul usul akıyor. Bir maç daha atarsın diye açılan client bazen seni Breaking Bad kadar karanlık, bazen de One Piece kadar umutlu bir yolculuğa çıkarıyor.",
        "Her seçim bir yol, her yol bir savaş. Bazen Better Call Saul'daki gibi ince hesap, bazen Invincible'daki gibi sert çarpışmalar gerekir; ama sonunda kazanan hep son ana kadar oyunda kalan olur.",
        "Rift sisli olabilir ama niyetin net olduğu sürece yol bulunur. Bir anime kahramanı gibi yavaş yavaş güçlenir, her hatadan bir şey alır ve bir sonraki sahneye daha hazır çıkarsın.",
        "Bir şampiyon daha, bir adım daha, bir karar daha. Dexter'ın soğukkanlılığı ile aksiyon filmlerinin cesaretini birleştirdiğinde, en karmaşık oyunda bile kendine açacak bir koridor mutlaka bulursun.",
        "Bazen oyun sadece oyun değildir; biraz kaçış, biraz terapi, biraz da meydan okumadır. Ekranın diğer ucundaki insanlar rastgele olabilir ama senin hikayen tamamen sana ait kalır.",
        "Bu gece kimse senden mükemmel olmanı beklemiyor. Sadece oyunda kal, doğru anı bekle ve geldiği anda tereddüt etme; çünkü efsaneler genelde kusursuzlardan değil vazgeçmeyenlerden çıkar.",
        "Bir dizinin en iyi bölümü nasıl sonradan geliyorsa, en iyi maçın da bazen en kötü seriden sonra gelir. Yeter ki client kapanmasın, motivasyon düşmesin ve parmaklar bir kez daha klavyeye gitsin.",
        "Harita aynı harita, şampiyonlar aynı şampiyonlar ama ruh hali her şeyi değiştirir. Bugün daha sakin, daha net, daha açlıkla oynarsan oyunun sana açtığı kapılar da farklı olur.",
        "Rift'te gürültü çok olabilir ama kazananı genelde sessiz kararlar belirler. Bir geri çekilme, bir bekleyiş, bir doğru zamanlama; bazen tüm hikaye üç küçük hamleyle yazılır.",
        "Bazı geceler yenilgi bile karakter katar. Yeter ki neyin neden olduğunu gör, bir sonraki oyuna taşımak için bir şey seç ve yeniden başla; çünkü asıl güç hep yeniden başlayabilmektir.",
        "Bu sahne senin. İster anime kahramanı gibi inatla, ister dizilerdeki anti-kahramanlar gibi soğuk bir planla oyna; ama nasıl oynarsan oyna hikayenin son cümlesini sen yaz.",
        "Bazen tek bir doğru karar tüm maçın akışını değiştirir, bazen de doğru kararı bulana kadar onlarca yanlış gerekir. Önemli olan düşmemek değil, düştükten sonra aynı tutkuyla geri dönmektir.",
        "İyi oyuncu olmak sadece skorla ölçülmez; baskı altında sakin kalmak, takım dağılırken motivasyonu taşımak ve en kötü oyunda bile bir ışık aramak asıl farkı yaratan şeydir.",
        "Invincible'daki sertlik, Dexter'daki soğukkanlılık, Better Call Saul'daki zeka ve anime finalindeki umut aynı potada eridiğinde ortaya tek bir şey çıkar: son ana kadar savaşan bir oyuncu.",
        "Bir gün çok iyi, bir gün çok kötü oynayabilirsin; bu doğal. Asıl mesele, her oyunu bir öncekinin üstüne küçük bir taş koymak için kullanmak ve kendi efsaneni yavaş yavaş inşa etmektir."
    ]
};

const loginArea = document.getElementById('login-area');
const backBtn = document.getElementById('back-btn');
const statsPanel = document.getElementById('stats-panel');
const searchInput = document.getElementById('search-input');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const mainTitle = document.getElementById('main-title');
const welcomeMsg = document.getElementById('welcome-msg');
const welcomeSubtitle = document.getElementById('welcome-subtitle');
const listeDiv = document.getElementById('liste');
const quoteDiv = document.getElementById('quote-container');
const refreshBtn = document.getElementById('refresh-quote');
const mainLayout = document.getElementById('main-layout');
const notesPanel = document.getElementById('notes-panel');

let aktifKullanici = "";
let toplamKarakter = 0;
let aktifSes = null;
let unsubscribe = null;
let sampiyonVerileri = {}; 

let notTakmaAd = "";
let notUnsubscribe = null;

function sesCal(dosyaYolu) {
    if (aktifSes) {
        aktifSes.pause();
        aktifSes.currentTime = 0;
    }
    aktifSes = new Audio(dosyaYolu);
    aktifSes.play().catch(e => {});
}


function rastgeleSec(liste) {
    if (!Array.isArray(liste) || !liste.length) return "";
    return liste[Math.floor(Math.random() * liste.length)];
}

function rastgeleSampiyonSesiCalTR(championId) {
    const sesHavuzu = [
        `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/tr_tr/v1/champion-choose-vo/${championId}.ogg`,
        `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/tr_tr/v1/champion-ban-vo/${championId}.ogg`,
        `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/tr_tr/v1/champion-sfx-audios/${championId}.ogg`
    ];

    const denenecekler = [...sesHavuzu].sort(() => Math.random() - 0.5);

    const siradakiSesiCal = () => {
        if (!denenecekler.length) return;
        const url = denenecekler.pop();

        if (aktifSes) {
            aktifSes.pause();
            aktifSes.currentTime = 0;
        }

        const audio = new Audio(url);
        aktifSes = audio;
        audio.addEventListener("error", siradakiSesiCal, { once: true });
        audio.play().catch(() => siradakiSesiCal());
    };

    siradakiSesiCal();
}

document.getElementById('start-btn').addEventListener('click', () => {
    const sans = Math.floor(Math.random() * 5) + 1;
    if (sans === 3) {
        jumpscareUygula();
        return; 
    }

    const inputIsim = document.getElementById('username').value.trim().toLowerCase();
    if (!izinliKullanicilar.includes(inputIsim)) {
        sesCal('sf/dscnt.mp3');
        alert("Listeye girmek için queri'ye ulaş. dc:queriiw");
        return;
    }

    aktifKullanici = inputIsim;
    const kullaniciSampiyonSesi = { amkench: 223, zecron: 29, queri: 101 };
    
    if (kullaniciSampiyonSesi[aktifKullanici]) {
        setTimeout(() => rastgeleSampiyonSesiCalTR(kullaniciSampiyonSesi[aktifKullanici]), 200);
    } else {
        sesCal('sf/click.mp3');
    }
    
    document.body.classList.add('logged-in');
    loginArea.style.display = "none";
    mainTitle.style.display = "none";
    if (quoteDiv) quoteDiv.style.display = "none";
    if (refreshBtn) refreshBtn.style.display = "none";
    
    const mesajlar = {
        "queri": "HAŞMETLİ QUERİNİN GAMEPLAY",
        "zecron": "Zhecrhon",
        "amkench": "hey dur bi bişi diccm knk yazacak biş bulamadım"
    };
    welcomeMsg.innerText = mesajlar[aktifKullanici] || `HOŞGELDİN ${aktifKullanici.toUpperCase()}!`;
    
    if (welcomeSubtitle) {
        const hikayeListesi = kullaniciHikayeleri[aktifKullanici] || kullaniciHikayeleri.default;
        welcomeSubtitle.innerText = rastgeleSec(hikayeListesi);
    }
    
    welcomeMsg.style.display = "block";
    if (welcomeSubtitle) welcomeSubtitle.style.display = "block";
    statsPanel.style.display = "flex";
    mainLayout.style.display = "flex";
    if (notesPanel) notesPanel.style.display = "flex";
    backBtn.style.display = "block";
    document.getElementById('champion-spotlight').style.display = "block";
    
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
    location.reload(); 
});

async function tumKarakterleriGetir() {
    try {
        const response = await fetch('https://ddragon.leagueoflegends.com/cdn/16.6.1/data/tr_TR/champion.json');
        const data = await response.json();
        sampiyonVerileri = data.data; 
        const karakterler = Object.keys(sampiyonVerileri).sort();
        toplamKarakter = karakterler.length;
        listeyiYukle(karakterler);
        takipBaslat();
    } catch (error) {}
}

function listeyiYukle(karakterler) {
    listeDiv.innerHTML = ""; 
    karakterler.forEach(id => {
        const numId = sampiyonVerileri[id].key; 
        const label = document.createElement('label');
        label.className = 'char-item';
        label.id = `card-${id}`;
        const iconUrl = `https://ddragon.leagueoflegends.com/cdn/16.6.1/img/champion/${id}.png`;
        
        label.innerHTML = `
            <div class="char-info">
                <img src="${iconUrl}" class="char-icon" onerror="this.src='https://via.placeholder.com/40'">
                <span class="char-name">${id}</span>
            </div>
            <input type="checkbox" id="check-${id}">
            <div class="checkmark"></div>
        `;
        listeDiv.appendChild(label);

        label.querySelector('input').addEventListener('change', async (e) => {
            if (!aktifKullanici) return;

            if (e.target.checked) {
                const banUrl = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/tr_tr/v1/champion-ban-vo/${numId}.ogg`;
                sesCal(banUrl);
            }

            await setDoc(doc(db, "kullanici_listeleri", aktifKullanici), {
                [id]: e.target.checked
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
                const id = card.id.replace('card-', '');
                const checkbox = card.querySelector('input');
                const durum = data[id] || false;

                checkbox.checked = durum;
                if(durum) {
                    card.classList.add('checked');
                    tamamlanan++;
                } else {
                    card.classList.remove('checked');
                }
            });

            const yuzde = Math.round((tamamlanan / toplamKarakter) * 100);
            if (progressFill) progressFill.style.width = yuzde + "%";
            if (progressText) progressText.innerText = `${tamamlanan} / ${toplamKarakter} Şampiyon (%${yuzde})`;
        }
    });
}

const videoElement = document.getElementById('bg-video');
const videoListesi = ["img/tahm-kench.mp4", "img/xerath.mp4", "img/lucian.mp4", "img/zoe.mp4", "img/masteryi.mp4", "img/ryze.mp4"];

function rastgeleVideoOynat() {
    const rastgeleIndex = Math.floor(Math.random() * videoListesi.length);
    if(videoElement) {
        videoElement.src = videoListesi[rastgeleIndex];
        videoElement.play().catch(e => {});
    }
}

if(videoElement) {
    videoElement.onended = rastgeleVideoOynat;
    rastgeleVideoOynat();
}

function rastgeleReplikYaz() {
    if (quoteDiv) {
        const secilen = replikler[Math.floor(Math.random() * replikler.length)];
        quoteDiv.innerHTML = `"${secilen.metin}" — <strong>${secilen.sampiyon}</strong>`;
    }
}

if (refreshBtn) {
    refreshBtn.addEventListener('click', rastgeleReplikYaz);
}

rastgeleReplikYaz();

const orbElements = Array.from(document.querySelectorAll('.orb'));
const orbLayerMap = new Map();
const orbGlowColorCache = new Map();
let orbImageRotateTimer = null;

function sampiyonIconUrlUret(championName) {
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_0.jpg`;
}

function orbKatmanlariniHazirla() {
    orbElements.forEach((orb) => {
        const firstLayer = document.createElement('span');
        firstLayer.className = 'orb-photo';

        const secondLayer = document.createElement('span');
        secondLayer.className = 'orb-photo';

        orb.appendChild(firstLayer);
        orb.appendChild(secondLayer);

        orbLayerMap.set(orb, { active: firstLayer, passive: secondLayer, initialized: false });
    });
}

function orbGecisliResimAyarla(orb, imageUrl, tintOpacity) {
    const layers = orbLayerMap.get(orb);
    if (!layers) return;

    const overlay = `linear-gradient(145deg, rgba(1,10,19,${Math.max(0.03, tintOpacity * 0.22)}) 0%, rgba(1,10,19,0) 60%)`;
    layers.passive.style.backgroundImage = `${overlay}, url("${imageUrl}")`;

    if (!layers.initialized) {
        layers.passive.classList.add('is-visible');
        layers.active.classList.remove('is-visible');
        layers.initialized = true;
    } else {
        layers.passive.classList.add('is-visible');
        layers.active.classList.remove('is-visible');
    }

    const onceActive = layers.active;
    layers.active = layers.passive;
    layers.passive = onceActive;
}

function clampColor(v) {
    return Math.max(0, Math.min(255, v));
}

function parlayanRengeDonustur(r, g, b) {
    return {
        r: clampColor(Math.round(r * 1.12 + 12)),
        g: clampColor(Math.round(g * 1.12 + 12)),
        b: clampColor(Math.round(b * 1.12 + 12))
    };
}

function orbGlowRenginiUygula(orb, championName, imageUrl) {
    if (orbGlowColorCache.has(championName)) {
        orb.style.setProperty('--orb-glow-rgb', orbGlowColorCache.get(championName));
        return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            if (!ctx) return;

            const sampleSize = 36;
            canvas.width = sampleSize;
            canvas.height = sampleSize;
            const sx = img.width * 0.25;
            const sy = img.height * 0.25;
            const sw = img.width * 0.5;
            const sh = img.height * 0.5;
            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sampleSize, sampleSize);

            const data = ctx.getImageData(0, 0, sampleSize, sampleSize).data;
            let r = 0, g = 0, b = 0, count = 0;
            for (let i = 0; i < data.length; i += 4) {
                const alpha = data[i + 3];
                if (alpha < 10) continue;
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
                count++;
            }
            if (!count) return;

            const boosted = parlayanRengeDonustur(Math.round(r / count), Math.round(g / count), Math.round(b / count));
            const rgbText = `${boosted.r}, ${boosted.g}, ${boosted.b}`;
            orbGlowColorCache.set(championName, rgbText);
            orb.style.setProperty('--orb-glow-rgb', rgbText);
        } catch (e) {}
    };
    img.src = imageUrl;
}

function orbGorselleriniGuncelle() {
    if (!orbElements.length || !sampiyonVerileri || !Object.keys(sampiyonVerileri).length) return;

    const allChampions = Object.keys(sampiyonVerileri);
    const kullanilanlar = new Set();

    orbElements.forEach((orb, index) => {
        let randomChamp = allChampions[Math.floor(Math.random() * allChampions.length)];

        let attempts = 0;
        while (kullanilanlar.has(randomChamp) && attempts < 8) {
            randomChamp = allChampions[Math.floor(Math.random() * allChampions.length)];
            attempts++;
        }
        kullanilanlar.add(randomChamp);

        const imageUrl = sampiyonIconUrlUret(randomChamp);
        const tintOpacity = 0.12 + (index * 0.03);
        orbGecisliResimAyarla(orb, imageUrl, tintOpacity);
        orbGlowRenginiUygula(orb, randomChamp, imageUrl);
    });
}

async function orbGorselleriniBaslat() {
    if (!orbElements.length) return;
    orbKatmanlariniHazirla();

    try {
        if (!Object.keys(sampiyonVerileri).length) {
            const response = await fetch('https://ddragon.leagueoflegends.com/cdn/16.6.1/data/tr_TR/champion.json');
            const data = await response.json();
            sampiyonVerileri = data.data || {};
        }
    } catch (e) {
        return;
    }

    orbGorselleriniGuncelle();
    if (orbImageRotateTimer) clearInterval(orbImageRotateTimer);
    orbImageRotateTimer = setInterval(orbGorselleriniGuncelle, 7000);
}

orbGorselleriniBaslat();

const notesEnterBtn = document.getElementById('notes-enter-btn');
const notesUsernameInput = document.getElementById('notes-username');
const notesBlurOverlay = document.getElementById('notes-blur-overlay');
const notesList = document.getElementById('notes-list');
const noteInput = document.getElementById('note-input');
const sendNoteBtn = document.getElementById('send-note-btn');
const notesCurrentUser = document.getElementById('notes-current-user');

notesEnterBtn.addEventListener('click', () => notGirisYap());
notesUsernameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') notGirisYap();
});

function notGirisYap() {
    const isim = notesUsernameInput.value.trim();
    if (!isim) return;

    notTakmaAd = isim.toLowerCase();
    notesCurrentUser.innerText = isim.toUpperCase();
    notesBlurOverlay.classList.add('hidden');
    notlariDinle(); 
}

async function notGonder() {
    const metin = noteInput.value.trim();
    if (!metin || !notTakmaAd || !aktifKullanici) return;

    noteInput.value = "";

    try {
        await addDoc(collection(db, "kullanici_notlari", aktifKullanici, "mesajlar"), {
            yazar: notTakmaAd,
            metin: metin,
            zaman: Date.now()
        });
    } catch (e) {}
}

sendNoteBtn.addEventListener('click', notGonder);
noteInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        notGonder();
    }
});

function jumpscareUygula() {
    const existing = document.getElementById('jumpscare-layer');
    if (existing) existing.remove();

    const video = document.createElement('video');
    video.id = 'jumpscare-layer';
    video.src = 'img/jumpscare.mp4';
    video.autoplay = true;
    video.muted = false;
    video.playsInline = true;
    video.style.position = 'fixed';
    video.style.inset = '0';
    video.style.width = '100vw';
    video.style.height = '100vh';
    video.style.objectFit = 'cover';
    video.style.zIndex = '2147483647';
    video.style.pointerEvents = 'none';
    video.style.background = '#000';

    const handleEnded = () => {
        video.remove();
    };

    video.addEventListener('ended', handleEnded);

    document.body.appendChild(video);

    video.volume = 1.0;

    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!window.jumpscareAudioContext && AudioCtx) {
            window.jumpscareAudioContext = new AudioCtx();
        }

        const ctx = window.jumpscareAudioContext;
        if (ctx && ctx.state === 'suspended') {
            ctx.resume().catch(() => {});
        }
                                
        if (ctx) {
            const source = ctx.createMediaElementSource(video);
            const gain = ctx.createGain();
            gain.gain.value = 900;
            source.connect(gain).connect(ctx.destination);
            video._jumpscareGainNode = gain;
        }
    } catch (e) {
    }

    video.play().catch(() => {});
}

function notlariDinle() {
    if (notUnsubscribe) notUnsubscribe();
    if (!aktifKullanici) return;

    const q = query(collection(db, "kullanici_notlari", aktifKullanici, "mesajlar"), orderBy("zaman", "asc"));

    notUnsubscribe = onSnapshot(q, (snapshot) => {
        notesList.innerHTML = "";

        if (snapshot.empty) {
            notesList.innerHTML = `<div class="notes-empty">Henüz not yok...</div>`;
            return;
        }

        snapshot.forEach(docSnap => {
            const not = docSnap.data();
            const notId = docSnap.id;
            const kendiNotu = not.yazar === notTakmaAd;

            const div = document.createElement('div');
            div.className = 'note-item' + (kendiNotu ? ' own-note' : '');

            const tarih = new Date(not.zaman);
            const saatStr = tarih.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

            div.innerHTML = `
                <div class="note-author">${not.yazar.toUpperCase()}</div>
                <div class="note-text">${not.metin}</div>
                <div class="note-time">${saatStr}</div>
                ${kendiNotu ? `<button class="note-delete-btn" data-id="${notId}">✕</button>` : ''}
            `;

            div.querySelector('.note-delete-btn')?.addEventListener('click', async () => {
                await deleteDoc(doc(db, "kullanici_notlari", aktifKullanici, "mesajlar", notId));
            });

            notesList.appendChild(div);
        });

        notesList.scrollTop = notesList.scrollHeight;
    });
}

