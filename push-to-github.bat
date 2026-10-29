@echo off
title Push Portfolio to GitHub
echo ===================================================
echo Pushing portfolio to https://github.com/ramprasathb705-web/CLIENT
echo ===================================================
echo.
cd /d "C:\Users\rampr\.gemini\antigravity\scratch\portfolio-accessible"
"C:\Users\rampr\.gemini\antigravity\scratch\mingit\cmd\git.exe" push -u origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo ===================================================
    echo Successfully pushed to https://github.com/ramprasathb705-web/CLIENT!
    echo ===================================================
) else (
    echo.
    echo If GitHub asks for authentication, sign in with your browser or paste your Personal Access Token.
)
pause
