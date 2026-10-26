@echo off
title Peak Media Local Server
echo ========================================================
echo        Starting Peak Media Local Server
echo ========================================================
echo.
echo Launching local server on http://localhost:8080 ...
echo Press Ctrl+C in this window anytime to stop the server.
echo.

start http://localhost:8080

where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    python -m http.server 8080
    goto end
)

where py >nul 2>nul
if %ERRORLEVEL% equ 0 (
    py -m http.server 8080
    goto end
)

where npx >nul 2>nul
if %ERRORLEVEL% equ 0 (
    npx serve -l 8080 .
    goto end
)

echo Python or Node not detected in PATH.
echo You can still open index.html directly in any browser!
pause

:end
