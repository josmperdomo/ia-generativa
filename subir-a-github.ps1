# Script para vincular y subir el proyecto a GitHub
param (
    [string]$RepoUrl = ""
)

if (-not $RepoUrl) {
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host "      SUBIR SITIO WEB IA GENERATIVA A GITHUB            " -ForegroundColor Green
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host ""
    $RepoUrl = Read-Host "Pega la URL de tu repositorio en GitHub (ej: https://github.com/usuario/ia-generativa.git)"
}

if (-not $RepoUrl) {
    Write-Error "No ingresaste una URL válida."
    exit 1
}

# Configurar remote origin
git remote remove origin 2>$null
git remote add origin $RepoUrl

Write-Host "`nSubiendo rama main a GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n========================================================" -ForegroundColor Green
    Write-Host " ¡PROYECTO SUBIDO CON ÉXITO A GITHUB!" -ForegroundColor Green
    Write-Host " Tu código ya está disponible en: $RepoUrl" -ForegroundColor Cyan
    Write-Host "========================================================" -ForegroundColor Green
} else {
    Write-Host "`nSi GitHub te solicita autenticación, inicia sesión con tu cuenta en la ventana emergente." -ForegroundColor Yellow
}
