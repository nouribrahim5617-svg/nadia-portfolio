@echo off
REM Double-click this to view the built site.
REM It starts a small local server and opens your browser.
cd /d "%~dp0"
node scripts\preview.mjs
pause
