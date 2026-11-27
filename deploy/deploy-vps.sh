#!/usr/bin/env bash
set -euo pipefail

# ==============================================================================
# Ruang360° — Safe Multi-Project VPS Deploy / Update Script (Ubuntu / Debian)
# Domain        : 360.galipatsistem.com
# Cloudflare SSL: Flexible (Origin Nginx listen :80, tanpa redirect HTTPS)
# Repo GitHub   : https://github.com/ridwan0354/360.git
#
# Dirancang AMAN untuk VPS yang sudah berisi banyak proyek lain:
#   - Tidak menyentuh /etc/nginx/sites-enabled/* proyek lain
#   - Tidak mengubah default CLI PHP / pool PHP-FPM proyek lain
#   - Membuat PHP-FPM pool terisolasi [ruang360] (pm = ondemand)
#   - Membuat Python venv terisolasi (.venv_stitcher) untuk OpenCV 3D
#   - Idempotent: aman dijalankan berulang kali untuk deploy awal & update git pull
# ==============================================================================

DOMAIN="360.galipatsistem.com"
REPO_URL="https://github.com/ridwan0354/360.git"
APP_DIR="/var/www/${DOMAIN}"
WEB_USER="www-data"
WEB_GROUP="www-data"

log() { echo -e "\n\033[1;33m[Ruang360° Deploy]\033[0m $*"; }
err() { echo -e "\n\033[1;31m[ERROR]\033[0m $*" >&2; exit 1; }

if [[ "${EUID}" -ne 0 ]]; then
  err "Jalankan script sebagai root (gunakan sudo)."
fi

if ! command -v apt-get >/dev/null 2>&1; then
  err "Script otomatis ini dirancang untuk Ubuntu/Debian (apt-get). Gunakan konfigurasi manual di deploy/ untuk distro lain."
fi

export DEBIAN_FRONTEND=noninteractive

apt_update_safe() {
  apt-get update -y --allow-releaseinfo-change || apt-get update -y || true
}

# ------------------------------------------------------------------------------
# 1. Dependensi sistem dasar (tanpa mengganggu layanan aktif lain)
# ------------------------------------------------------------------------------
log "Memeriksa paket dasar sistem (git, curl, python3-venv, nginx, unzip)..."
MISSING_BASE_PKGS=()
command -v git >/dev/null 2>&1 || MISSING_BASE_PKGS+=(git)
command -v curl >/dev/null 2>&1 || MISSING_BASE_PKGS+=(curl)
command -v unzip >/dev/null 2>&1 || MISSING_BASE_PKGS+=(unzip ca-certificates gnupg)
dpkg -s python3-venv >/dev/null 2>&1 || MISSING_BASE_PKGS+=(python3 python3-venv python3-pip)
dpkg -s nginx >/dev/null 2>&1 || MISSING_BASE_PKGS+=(nginx)
dpkg -s libglib2.0-0 >/dev/null 2>&1 || MISSING_BASE_PKGS+=(libglib2.0-0)

if [[ "${#MISSING_BASE_PKGS[@]}" -gt 0 ]]; then
  apt_update_safe
  apt-get install -y "${MISSING_BASE_PKGS[@]}"
fi

# ------------------------------------------------------------------------------
# 2. Deteksi atau instal PHP >= 8.3 (TANPA mengubah default PHP CLI proyek lain)
# ------------------------------------------------------------------------------
PHP_VER=""
for v in 8.5 8.4 8.3; do
  if command -v "php${v}" >/dev/null 2>&1; then
    PHP_VER="$v"
    break
  fi
done

if [[ -z "$PHP_VER" ]]; then
  log "PHP >= 8.3 belum ditemukan. Menambahkan PHP 8.4 (FPM + ekstensi Laravel/Imagick)..."
  apt_update_safe
  apt-get install -y software-properties-common || true
  add-apt-repository -y ppa:ondrej/php || true
  apt_update_safe
  PHP_VER="8.4"
fi

PHP_BIN="$(command -v "php${PHP_VER}" || true)"
log "Menggunakan PHP ${PHP_VER} (${PHP_BIN:-akan dipasang}) dan memastikan ekstensi lengkap..."

REQ_PKGS=(
  "php${PHP_VER}-cli"
  "php${PHP_VER}-fpm"
  "php${PHP_VER}-sqlite3"
  "php${PHP_VER}-mbstring"
  "php${PHP_VER}-xml"
  "php${PHP_VER}-curl"
  "php${PHP_VER}-zip"
  "php${PHP_VER}-gd"
  "php${PHP_VER}-bcmath"
  "php${PHP_VER}-intl"
)

MISSING_PHP_PKGS=()
for pkg in "${REQ_PKGS[@]}"; do
  if ! dpkg -s "$pkg" >/dev/null 2>&1; then
    MISSING_PHP_PKGS+=("$pkg")
  fi
done

if [[ "${#MISSING_PHP_PKGS[@]}" -gt 0 ]]; then
  apt_update_safe
  apt-get install -y "${MISSING_PHP_PKGS[@]}"
fi

# Imagick opsional (sangat disarankan, aman dilewati jika repo PHP lama tidak menyediakannya)
if ! dpkg -s "php${PHP_VER}-imagick" >/dev/null 2>&1; then
  apt-get install -y "php${PHP_VER}-imagick" || true
fi

PHP_BIN="$(command -v "php${PHP_VER}")"
PHP_FPM_SERVICE="php${PHP_VER}-fpm"
PHP_FPM_POOL_DIR="/etc/php/${PHP_VER}/fpm/pool.d"
PHP_FPM_SOCK="/run/php/php${PHP_VER}-fpm-ruang360.sock"

# ------------------------------------------------------------------------------
# 3. Composer & Pemeriksaan Node (tanpa menimpa Node proyek lain jika prebuilt siap)
# ------------------------------------------------------------------------------
if ! command -v composer >/dev/null 2>&1; then
  log "Menginstal Composer secara global..."
  EXPECTED_CHECKSUM="$(curl -fsSL https://composer.github.io/installer.sig)"
  "$PHP_BIN" -r "copy('https://getcomposer.github.io/installer', '/tmp/composer-setup.php');"
  ACTUAL_CHECKSUM="$("$PHP_BIN" -r "echo hash_file('sha384', '/tmp/composer-setup.php');")"
  if [[ "$EXPECTED_CHECKSUM" != "$ACTUAL_CHECKSUM" ]]; then
    rm -f /tmp/composer-setup.php
    err "Checksum installer Composer tidak valid."
  fi
  "$PHP_BIN" /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer
  rm -f /tmp/composer-setup.php
fi

# ------------------------------------------------------------------------------
# 4. Clone / Update Repository dari GitHub (aman terhadap data .env / storage / DB)
# ------------------------------------------------------------------------------
mkdir -p /var/www
if [[ -d "${APP_DIR}/.git" ]]; then
  log "Repository sudah ada di ${APP_DIR}. Melakukan git pull..."
  git config --global --add safe.directory "${APP_DIR}" || true
  cd "${APP_DIR}"
  git pull --ff-only origin main
else
  if [[ -d "${APP_DIR}" && -n "$(ls -A "${APP_DIR}" 2>/dev/null || true)" ]]; then
    err "Direktori ${APP_DIR} sudah ada dan tidak kosong tetapi bukan git repo. Harap periksa manual."
  fi
  log "Meng-clone ${REPO_URL} ke ${APP_DIR}..."
  git clone --branch main "${REPO_URL}" "${APP_DIR}"
  cd "${APP_DIR}"
fi

# ------------------------------------------------------------------------------
# 5. Setup Python Virtualenv Terisolasi + OpenCV 3D Stitcher
# ------------------------------------------------------------------------------
log "Menyiapkan virtualenv Python terisolasi (.venv_stitcher) + OpenCV..."
if [[ ! -x "${APP_DIR}/.venv_stitcher/bin/python" ]]; then
  python3 -m venv "${APP_DIR}/.venv_stitcher"
fi
"${APP_DIR}/.venv_stitcher/bin/pip" install --upgrade pip >/dev/null
"${APP_DIR}/.venv_stitcher/bin/pip" install -r "${APP_DIR}/scripts/requirements-stitcher.txt"
"${APP_DIR}/.venv_stitcher/bin/python" -c "import cv2, numpy; print('OpenCV ready:', cv2.__version__, 'NumPy:', numpy.__version__)"

# ------------------------------------------------------------------------------
# 6. Install Dependensi Laravel & Aset Vite
# ------------------------------------------------------------------------------
log "Menginstal dependensi PHP (Composer)..."
COMPOSER_ALLOW_SUPERUSER=1 "$PHP_BIN" "$(command -v composer)" install --no-dev --optimize-autoloader --no-interaction

CAN_BUILD_VITE=0
if command -v node >/dev/null 2>&1 && command -v npm >/dev/null 2>&1; then
  NODE_VER_CLEAN="$(node -v | sed -E 's/^v//')"
  NODE_MAJ="${NODE_VER_CLEAN%%.*}"
  NODE_MIN="$(echo "$NODE_VER_CLEAN" | cut -d. -f2)"
  if [[ "$NODE_MAJ" -gt 22 ]] || [[ "$NODE_MAJ" -eq 22 && "$NODE_MIN" -ge 12 ]] || [[ "$NODE_MAJ" -eq 20 && "$NODE_MIN" -ge 19 ]]; then
    CAN_BUILD_VITE=1
  fi
fi

if [[ "$CAN_BUILD_VITE" -eq 1 ]]; then
  log "Node v${NODE_VER_CLEAN} mendukung Vite 8 — membangun aset frontend (npm ci && npm run build)..."
  npm ci --no-audit --no-fund
  npm run build
elif [[ -f "${APP_DIR}/public/build/manifest.json" ]]; then
  log "Menggunakan aset Vite pre-compiled dari repository (Node VPS tetap aman tidak diubah)."
else
  log "Node >=20.19 / >=22.12 belum tersedia dan aset build belum ada — memasang Node 22 LTS..."
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
  npm ci --no-audit --no-fund
  npm run build
fi

# ------------------------------------------------------------------------------
# 7. Konfigurasi .env, Database SQLite & Seeding Awal (Aman untuk Update)
# ------------------------------------------------------------------------------
IS_FRESH_DB=0
if [[ ! -f "${APP_DIR}/.env" ]]; then
  log "Membuat .env produksi untuk https://${DOMAIN} (Cloudflare Flexible SSL)..."
  cp "${APP_DIR}/.env.example" "${APP_DIR}/.env"
  sed -i -E "s|^APP_NAME=.*|APP_NAME=\"Ruang360°\"|" "${APP_DIR}/.env"
  sed -i -E "s|^APP_ENV=.*|APP_ENV=production|" "${APP_DIR}/.env"
  sed -i -E "s|^APP_DEBUG=.*|APP_DEBUG=false|" "${APP_DIR}/.env"
  sed -i -E "s|^APP_URL=.*|APP_URL=https://${DOMAIN}|" "${APP_DIR}/.env"
fi

if grep -qE '^APP_KEY=$' "${APP_DIR}/.env"; then
  "$PHP_BIN" artisan key:generate --force
fi

mkdir -p "${APP_DIR}/database" "${APP_DIR}/storage/app/public/apk"
if [[ ! -f "${APP_DIR}/database/database.sqlite" ]]; then
  touch "${APP_DIR}/database/database.sqlite"
  IS_FRESH_DB=1
fi

log "Menjalankan migrasi database..."
"$PHP_BIN" artisan migrate --force

USER_COUNT="$("$PHP_BIN" -r 'require "vendor/autoload.php"; $app = require "bootstrap/app.php"; $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap(); echo \App\Models\User::count();' 2>/dev/null || echo 0)"
if [[ "$IS_FRESH_DB" -eq 1 || "${USER_COUNT:-0}" -eq 0 ]]; then
  log "Database masih kosong — mengisi data demo & akun awal (Admin & Kru)..."
  "$PHP_BIN" artisan db:seed --force
else
  log "Database sudah berisi ${USER_COUNT} akun — melewati seeder agar data existing tidak tertimpa."
fi

"$PHP_BIN" artisan storage:link --force || true
"$PHP_BIN" artisan optimize

# ------------------------------------------------------------------------------
# 8. Hak Akses & Konfigurasi PHP-FPM Pool + Nginx Terisolasi
# ------------------------------------------------------------------------------
chown -R "${WEB_USER}:${WEB_GROUP}" "${APP_DIR}/storage" "${APP_DIR}/bootstrap/cache" "${APP_DIR}/database"
chmod -R ug+rwX "${APP_DIR}/storage" "${APP_DIR}/bootstrap/cache" "${APP_DIR}/database"

log "Memasang PHP-FPM pool terisolasi di ${PHP_FPM_POOL_DIR}/ruang360.conf..."
mkdir -p "${PHP_FPM_POOL_DIR}"
sed \
  -e "s|__WEB_USER__|${WEB_USER}|g" \
  -e "s|__WEB_GROUP__|${WEB_GROUP}|g" \
  -e "s|__PHP_FPM_SOCK__|${PHP_FPM_SOCK}|g" \
  "${APP_DIR}/deploy/php-fpm-ruang360.conf" > "${PHP_FPM_POOL_DIR}/ruang360.conf"

systemctl enable "${PHP_FPM_SERVICE}" >/dev/null 2>&1 || true
systemctl restart "${PHP_FPM_SERVICE}"

log "Memasang virtual host Nginx terisolasi untuk ${DOMAIN}..."
sed \
  -e "s|__APP_DIR__|${APP_DIR}|g" \
  -e "s|__PHP_FPM_SOCK__|${PHP_FPM_SOCK}|g" \
  "${APP_DIR}/deploy/nginx-360.galipatsistem.com.conf" > "/etc/nginx/sites-available/${DOMAIN}"

ln -sf "/etc/nginx/sites-available/${DOMAIN}" "/etc/nginx/sites-enabled/${DOMAIN}"

# Validasi seluruh konfigurasi Nginx (termasuk proyek lain) sebelum reload!
nginx -t
systemctl enable nginx >/dev/null 2>&1 || true
systemctl reload nginx

log "✅ Deploy Ruang360° selesai!"
echo "   URL Web Publik   : https://${DOMAIN}"
echo "   Login Admin/Kru  : https://${DOMAIN}/login"
echo "   Unduh APK Kru    : https://${DOMAIN}/download/ruang360-kru.apk"
echo "   Akun Bawaan Demo : admin@ruang360.test / password  (segera ganti kata sandi!)"
echo "                      kru@ruang360.test   / password"
