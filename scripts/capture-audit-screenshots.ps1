# Multi-Viewport Audit Screenshot Generator for Hiramani Memorial Hospital V2
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$baseDir = (Resolve-Path .).Path
$outDir = Join-Path $baseDir "docs\screenshots\audit"
if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Force -Path $outDir | Out-Null
}

$routes = @(
    @{ Name = "home";        Path = "" },
    @{ Name = "about";       Path = "about" },
    @{ Name = "doctors";     Path = "doctors" },
    @{ Name = "departments"; Path = "departments" },
    @{ Name = "diagnostics"; Path = "diagnostics" },
    @{ Name = "contact";     Path = "contact" },
    @{ Name = "book";        Path = "book" }
)

Write-Host "Capturing Mobile 390px and Desktop 1280px for all key routes..." -ForegroundColor Cyan

foreach ($route in $routes) {
    $url = "http://localhost:3000/" + $route.Path
    
    # Mobile 390px
    $fileMobile = Join-Path $outDir ("v2_390_" + $route.Name + ".png")
    & $chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars --window-size=390,844 --screenshot="$fileMobile" "$url" 2>&1 | Out-Null
    Start-Sleep -Milliseconds 1200
    Write-Host "390px $($route.Name): $(Test-Path $fileMobile)" -ForegroundColor Green

    # Desktop 1280px
    $fileDesktop = Join-Path $outDir ("v2_1280_" + $route.Name + ".png")
    & $chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars --window-size=1280,800 --screenshot="$fileDesktop" "$url" 2>&1 | Out-Null
    Start-Sleep -Milliseconds 1200
    Write-Host "1280px $($route.Name): $(Test-Path $fileDesktop)" -ForegroundColor Green
}

$viewports = @(
    @{ Name = "320_ultra_narrow"; Width = 320; Height = 640 },
    @{ Name = "360_android";      Width = 360; Height = 780 },
    @{ Name = "375_iphone_se";    Width = 375; Height = 667 },
    @{ Name = "430_iphone_pro_max"; Width = 430; Height = 932 },
    @{ Name = "768_tablet";       Width = 768; Height = 1024 },
    @{ Name = "1440_desktop_hd";  Width = 1440; Height = 900 }
)

Write-Host "Capturing Home across granular viewports..." -ForegroundColor Cyan
foreach ($vp in $viewports) {
    $fileVp = Join-Path $outDir ("v2_home_" + $vp.Name + ".png")
    $url = "http://localhost:3000/"
    & $chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars --window-size="$($vp.Width),$($vp.Height)" --screenshot="$fileVp" "$url" 2>&1 | Out-Null
    Start-Sleep -Milliseconds 1200
    Write-Host "Home $($vp.Name): $(Test-Path $fileVp)" -ForegroundColor Yellow
}

Write-Host "All Captures Finished." -ForegroundColor Cyan
