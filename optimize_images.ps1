# Load System.Drawing assembly
Add-Type -AssemblyName System.Drawing

$imgFolder = "assets\img"
$quality = 75
$maxWidth = 1600
$maxHeight = 1600

$files = Get-ChildItem "$imgFolder\*.jpg"

foreach ($file in $files) {
    Write-Host "Processing $($file.Name)..."
    
    $image = [System.Drawing.Image]::FromFile($file.FullName)
    
    # Calculate new dimensions
    $newWidth = $image.Width
    $newHeight = $image.Height
    
    if ($image.Width -gt $maxWidth -or $image.Height -gt $maxHeight) {
        $ratioX = $maxWidth / $image.Width
        $ratioY = $maxHeight / $image.Height
        $ratio = [Math]::Min($ratioX, $ratioY)
        
        $newWidth = [int]($image.Width * $ratio)
        $newHeight = [int]($image.Height * $ratio)
    }
    
    # Create new bitmap
    $newImage = new-object System.Drawing.Bitmap $newWidth, $newHeight
    $graphics = [System.Drawing.Graphics]::FromImage($newImage)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.DrawImage($image, 0, 0, $newWidth, $newHeight)
    
    # Setup encoder parameters for JPEG quality
    $encoder = [System.Drawing.Imaging.Encoder]::Quality
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, $quality)
    $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }

    # Save to a temporary file first because we can't overwrite the open file
    $tempFile = "$($file.FullName).tmp"
    $newImage.Save($tempFile, $jpegCodec, $encoderParams)
    
    # Clean up
    $graphics.Dispose()
    $newImage.Dispose()
    $image.Dispose() # Release the handle on the original file
    
    # Replace original with new
    Move-Item -Path $tempFile -Destination $file.FullName -Force
    
    Write-Host "Optimized $($file.Name)"
}

Write-Host "All images optimized."
