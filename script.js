/**
 * script.js
 * This file contains the JavaScript logic for the web application.
 * It handles user interactions, processes input, updates the UI,
 * and provides visual feedback.
 */

// --- DOM Element References ---
const ageInputField = document.getElementById('ageInput');
const wantsToPlayRadios = document.getElementsByName('wantsToPlay');
const priorityRadios = document.getElementsByName('priority');
const isReserveRadios = document.getElementsByName('isReserve');
const currentQualitySelect = document.getElementById('currentQualitySelect');

const submitButton = document.getElementById('submitButton');
const systemResponseDisplay = document.getElementById('systemResponse');
const feedbackMessageContainer = document.getElementById('feedbackMessage');
const feedbackMessageText = document.getElementById('feedbackText');

// --- Global Variables ---
// Initialize variables as per your flowchart's 'Initialize variables' step.
let age = null;             // Purpose: Futbolcunun yaşı
let wants_to_play = null;   // Purpose: Sürekli oynama isteği (true/false)
let priority = null;        // Purpose: Kariyer önceliği ("money" / "success")
let is_reserve = null;      // Purpose: Yedek oyuncu mu? (true/false)
let current_quality = null; // Purpose: Oyuncunun seviyesi ("high", "medium", "low") - Bonus

// --- Function to Display Visual Feedback ---
/**
 * Shows a temporary feedback message to the user.
 * @param {string} message - The text message to display.
 * @param {'success' | 'error' | 'info' | 'warning'} type - The type of feedback (determines color).
 */
function showFeedback(message, type) {
    feedbackMessageText.textContent = message;
    // Remove all existing background classes
    feedbackMessageContainer.classList.remove('hidden', 'bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500');

    // Set background color based on feedback type
    if (type === 'success') {
        feedbackMessageContainer.classList.add('bg-green-500');
    } else if (type === 'error') {
        feedbackMessageContainer.classList.add('bg-red-500');
    } else if (type === 'info') {
        feedbackMessageContainer.classList.add('bg-blue-500');
    } else if (type === 'warning') { // Added for more nuanced feedback
        feedbackMessageContainer.classList.add('bg-yellow-500');
    }

    feedbackMessageText.classList.add('text-white'); // Ensure text is white

    // Display the feedback container
    feedbackMessageContainer.classList.remove('hidden');

    // Hide after a few seconds
    setTimeout(() => {
        feedbackMessageContainer.classList.add('hidden');
    }, 3000);
}

// --- Helper function to get selected radio value ---
/**
 * Gets the selected value from a group of radio buttons.
 * @param {HTMLCollectionOf<HTMLInputElement>} radioButtons - The collection of radio input elements.
 * @returns {string | null} The value of the selected radio button, or null if none is selected.
 */
function getSelectedRadioValue(radioButtons) {
    for (const radio of radioButtons) {
        if (radio.checked) {
            return radio.value;
        }
    }
    return null;
}

// --- Main Application Logic (Implementing Flowchart and Logical Statements) ---
/**
 * Handles the submission of user input and determines the player's transfer destination.
 * This function directly implements the core logic based on your flowchart and IF-THEN rules.
 */
function handleSubmit() {
    // 1. Girişleri Al ve Doğrula (Get Inputs and Validate)
    age = parseInt(ageInputField.value);
    const wantsToPlayValue = getSelectedRadioValue(wantsToPlayRadios);
    const priorityValue = getSelectedRadioValue(priorityRadios);
    const isReserveValue = getSelectedRadioValue(isReserveRadios);
    current_quality = currentQualitySelect.value; // Bonus input

    // Konsola alınan değerleri logla (Log input values to console for debugging)
    console.log("--- Giriş Değerleri ---");
    console.log("Yaş (age):", age);
    console.log("Oynama isteği (wantsToPlayValue):", wantsToPlayValue);
    console.log("Öncelik (priorityValue):", priorityValue);
    console.log("Yedek mi (isReserveValue):", isReserveValue);
    console.log("Seviye (current_quality):", current_quality);
    console.log("------------------------");


    // Booleans'a dönüştür (Convert to Booleans)
    wants_to_play = (wantsToPlayValue === 'yes');
    is_reserve = (isReserveValue === 'yes');
    priority = priorityValue; // "money" or "success"

    // Doğrulama (Validation)
    if (isNaN(age) || age < 15 || age > 45) {
        systemResponseDisplay.textContent = "Hata: Lütfen geçerli bir yaş girin (15-45 arası).";
        showFeedback("Geçersiz yaş girişi!", "error");
        console.error("Doğrulama Hatası: Geçersiz yaş.", age);
        return; // İşlemi durdur (Stop processing)
    }

    if (wantsToPlayValue === null) {
        systemResponseDisplay.textContent = "Hata: Oynama isteği bilgisini seçmelisiniz.";
        showFeedback("Oynama isteği seçilmedi!", "error");
        console.error("Doğrulama Hatası: Oynama isteği seçilmedi.");
        return;
    }

    if (priorityValue === null) {
        systemResponseDisplay.textContent = "Hata: Kariyer önceliği bilgisini seçmelisiniz.";
        showFeedback("Kariyer önceliği seçilmedi!", "error");
        console.error("Doğrulama Hatası: Kariyer önceliği seçilmedi.");
        return;
    }

    if (isReserveValue === null) {
        systemResponseDisplay.textContent = "Hata: Yedek oyuncu musunuz bilgisini seçmelisiniz.";
        showFeedback("Yedeklik durumu seçilmedi!", "error");
        console.error("Doğrulama Hatası: Yedeklik durumu seçilmedi.");
        return;
    }

    if (current_quality === "") { // Bonus alan için doğrulama
        systemResponseDisplay.textContent = "Hata: Lütfen kendinizi hangi seviyede gördüğünüzü seçin.";
        showFeedback("Oyuncu seviyesi seçilmedi!", "error");
        console.error("Doğrulama Hatası: Oyuncu seviyesi seçilmedi.");
        return;
    }

    let destination = "Bilinmeyen Rota"; // Varsayılan değer (Default value)

    // 2. Akış Şeması / IF-THEN Karar Mantığı Uygulaması (Flowchart / IF-THEN Logic Implementation)
    showFeedback("Transfer rotası hesaplanıyor...", "info");

    if (age < 25) {
        // Yaş < 25: Genç oyuncu (Young player)
        if (wants_to_play) {
            // Genç ve oynama isteği varsa (Young and wants to play)
            destination = "Nice, Brighton, Ajax gibi gelişim odaklı kulüpler.";
        } else {
            // Genç ama rotasyon oyuncusu olabilir (Young but might be a rotation player)
            destination = "Juventus, Dortmund gibi üst seviye ama rotasyonlu kulüpler.";
        }
    } else {
        // Yaş >= 25: Deneyimli oyuncu (Experienced player)
        if (priority === "money") {
            // Para öncelikliyse (If money is priority)
            destination = "Suudi Arabistan, MLS, Katar gibi ligler.";
        } else {
            // Başarı öncelikliyse (If success is priority)
            if (is_reserve) {
                // Yedek oyuncu, ama başarı isteyen biri (Reserve player, but wants success)
                destination = "Real Madrid, Man City gibi büyük takımlar (yedek).";
            } else {
                // Yaşlı ama liderlik ve başarı isteyen (Older but wants leadership and success)
                destination = "Galatasaray, Inter, Fenerbahçe gibi liderlik kulüpleri.";
            }
        }
    }

    // Bonus: current_quality'e göre ek küçük nüanslar (Bonus: subtle nuances based on current_quality)
    if (current_quality === 'high' && destination.includes("rotasyonlu kulüpler")) {
        destination += " Ancak yüksek kalitenizle daha fazla süre bulabilirsiniz.";
    } else if (current_quality === 'low' && destination.includes("liderlik kulüpleri")) {
        destination += " Ancak düşük kalitenizle liderlik rolü zorlayıcı olabilir.";
    }

    // Konsola nihai rotayı logla (Log the final destination to console)
    console.log("Nihai Rota (Destination):", destination);

    // 3. Sonucu Göster (Display Result)
    systemResponseDisplay.textContent = destination;
    showFeedback("Rota başarıyla belirlendi!", "success");

    // 4. Giriş Alanlarını Temizle (Clear Input Fields)
    ageInputField.value = '';
    // Radyo butonlarını temizle (Clear radio buttons)
    for (const radio of wantsToPlayRadios) radio.checked = false;
    for (const radio of priorityRadios) radio.checked = false;
    for (const radio of isReserveRadios) radio.checked = false;
    currentQualitySelect.value = ""; // Selectbox'ı sıfırla
}

// --- Event Listeners ---
// Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Event listener for the submit button click
    submitButton.addEventListener('click', handleSubmit);

    // Event listener for 'Enter' key press in the age input field
    ageInputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    });

    // Initial display or welcome message on load
    systemResponseDisplay.textContent = "Futbolcu transfer analizi için bilgileri giriniz.";
    showFeedback("Uygulama yüklendi!", "info");
});

// --- Responsive Design Notes ---
// Responsive design is primarily handled by Tailwind CSS classes in index.html.
// Classes like `w-full`, `max-w-lg`, `md:max-w-xl`, `lg:max-w-2xl`,
// `text-3xl`, `md:text-4xl` automatically adjust layout and text size
// based on screen width.

// --- Visual Feedback Notes ---
// The `showFeedback` function provides dynamic visual feedback.
// The `feedbackMessage` div appears and disappears with a colored background
// to indicate success, error, or informational messages.
// This directly addresses the "Add visual feedback for user actions" requirement.
