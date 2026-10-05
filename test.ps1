$content = Get-Content '.env'
$keyLine = $content | Select-String 'SUPABASE_KEY'
$key = $keyLine.Line.Split('=')[1].Trim()
$url = 'https://dttvbzrobyefehtrddtr.supabase.co/rest/v1/spaces?select=*'
$headers = @{ apikey=$key; Authorization=('Bearer ' + $key) }
$response = Invoke-RestMethod -Uri $url -Headers $headers
$response | Where-Object { $_.id -like '*b89fea17*' } | ConvertTo-Json
