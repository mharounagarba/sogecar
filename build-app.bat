@echo off
echo 🚀 Nettoyage des dossiers existants...
rmdir /s /q dist
rmdir /s /q build

echo 🛠️  Build frontend avec Vite...
call yarn build

echo 📦 Build Electron avec Signature...
call yarn dist

echo ✅ Build terminé ! Fichiers disponibles dans dist\win-unpacked\
pause
