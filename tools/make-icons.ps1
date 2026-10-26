Add-Type -AssemblyName System.Drawing

function New-Icon {
  param(
    [int]$size,
    [string]$out,
    [double]$padRatio
  )
  $bmp = New-Object System.Drawing.Bitmap($size, $size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'
  $g.Clear([System.Drawing.Color]::Black)
  $pad = [int]($size * $padRatio)
  $side = $size - 2 * $pad
  $rect = New-Object System.Drawing.Rectangle($pad, $pad, $side, $side)
  $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 248, 250, 252))
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $r = [int]($side * 0.25)
  $path.AddArc($rect.X, $rect.Y, 2 * $r, 2 * $r, 180, 90)
  $path.AddArc($rect.Right - 2 * $r, $rect.Y, 2 * $r, 2 * $r, 270, 90)
  $path.AddArc($rect.Right - 2 * $r, $rect.Bottom - 2 * $r, 2 * $r, 2 * $r, 0, 90)
  $path.AddArc($rect.X, $rect.Bottom - 2 * $r, 2 * $r, 2 * $r, 90, 90)
  $path.CloseFigure()
  $g.FillPath($brush, $path)
  $fontSize = [double]($size * 0.40)
  $font = New-Object System.Drawing.Font('Segoe UI', [float]$fontSize, [System.Drawing.FontStyle]::Bold)
  $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::Black)
  $fmt = New-Object System.Drawing.StringFormat
  $fmt.Alignment = 'Center'
  $fmt.LineAlignment = 'Center'
  $rectF = New-Object System.Drawing.RectangleF(0, ($size * 0.02), $size, $size)
  $g.DrawString('G', $font, $textBrush, $rectF, $fmt)
  $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
  Write-Host ("written: {0}" -f $out)
  $g.Dispose()
  $bmp.Dispose()
}

$pub = 'C:\Users\kobza\AI-Projects\sgx-booking-test\public'
New-Item -ItemType Directory -Force $pub | Out-Null
New-Icon 192 (Join-Path $pub 'pwa-192x192.png') 0.05
New-Icon 512 (Join-Path $pub 'pwa-512x512.png') 0.05
New-Icon 512 (Join-Path $pub 'pwa-maskable-512x512.png') 0.20

$svg = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#f8fafc"/>
  <text x="32" y="34" font-family="Segoe UI, Arial" font-size="30" font-weight="bold" text-anchor="middle" dominant-baseline="central" fill="#000">G</text>
</svg>
'@
Set-Content -Path (Join-Path $pub 'favicon.svg') -Value $svg -Encoding UTF8
Write-Host 'done'
