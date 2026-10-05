$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$AssetDir = Join-Path $Root 'assets\original'
New-Item -ItemType Directory -Force -Path $AssetDir | Out-Null
$base = 'https://mktgt.com'
$queue = New-Object System.Collections.Generic.Queue[string]
$seenPages = @{}
$seenImages = @{}
$queue.Enqueue('/')
$queue.Enqueue('/about-us/')
$queue.Enqueue('/brands/')
$queue.Enqueue('/products/')
$queue.Enqueue('/contact-us/')
for($p=2;$p -le 13;$p++){ $queue.Enqueue("/products/page/$p/") }

function Save-Image($url) {
  try {
    if($url.StartsWith('//')) { $url = 'https:' + $url }
    elseif($url.StartsWith('/')) { $url = $base + $url }
    if(-not ($url -match '^https?://')) { return }
    $u = [uri]$url
    $ext = [IO.Path]::GetExtension($u.AbsolutePath)
    if([string]::IsNullOrWhiteSpace($ext) -or $ext.Length -gt 6){ $ext='.jpg' }
    $name = [IO.Path]::GetFileNameWithoutExtension($u.AbsolutePath)
    if([string]::IsNullOrWhiteSpace($name)){ $name='image' }
    $name = ($name -replace '[^a-zA-Z0-9_-]','-').Trim('-')
    $hash = [Math]::Abs($url.GetHashCode())
    $file = Join-Path $AssetDir ($name + '-' + $hash + $ext.ToLower())
    if(-not (Test-Path $file)) {
      Invoke-WebRequest -Uri $url -OutFile $file -UseBasicParsing
    }
    $seenImages[$url] = (Resolve-Path $file).Path.Replace($Root + '\','').Replace('\','/')
  } catch { }
}

$pages = @()
while($queue.Count -gt 0) {
  $path = $queue.Dequeue()
  if($seenPages.ContainsKey($path)){continue}
  $seenPages[$path]=$true
  try {
    $url = if($path -match '^https?://'){ $path } else { $base + $path }
    Write-Host "Crawling $url"
    $r = Invoke-WebRequest -Uri $url -UseBasicParsing
    $html = $r.Content
    $pages += [pscustomobject]@{url=$url; path=$path; html=$html}
    $matches = [regex]::Matches($html, '(?i)(?:src|data-src|srcset)\s*=\s*["'']([^"'']+)')
    foreach($m in $matches){
      $v=$m.Groups[1].Value
      foreach($part in ($v -split ',')){
        $src=($part.Trim() -split '\s+')[0]
        if($src -match '\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$'){ Save-Image $src }
      }
    }
    # Discover product/category links for deeper crawling.
    foreach($a in [regex]::Matches($html,'(?i)href\s*=\s*["'']([^"'']+)["'']')){
      $href=$a.Groups[1].Value
      if($href -match '^https?://mktgt\.com(/.*)?$'){$href=([uri]$href).AbsolutePath}
      if($href -match '^/(product|products)(/|$)' -and $href -notmatch '\.(jpg|jpeg|png|webp|gif|svg|pdf)$'){
        if(-not $seenPages.ContainsKey($href) -and $seenPages.Count -lt 250){$queue.Enqueue($href)}
      }
    }
  } catch { Write-Warning "Failed: $path" }
}

$mapPath = Join-Path $Root 'assets\original-assets.json'
$seenImages.GetEnumerator() | Sort-Object Name | ConvertTo-Json -Depth 4 | Set-Content -Encoding UTF8 $mapPath
Write-Host "Downloaded $($seenImages.Count) public images. Asset map: $mapPath"
Write-Host 'Refresh the replica after running this script. Product and page assets are now available locally.'
