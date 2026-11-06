$pages = @(
  @{ name = 'redesigned_desktop_home'; url = 'http://localhost:3000/'; width = 1440; height = 3000 },
  @{ name = 'redesigned_mobile_home'; url = 'http://localhost:3000/'; width = 390; height = 2800 },
  @{ name = 'redesigned_desktop_doctors'; url = 'http://localhost:3000/doctors'; width = 1440; height = 1800 },
  @{ name = 'redesigned_desktop_departments'; url = 'http://localhost:3000/departments'; width = 1440; height = 1800 },
  @{ name = 'redesigned_desktop_diagnostics'; url = 'http://localhost:3000/diagnostics'; width = 1440; height = 1800 },
  @{ name = 'redesigned_desktop_about'; url = 'http://localhost:3000/about'; width = 1440; height = 2000 },
  @{ name = 'redesigned_desktop_contact'; url = 'http://localhost:3000/contact'; width = 1440; height = 1500 },
  @{ name = 'redesigned_desktop_packages'; url = 'http://localhost:3000/packages'; width = 1440; height = 1600 }
)

$targetDir = (Resolve-Path 'docs\screenshots').Path

foreach ($p in $pages) {
  $out = Join-Path $targetDir ($p.name + '.png')
  Start-Process -FilePath 'C:\Program Files\Google\Chrome\Application\chrome.exe' -ArgumentList '--headless=new', '--disable-gpu', '--no-sandbox', '--virtual-time-budget=6000', "--window-size=$($p.width),$($p.height)", "--screenshot=""$out""", $p.url -Wait
  Write-Output "Captured: $($p.name) -> $(Test-Path $out)"
}
